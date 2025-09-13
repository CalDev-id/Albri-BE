import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";

import "flowbite/dist/flowbite.min.js";
import { usePage } from "@inertiajs/react";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const TablePemasukan = ({ laporanCabang, pakets = [], bulan, tahun, nextMonth, nextYear, prevMonth, prevYear }) => {

    // console.log(laporanCabang.data);
    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.cabang"), {
            bulan: month,
            tahun: year,
        });
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
        // Pastikan pakets ada
        const safePakets = pakets || [];

        // header dasar
        const headerStatic = [
            "Hari",
            "Nama",
            "Tanggal",
            "Cabang",
        ];

        // header paket dinamis
        const headerPakets = safePakets.map(
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
            safePakets.forEach((p) => {
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

        safePakets.forEach((p) => {
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
        const fileName = `Rekap_Pemasukan_cabang_${judul}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };



    return (
        <div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-7.5 mb-6">
                    <div>
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            Rekap Pemasukan Cabang - {bulan}/{tahun}
                        </h4>
                    </div>
                    <div>
                        <button
                            onClick={() => downloadExcel(laporanCabang, `${bulan}_${tahun}`)}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                        >
                            Download Excel
                        </button>
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
                                {/* Header cells */}
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Hari</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Nama</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Cabang</th>

                                {/* Kolom paket dinamis */}
                                {pakets && pakets.length > 0 ? pakets.map((p) => (
                                    <th key={p.id} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                        {p.nama_paket} ({p.harga.toLocaleString()})
                                    </th>
                                )) : null}

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
                                    {pakets && pakets.length > 0 ? pakets.map((p) => (
                                        <td key={p.id} className="py-4 px-4 text-sm text-black dark:text-white">
                                            {getJumlahPaketInRow(laporan, p.id)}
                                        </td>
                                    )) : null}

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
                                <td colSpan={4} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>

                                {/* Total per paket */}
                                {pakets && pakets.length > 0 ? pakets.map((p) => (
                                    <td key={p.id} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                        {getTotalPaket(p.id)}
                                    </td>
                                )) : null}

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
};

export default TablePemasukan;