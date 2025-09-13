import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";

import "flowbite/dist/flowbite.min.js";
import { usePage } from "@inertiajs/react";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const TablePengeluaranRekap = ({
    laporanPengeluaranCabang,
    bulan,
    tahun,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
}) => {
    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.cabang"), {
            bulan: month,
            tahun: year,
        });
    };
    const calculateTotal = (field) => {
        return laporanPengeluaranCabang.data.reduce((sum, pengeluaran) => sum + (pengeluaran[field] || 0), 0);
    };
    const downloadExcelPengeluaran = (laporanPengeluaranCabang, judul) => {
        // Data pengeluaran
        const data = laporanPengeluaranCabang.data.map((pengeluaran) => ({
            Hari: pengeluaran.hari,
            Tanggal: pengeluaran.tanggal,
            Cabang: pengeluaran.cabang ? pengeluaran.cabang.nama : "N/A",
            "Nama Guru": pengeluaran.user ? pengeluaran.user.name : "N/A",
            Gaji: pengeluaran.gaji || 0,
            ATK: pengeluaran.atk || 0,
            Sewa: pengeluaran.sewa || 0,
            Intensif: pengeluaran.intensif || 0,
            Lisensi: pengeluaran.lisensi || 0,
            THR: pengeluaran.thr || 0,
            "Lain Lain": pengeluaran.lainlain || 0,
            Total: pengeluaran.totalpengeluaran || 0,
        }));

        // Hitung total untuk setiap kolom numerik
        const totals = {
            Hari: "Total", // Label di kolom pertama
            Tanggal: "",
            Cabang: "",
            "Nama Guru": "",
            Gaji: data.reduce((sum, row) => sum + row.Gaji, 0),
            ATK: data.reduce((sum, row) => sum + row.ATK, 0),
            Sewa: data.reduce((sum, row) => sum + row.Sewa, 0),
            Intensif: data.reduce((sum, row) => sum + row.Intensif, 0),
            Lisensi: data.reduce((sum, row) => sum + row.Lisensi, 0),
            THR: data.reduce((sum, row) => sum + row.THR, 0),
            "Lain Lain": data.reduce((sum, row) => sum + row["Lain Lain"], 0),
            Total: data.reduce((sum, row) => sum + row.Total, 0),
        };

        // Tambahkan total sebagai baris terakhir
        data.push(totals);

        // Buat worksheet dan workbook
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pengeluaran");

        // Tentukan nama file
        const fileName = `Rekap_Pengeluaran_cabang_${judul}.xlsx`;

        // Simpan file
        XLSX.writeFile(workbook, fileName);
    };


    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Rekap Pengeluaran Cabang - {bulan} {tahun}
                </h4>
                <div>
                    {/* <Link href="/admin/laporan/pengeluaran/create">
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                    Tambah Pengeluaran
                </button>
            </Link> */}
                    <button
                        // onClick={downloadExcel}
                        onClick={() => downloadExcelPengeluaran(laporanPengeluaranCabang, `${bulan} / ${tahun}`)}
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                    >
                        Download Excel
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
                            {/* Table Headers */}
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Hari</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Cabang</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Pembuat</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Gaji</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">ATK</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Sewa</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Intensif</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lisensi</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">THR</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lain Lain</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Total</th>
                            <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laporanPengeluaranCabang.data.map((pengeluaran, key) => (
                            <tr key={key} className="border-b border-stroke dark:border-strokedark">
                                {/* Data Rows */}
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.cabang ? pengeluaran.cabang.nama : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.user ? pengeluaran.user.name : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {pengeluaran.gurus && pengeluaran.gurus.length > 0
                                        ? pengeluaran.gurus.map((guru) => (
                                            <div key={guru.id}>
                                                {guru.guru_nama} - Rp {(guru.gaji || 0).toLocaleString()}
                                            </div>
                                        ))
                                        : "N/A"}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.atk || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.sewa || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.intensif || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.lisensi || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.thr || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.lainlain || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.totalpengeluaran || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center gap-3">
                                        <Link href={`/admin/laporan/pengeluaran/${pengeluaran.id}/edit`}>
                                            <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                        </Link>
                                        <Link
                                            href={`/admin/laporan/pengeluaran/${pengeluaran.id}`}
                                            method="delete"
                                            as="button"
                                            data={{ id: pengeluaran.id }}
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this item?")) {
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
                    {/* Footer Row for Totals */}
                    <tfoot>
                        <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                            <td colSpan="4" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('gaji').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('atk').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('sewa').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('intensif').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('lisensi').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('thr').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('lainlain').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('totalpengeluaran').toLocaleString()}</td>
                            <td className="py-4 px-4"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Pagination */}
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
    );
}

export default TablePengeluaranRekap;