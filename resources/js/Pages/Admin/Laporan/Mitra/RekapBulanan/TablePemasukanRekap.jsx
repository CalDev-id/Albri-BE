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
    paketMitra,
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
        // Buat object data dengan struktur dinamis berdasarkan paket
        const data = laporanMitra.data.map((laporan) => {
            const row = {
                Hari: laporan.hari,
                Tanggal: laporan.tanggal,
            };

            // Tambahkan kolom paket secara dinamis
            if (paketMitra && paketMitra.length > 0) {
                paketMitra.forEach((paket) => {
                    const headerName = `${paket.nama_paket} (${paket.harga.toLocaleString()})`;
                    const fieldName = `biaya_${paket.harga}`;
                    row[headerName] = laporan[fieldName] || 0;
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
        };

        // Total untuk paket
        if (paketMitra && paketMitra.length > 0) {
            paketMitra.forEach((paket) => {
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

        // Buat header dinamis berdasarkan paket
        const headers = ["Hari", "Tanggal"];

        if (paketMitra && paketMitra.length > 0) {
            paketMitra.forEach((paket) => {
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
        const fileName = `Rekap_Pemasukan_mitra_${judul}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };


    return (
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

                                {/* Dynamic paket headers */}
                                {paketMitra && paketMitra.length > 0 && paketMitra.map((paket, index) => (
                                    <th key={index} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                        {paket.nama_paket} ({paket.harga.toLocaleString()})
                                    </th>
                                ))}

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

                                    {/* Dynamic paket data */}
                                    {paketMitra && paketMitra.length > 0 && paketMitra.map((paket, index) => {
                                        const fieldName = `biaya_${paket.harga}`;
                                        return (
                                            <td key={index} className="py-4 px-4 text-sm text-black dark:text-white">
                                                {laporan[fieldName] || 0}
                                            </td>
                                        );
                                    })}

                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.totalbiaya ? laporan.totalbiaya.toLocaleString() : 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.daftar.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.modul.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.kaos.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.kas.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.lainlain.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.totalpemasukan.toLocaleString()}
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

                                {/* Dynamic paket totals */}
                                {paketMitra && paketMitra.length > 0 && paketMitra.map((paket, index) => {
                                    const fieldName = `biaya_${paket.harga}`;
                                    return (
                                        <td key={index} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                            {getTotal(fieldName)}
                                        </td>
                                    );
                                })}

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
    )
};

export default TablePemasukanRekap;
