import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import { usePage } from "@inertiajs/react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const TablePemasukanRekap = ({
    laporanMitra,
    bulan,
    tahun,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
}) => {

    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.mitra"), {
            bulan: month,
            tahun: year,
        });
    };
    const getTotal = (key) => {
        return laporanMitra.data.reduce(
            (sum, laporan) => sum + (laporan[key] || 0),
            0
        );
    };

    const downloadExcel = (laporanMitra, judul) => {
        const data = laporanMitra.data.map((laporan) => ({
            Hari: laporan.hari,
            Tanggal: laporan.tanggal,
            "7000": laporan.biaya_5000 || 0,
            "8.000": laporan.biaya_8000 || 0,
            "10.000": laporan.biaya_10000 || 0,
            "15.000": laporan.biaya_15000 || 0,
            "Total Biaya": laporan.totalbiaya || 0,
            Daftar: laporan.daftar || 0,
            Modul: laporan.modul || 0,
            Kaos: laporan.kaos || 0,
            Kas: laporan.kas || 0,
            "Lain Lain": laporan.lainlain || 0,
            "Total Pemasukan": laporan.totalpemasukan || 0,
        }));
    
        // Hitung total untuk setiap kolom numerik
        const totals = {
            Hari: "Total",
            Tanggal: "",
            "7000": data.reduce((sum, row) => sum + row["7000"], 0),
            "8.000": data.reduce((sum, row) => sum + row["8.000"], 0),
            "10.000": data.reduce((sum, row) => sum + row["10.000"], 0),
            "15.000": data.reduce((sum, row) => sum + row["15.000"], 0),
            "Total Biaya": data.reduce((sum, row) => sum + row["Total Biaya"], 0),
            Daftar: data.reduce((sum, row) => sum + row.Daftar, 0),
            Modul: data.reduce((sum, row) => sum + row.Modul, 0),
            Kaos: data.reduce((sum, row) => sum + row.Kaos, 0),
            Kas: data.reduce((sum, row) => sum + row.Kas, 0),
            "Lain Lain": data.reduce((sum, row) => sum + row["Lain Lain"], 0),
            "Total Pemasukan": data.reduce((sum, row) => sum + row["Total Pemasukan"], 0),
        };
    
        // Tambahkan total sebagai baris terakhir
        data.push(totals);
    
        // Urutan kolom yang diinginkan
        const headers = [
            "Hari",
            "Tanggal",
            "7000",
            "8.000",
            "10.000",
            "15.000",
            "Total Biaya",
            "Daftar",
            "Modul",
            "Kaos",
            "Kas",
            "Lain Lain",
            "Total Pemasukan",
        ];
    
        // Membuat worksheet dengan header khusus
        const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
    
        // Menambahkan header secara eksplisit (jika perlu)
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    
        // Membuat workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap");
    
        // Menentukan nama file dan mendownload
        const fileName = `Rekap_Pemasukan_mitra_${judul}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };


    return(
        <div>
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Rekap Pemasukan Mitra - {bulan}/{tahun}
                </h4>

                <div>
                    {/* <Link href="/admin/laporan/mitra/create">
                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                            Tambah Laporan
                        </button>
                    </Link> */}
                    <button
                        // onClick={downloadExcel}
                        onClick={() => downloadExcel(laporanMitra, `${bulan} / ${tahun}`)}
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
                            {/* Header cells */}
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                Hari
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                Tanggal
                            </th>

                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                7000
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                8000
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                10.000
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                15.000
                            </th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {laporanMitra.data.map((laporan, key) => (
                            <tr
                                key={key}
                                className="border-b border-stroke dark:border-strokedark"
                            >
                                {/* Table rows with data */}
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                                    {laporan.hari}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.tanggal}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.biaya_5000}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.biaya_8000}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.biaya_10000}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.biaya_15000}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.totalbiaya}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.daftar}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.modul}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.kaos}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.kas}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.lainlain}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporan.totalpemasukan}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                            <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                                <td
                                    colSpan="2"
                                    className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10"
                                >
                                    Total
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("biaya_5000")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("biaya_8000")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("biaya_10000")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("biaya_15000")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("totalbiaya")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("daftar")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("modul")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("kaos")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("kas")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("lainlain")}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {getTotal("totalpemasukan")}
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
    )
};

export default TablePemasukanRekap;
