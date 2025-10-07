import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import * as XLSX from "xlsx";
import { FaEdit, FaTrash } from "react-icons/fa";

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

  const goToWeek = (weekOffset) => {
    Inertia.get(route("guru.dashboard"), { weekOffset });
  };

  const n = (v) => (typeof v === "number" ? v : (parseInt(v, 10) || 0));
  const fmt = (v) => n(v).toLocaleString();

  // total tetap (bukan paket)
  const getTotal = (key) =>
    laporanCabang.data.reduce((sum, lap) => sum + Number(lap[key]), 0);

  // ambil jumlah paket per laporan dari pivot
  const getJumlahPaketInRow = (laporan, paketId) => {
    if (!laporan.pakets) return 0;
    const found = laporan.pakets.find((p) => p.id === paketId);
    return found ? Number(found.pivot?.jumlah) : 0;
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
      row["Total Biaya"] = Number(lap.totalbiaya);
      row["Daftar"] = Number(lap.daftar);
      row["Modul"] = Number(lap.modul);
      row["Kaos"] = Number(lap.kaos);
      row["Kas"] = Number(lap.kas);
      row["Lain Lain"] = Number(lap.lainlain);
      row["Total Pemasukan"] = Number(lap.totalpemasukan);

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

  return (
    <div>
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between px-7.5 mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Laporan Pemasukan Cabang ({startOfWeek} sampai {endOfWeek})
          </h4>
          <div>
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
            {/* <Link href="/admin/laporan/cabang/paket/">
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 ml-2">
                Setting Harga
              </button>
            </Link> */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Hari</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Nama</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal</th>
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
                  <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{laporan.hari}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{laporan.user ? laporan.user.name : "N/A"}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{laporan.tanggal}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{laporan.cabang ? laporan.cabang.nama : "N/A"}</td>

                  {/* Nilai jumlah per paket dari pivot */}
                  {pakets.map((p) => (
                    <td key={p.id} className="py-4 px-4 text-sm text-black dark:text-white">
                      {getJumlahPaketInRow(laporan, p.id)}
                    </td>
                  ))}

                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.totalbiaya).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.daftar).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.modul).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.kaos).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.kas).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.lainlain).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(laporan.totalpemasukan).toLocaleString()}</td>

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
                <td colSpan={4} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>

                {/* Total per paket */}
                {pakets.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                    {getTotalPaket(p.id)}
                  </td>
                ))}

                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("totalbiaya")).toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("daftar")).toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("modul")).toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("kaos")).toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("kas")).toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("lainlain")).toLocaleString()}</td>
                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">{Number(getTotal("totalpemasukan")).toLocaleString()}</td>
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
