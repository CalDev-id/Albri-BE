import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import { usePage } from "@inertiajs/react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const RekapPemasukan = ({
    laporanPrivate,
    bulan,
    tahun,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
    paketPrivate,
}) => {
    // State untuk mengelola checkbox
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.private"), {
            bulan: month,
            tahun: year,
        });
    };

    const getTotal = (key) => {
        return (laporanPrivate?.data || []).reduce(
            (sum, laporan) => sum + (laporan[key] || 0),
            0
        );
    };

    // Calculate total for dynamic paket
    const getPaketTotal = (paketId) => {
        return (laporanPrivate?.data || []).reduce(
            (sum, laporan) => {
                const paketValue = laporan.pakets && laporan.pakets[paketId] ? parseInt(laporan.pakets[paketId]) : 0;
                return sum + paketValue;
            },
            0
        );
    };
    const downloadExcel = (laporanPrivate, judul) => {
        // Buat object data dengan struktur dinamis berdasarkan paket
        const data = (laporanPrivate?.data || []).map((laporan) => {
            const row = {
                Hari: laporan.hari,
                Tanggal: laporan.tanggal,
                "Pembuat Laporan": laporan.user?.name || 'N/A',
            };

            // Tambahkan kolom paket secara dinamis
            if (paketPrivate && paketPrivate.length > 0) {
                paketPrivate.forEach((paket) => {
                    const headerName = `${paket.nama_paket} (${paket.harga.toLocaleString()})`;
                    const paketValue = laporan.pakets && laporan.pakets[paket.id] ? parseInt(laporan.pakets[paket.id]) : 0;
                    row[headerName] = paketValue;
                });
            }

            // Tambahkan kolom lainnya
            row["Total Biaya"] = laporan.totalbiaya || 0;
            row["Daftar"] = laporan.daftar || 0;
            row["Modul"] = laporan.modul || 0;
            row["Kaos"] = laporan.kaos || 0;
            row["Kas"] = laporan.kas || 0;
            row["Lain Lain"] = laporan.lainlain || 0;
            row["Total Pemasukan"] = laporan.totalpemasukan || 0;

            return row;
        });

        // Hitung total untuk setiap kolom
        const totals = {
            Hari: "Total",
            Tanggal: "",
            "Pembuat Laporan": "",
        };

        // Total untuk paket
        if (paketPrivate && paketPrivate.length > 0) {
            paketPrivate.forEach((paket) => {
                const headerName = `${paket.nama_paket} (${paket.harga.toLocaleString()})`;
                totals[headerName] = data.reduce((sum, row) => sum + row[headerName], 0);
            });
        }

        // Total untuk kolom lainnya
        totals["Total Biaya"] = data.reduce((sum, row) => sum + row["Total Biaya"], 0);
        totals["Daftar"] = data.reduce((sum, row) => sum + row.Daftar, 0);
        totals["Modul"] = data.reduce((sum, row) => sum + row.Modul, 0);
        totals["Kaos"] = data.reduce((sum, row) => sum + row.Kaos, 0);
        totals["Kas"] = data.reduce((sum, row) => sum + row.Kas, 0);
        totals["Lain Lain"] = data.reduce((sum, row) => sum + row["Lain Lain"], 0);
        totals["Total Pemasukan"] = data.reduce((sum, row) => sum + row["Total Pemasukan"], 0);

        // Tambahkan total sebagai baris terakhir
        data.push(totals);

        // Buat headers dinamis
        const headers = ["Hari", "Tanggal", "Pembuat Laporan"];
        if (paketPrivate && paketPrivate.length > 0) {
            paketPrivate.forEach((paket) => {
                headers.push(`${paket.nama_paket} (${paket.harga.toLocaleString()})`);
            });
        }
        headers.push("Total Biaya", "Daftar", "Modul", "Kaos", "Kas", "Lain Lain", "Total Pemasukan");

        // Membuat worksheet dengan header khusus
        const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

        // Menambahkan header secara eksplisit (jika perlu)
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

        // Membuat workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap");

        // Menentukan nama file dan mendownload
        const fileName = `Rekap_Pemasukan_private_${judul}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    // Fungsi untuk mengelola checkbox individual
    const handleItemSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Fungsi untuk select all checkbox
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(laporanPrivate.data.map(item => item.id));
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
                Inertia.post('/admin/laporan/private/bulk-delete', {
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
        setSelectAll(selectedItems.length === laporanPrivate.data.length && laporanPrivate.data.length > 0);
    }, [selectedItems, laporanPrivate.data]);

    return (
        <div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Rekap Pemasukan Private - {bulan} / {tahun}
                    </h4>
                    <div>
                        {/* <Link href="/admin/laporan/private/create">
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                                Tambah Laporan
                            </button>
                        </Link> */}
                        <button
                            onClick={() =>
                                downloadExcel(
                                    laporanPrivate,
                                    `${bulan} / ${tahun}`
                                )
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                        >
                            Download Excel
                        </button>
                        <Link href="/admin/laporan/private/paket/">
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 ml-2">
                                Setting Harga
                            </button>
                        </Link>
                        {selectedItems.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
                            >
                                Hapus Terpilih ({selectedItems.length})
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                {/* Checkbox header */}
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300"
                                    />
                                </th>
                                {/* Header cells */}
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Hari
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Tanggal
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Pembuat Laporan
                                </th>

                                {/* Dynamic paket headers */}
                                {paketPrivate && paketPrivate.length > 0 ? (
                                    paketPrivate.map((paket, index) => (
                                        <th key={index} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                            {paket.nama_paket} ({paket.harga.toLocaleString()})
                                        </th>
                                    ))
                                ) : (
                                    <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                        <span className="text-yellow-500">Belum ada paket - </span>
                                        <Link href="/admin/laporan/private/paket/" className="text-blue-500 underline">
                                            Tambah Paket
                                        </Link>
                                    </th>
                                )}

                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Total Biaya
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Daftar
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Modul
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Kaos
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Kas
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Lain Lain
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Total
                                </th>

                                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(laporanPrivate?.data || []).map((laporan, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-stroke dark:border-strokedark"
                                >
                                    {/* Checkbox column */}
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(laporan.id)}
                                            onChange={() => handleItemSelect(laporan.id)}
                                            className="rounded border-gray-300"
                                        />
                                    </td>
                                    {/* Table rows with data */}
                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                                        {laporan.hari}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.tanggal}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.user?.name || 'N/A'}
                                    </td>

                                    {/* Dynamic paket data */}
                                    {paketPrivate && paketPrivate.length > 0 ? (
                                        paketPrivate.map((paket, index) => {
                                            // Get value from JSON pakets field using paket ID
                                            const paketValue = laporan.pakets && laporan.pakets[paket.id] ? parseInt(laporan.pakets[paket.id]) : 0;
                                            return (
                                                <td key={index} className="py-4 px-4 text-sm text-black dark:text-white">
                                                    {paketValue.toLocaleString()}
                                                </td>
                                            );
                                        })
                                    ) : (
                                        <td className="py-4 px-4 text-sm text-center text-yellow-500 dark:text-yellow-400">
                                            Tidak ada paket
                                        </td>
                                    )}

                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.totalbiaya ? laporan.totalbiaya.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.daftar ? laporan.daftar.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.modul ? laporan.modul.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.kaos ? laporan.kaos.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.kas ? laporan.kas.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.lainlain ? laporan.lainlain.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.totalpemasukan ? laporan.totalpemasukan.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {/* Action buttons */}
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/admin/laporan/private/${laporan.id}/edit`}
                                            >
                                                <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                            </Link>
                                            <Link
                                                href={`/admin/laporan/private/${laporan.id}`}
                                                method="delete"
                                                as="button"
                                                data={{ id: laporan.id }}
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            "Are you sure you want to delete this user?"
                                                        )
                                                    ) {
                                                        e.preventDefault();
                                                    }
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
                                <td
                                    colSpan="4"
                                    className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10"
                                >
                                    Total
                                </td>

                                {/* Dynamic paket totals */}
                                {paketPrivate && paketPrivate.length > 0 ? (
                                    paketPrivate.map((paket, index) => {
                                        return (
                                            <td key={index} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                                {getPaketTotal(paket.id).toLocaleString()}
                                            </td>
                                        );
                                    })
                                ) : (
                                    <td className="py-4 px-4 text-sm text-center text-yellow-500 dark:text-yellow-400">
                                        -
                                    </td>
                                )}

                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("totalbiaya").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("daftar").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("modul").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("kaos").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("kas").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("lainlain").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("totalpemasukan").toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white"></td>
                            </tr>
                        </tfoot>
                    </table>
                    {/* Pagination Controls */}
                    <div className="flex justify-center gap-3 mt-4">
                        <button
                            onClick={() => goToMonth(prevMonth, prevYear)}
                            // disabled={current_page === 1}
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Sebelumnya
                        </button>
                        <button
                            onClick={() => goToMonth(nextMonth, nextYear)}
                            // disabled={current_page === last_page}
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RekapPemasukan;