import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import { usePage } from "@inertiajs/react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const TablePemasukan = () => {
    const {
        laporanMitra,
        startOfWeek,
        endOfWeek,
        nextWeekOffset,
        prevWeekOffset,
        paketMitra,
    } = usePage().props;

    const goToWeek = (weekOffset) => {
        Inertia.get(route("Mitra.index"), { weekOffset });
    };

    // Calculate total values for each column
    const getTotal = (key) => {
        return laporanMitra.data.reduce(
            (sum, laporan) => sum + (Number(laporan[key]) || 0),
            0
        );
    };

    // Calculate total for dynamic paket
    const getTotalPaket = (paketId) => {
        return laporanMitra.data.reduce((sum, laporan) => {
            const pakets = laporan.pakets || [];
            const paket = pakets.find(p => p.id === paketId);
            return sum + (paket ? (paket.pivot?.jumlah || 0) : 0);
        }, 0);
    };

    // Calculate total biaya for dynamic pakets
    const getTotalBiayaPaket = (paketId) => {
        return laporanMitra.data.reduce((sum, laporan) => {
            const pakets = laporan.pakets || [];
            const paket = pakets.find(p => p.id === paketId);
            const jumlah = paket ? (paket.pivot?.jumlah || 0) : 0;
            const harga = paket ? paket.harga : 0;
            return sum + (jumlah * harga);
        }, 0);
    };

    const downloadExcel2 = () => {
        // Create workbook and worksheet for Pemasukan
        const wb = XLSX.utils.book_new();

        // Prepare pemasukan data
        const pemasukanHeaders = [
            'Hari', 'Nama', 'Tanggal',
            ...(paketMitra || []).map(paket => paket.nama_paket),
            'Total Biaya', 'Daftar', 'Modul', 'Kaos', 'Kas', 'Lain Lain', 'Total'
        ];

        const pemasukanData = laporanMitra.data.map(laporan => {
            const row = [
                laporan.hari,
                laporan.user ? laporan.user.name : "N/A",
                laporan.tanggal
            ];

            // Add dynamic paket columns
            (paketMitra || []).forEach(paket => {
                const laporanPaket = laporan.pakets?.find(p => p.id === paket.id);
                row.push(laporanPaket?.pivot?.jumlah || 0);
            });

            row.push(
                Number(laporan.totalbiaya),
                Number(laporan.daftar),
                Number(laporan.modul),
                Number(laporan.kaos),
                Number(laporan.kas),
                Number(laporan.lainlain),
                Number(laporan.totalpemasukan)
            );

            return row;
        });

        // Add totals row
        const totalsRow = ['Total', '', ''];
        (paketMitra || []).forEach(paket => {
            totalsRow.push(getTotalPaket(paket.id));
        });
        totalsRow.push(
            getTotal('totalbiaya'),
            getTotal('daftar'),
            getTotal('modul'),
            getTotal('kaos'),
            getTotal('kas'),
            getTotal('lainlain'),
            getTotal('totalpemasukan')
        );

        const wsDataPemasukan = [pemasukanHeaders, ...pemasukanData, totalsRow];
        const wsPemasukan = XLSX.utils.aoa_to_sheet(wsDataPemasukan);
        XLSX.utils.book_append_sheet(wb, wsPemasukan, 'Pemasukan Mitra');

        // Download the file
        XLSX.writeFile(wb, `Laporan_Mitra_${startOfWeek}_to_${endOfWeek}.xlsx`);
    };

    return (
        <div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Laporan Pemasukan Mitra ( {startOfWeek} sampai{" "}
                        {endOfWeek} )
                    </h4>
                    <div>
                        <Link href="/admin/laporan/mitra/create">
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                                Tambah Laporan
                            </button>
                        </Link>
                        <button
                            onClick={() => downloadExcel2()}
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
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Hari
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Nama
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Tanggal
                                </th>
                                {/* Dynamic paket headers */}
                                {(paketMitra || []).map((paket) => (
                                    <th key={paket.id} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                        {paket.nama_paket}
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
                                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {laporanMitra.data.map((laporan, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-stroke dark:border-strokedark"
                                >
                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                                        {laporan.hari}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                                        {laporan.user ? laporan.user.name : "N/A"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.tanggal}
                                    </td>
                                    {/* Dynamic paket columns */}
                                    {(paketMitra || []).map((paket) => {
                                        const laporanPaket = laporan.pakets?.find(p => p.id === paket.id);
                                        const jumlah = laporanPaket?.pivot?.jumlah || 0;
                                        return (
                                            <td key={paket.id} className="py-4 px-4 text-sm text-black dark:text-white">
                                                {Number(jumlah).toLocaleString()}
                                            </td>
                                        );
                                    })}
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.totalbiaya).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.daftar).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.modul).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.kaos).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.kas).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.lainlain).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {Number(laporan.totalpemasukan).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/admin/laporan/mitra/${laporan.id}/edit`}
                                            >
                                                <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                            </Link>
                                            <Link
                                                href={`/admin/laporan/mitra/${laporan.id}`}
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
                                    colSpan="3"
                                    className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10"
                                >
                                    Total
                                </td>
                                {/* Dynamic paket totals */}
                                {(paketMitra || []).map((paket) => (
                                    <td key={paket.id} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                        {getTotalPaket(paket.id).toLocaleString()}
                                    </td>
                                ))}
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
                            onClick={() => goToWeek(prevWeekOffset)}
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Sebelumnya
                        </button>

                        <button
                            onClick={() => goToWeek(nextWeekOffset)}
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablePemasukan;
