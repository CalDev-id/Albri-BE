import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import * as XLSX from "xlsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

const TablePemasukan = () => {
  const {
    laporanCabang,
    laporanPengeluaranCabang,
    startOfWeek,
    endOfWeek,
    nextWeekOffset,
    prevWeekOffset,
    pakets, // <--- dari controller
  } = usePage().props;

  // State untuk mengelola checkbox
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const goToWeek = (weekOffset) => {
    Inertia.get(route("admin.laporan.cabang"), { weekOffset });
  };

  const n = (v) => (typeof v === "number" ? v : (parseInt(v, 10) || 0));
  const fmt = (v) => n(v).toLocaleString();

  // total tetap (bukan paket)
  const getTotal = (key) =>
    laporanCabang.data.reduce((sum, lap) => sum + n(lap[key]), 0);

  // ambil jumlah paket per laporan dari pivot
  const getJumlahPaketInRow = (laporan, paketId) => {
    if (!laporan.pakets) return 0;
    const found = laporan.pakets.find((p) => p.id === paketId);
    return found ? n(found.pivot?.jumlah) : 0;
  };

  // total jumlah per paket (kolom dinamis)
  const getTotalPaket = (paketId) =>
    laporanCabang.data.reduce(
      (sum, lap) => sum + getJumlahPaketInRow(lap, paketId),
      0
    );

  // Download Excel: kolom dinamis per paket
  const downloadExcel = (laporanCabang, judul) => {
    // header dasar
    const headerStatic = [
      "Hari",
      "Nama",
      "Tanggal",
      "Cabang",
    ];

    // header paket dinamis
    const headerPakets = pakets.map(
      (p) => `${p.nama_paket} (${p.harga.toLocaleString()})`
    );

    // header total lainnya
    const headerTotals = [
      "Total Biaya",
      "Daftar",
      "Modul",
      "Kaos",
      "Kas",
      "Lain Lain",
      "Total Pemasukan",
    ];

    const headers = [...headerStatic, ...headerPakets, ...headerTotals];

    // isi row
    const data = laporanCabang.data.map((lap) => {
      const row = {
        Hari: lap.hari,
        Nama: lap.user ? lap.user.name : "N/A",
        Tanggal: lap.tanggal,
        Cabang: lap.cabang ? lap.cabang.nama : "N/A",
      };

      // kolom paket (jumlah)
      pakets.forEach((p) => {
        const key = `${p.nama_paket} (${p.harga.toLocaleString()})`;
        row[key] = getJumlahPaketInRow(lap, p.id);
      });

      // kolom total
      row["Total Biaya"] = n(lap.totalbiaya);
      row["Daftar"] = n(lap.daftar);
      row["Modul"] = n(lap.modul);
      row["Kaos"] = n(lap.kaos);
      row["Kas"] = n(lap.kas);
      row["Lain Lain"] = n(lap.lainlain);
      row["Total Pemasukan"] = n(lap.totalpemasukan);

      return row;
    });

    // baris total
    const totalsRow = {
      Hari: "Total",
      Nama: "",
      Tanggal: "",
      Cabang: "",
    };

    pakets.forEach((p) => {
      const key = `${p.nama_paket} (${p.harga.toLocaleString()})`;
      totalsRow[key] = getTotalPaket(p.id);
    });

    totalsRow["Total Biaya"] = getTotal("totalbiaya");
    totalsRow["Daftar"] = getTotal("daftar");
    totalsRow["Modul"] = getTotal("modul");
    totalsRow["Kaos"] = getTotal("kaos");
    totalsRow["Kas"] = getTotal("kas");
    totalsRow["Lain Lain"] = getTotal("lainlain");
    totalsRow["Total Pemasukan"] = getTotal("totalpemasukan");

    data.push(totalsRow);

    const ws = XLSX.utils.json_to_sheet(data, { header: headers });
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");
    const fileName = `Laporan_Pemasukan_cabang_${judul}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Fungsi untuk mengelola checkbox individual
  const handleItemSelect = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Fungsi untuk select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(laporanCabang.data.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Fungsi untuk bulk delete
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Pilih Data',
        text: 'Pilih item yang ingin dihapus terlebih dahulu',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    Swal.fire({
      title: 'Konfirmasi Hapus',
      text: `Yakin ingin menghapus ${selectedItems.length} item yang dipilih?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        const itemCount = selectedItems.length;
        Inertia.post('/admin/laporan/cabang/bulk-delete', {
          ids: selectedItems
        }, {
          preserveScroll: true,
          onStart: () => {
            setSelectedItems([]);
            setSelectAll(false);
          },
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: `${itemCount} item berhasil dihapus`,
              confirmButtonColor: '#3085d6',
              timer: 2000,
              timerProgressBar: true
            });
          },
          onError: () => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal!',
              text: 'Terjadi kesalahan saat menghapus data',
              confirmButtonColor: '#3085d6'
            });
          }
        });
      }
    });
  };

  // Update selectAll status berdasarkan selectedItems
  React.useEffect(() => {
    if (laporanCabang.data.length > 0) {
      setSelectAll(selectedItems.length === laporanCabang.data.length);
    }
  }, [selectedItems, laporanCabang.data]);

  return (
    <div>
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between px-7.5 mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Laporan Pemasukan Cabang ({startOfWeek} sampai {endOfWeek})
          </h4>
          <div className="flex gap-2">
            <Link href="/admin/laporan/cabang/create">
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                Tambah Laporan
              </button>
            </Link>
            <button
              onClick={() =>
                downloadExcel(laporanCabang, `${startOfWeek} sampai ${endOfWeek}`)
              }
              className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
            >
              Download Excel
            </button>
            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Hapus Terpilih ({selectedItems.length})
              </button>
            )}
            <Link href="/admin/laporan/cabang/paket/">
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 ml-2">
                Setting Harga
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="checkbox checkbox-sm"
                  />
                </th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Hari</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Nama</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Cabang</th>

                {/* Kolom paket dinamis */}
                {pakets.map((p) => (
                  <th key={p.id} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                    {p.nama_paket} ({p.harga.toLocaleString()})
                  </th>
                ))}

                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Total Biaya</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Daftar</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Modul</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Kaos</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Kas</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lain Lain</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Total</th>
                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>

            <tbody>
              {laporanCabang.data.map((laporan) => (
                <tr key={laporan.id} className="border-b border-stroke dark:border-strokedark">
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(laporan.id)}
                      onChange={() => handleItemSelect(laporan.id)}
                      className="checkbox checkbox-sm"
                    />
                  </td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{laporan.hari}</td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">{laporan.tanggal}</td>

                  <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{laporan.user ? laporan.user.name : "N/A"}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{laporan.cabang ? laporan.cabang.nama : "N/A"}</td>

                  {/* Nilai jumlah per paket dari pivot */}
                  {pakets.map((p) => (
                    <td key={p.id} className="py-4 px-4 text-sm text-black dark:text-white">
                      {getJumlahPaketInRow(laporan, p.id)}
                    </td>
                  ))}

                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.totalbiaya)}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.daftar)}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.modul)}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.kaos)}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.kas)}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.lainlain)}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(laporan.totalpemasukan)}</td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link href={`/admin/laporan/cabang/${laporan.id}/edit`}>
                        <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                      </Link>
                      <Link
                        href={`/admin/laporan/cabang/${laporan.id}`}
                        method="delete"
                        as="button"
                        data={{ id: laporan.id }}
                        onClick={(e) => {
                          if (!confirm("Yakin hapus laporan ini?")) e.preventDefault();
                        }}
                      >
                        <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                <td className="py-4 px-4 text-center"></td>
                <td colSpan={4} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>

                {/* Total per paket */}
                {pakets.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                    {getTotalPaket(p.id)}
                  </td>
                ))}

                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("totalbiaya"))}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("daftar"))}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("modul"))}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("kaos"))}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("kas"))}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("lainlain"))}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{fmt(getTotal("totalpemasukan"))}</td>
                <td className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white"></td>
              </tr>
            </tfoot>
          </table>

          {/* Pagination minggu */}
          <div className="flex justify-center gap-3 mt-4">
            <button onClick={() => goToWeek(prevWeekOffset)} className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Sebelumnya
            </button>
            <button onClick={() => goToWeek(nextWeekOffset)} className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePemasukan;
