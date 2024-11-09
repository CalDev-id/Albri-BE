import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";

import DatePickerOne from "@/components/DatePickerOne";
import SelectGroupTwo from "@/components/SelectGroupTwo";
import { useEffect } from "react";
import * as XLSX from "xlsx";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const Laporan = () => {
    const { laporanCabang, laporanPengeluaranCabang } = usePage().props;

    
    const { current_page_laporanCabang, last_page_laporanCabang, data_laporanCabang } = laporanCabang;
    const { current_page_pengeluaran, last_page_pengeluaran, data_pengeluaran } = laporanPengeluaranCabang;
    
    // Fungsi untuk menangani perubahan halaman laporan cabang
    const handlePageChangeCabang = (page) => {
        if (page !== current_page_laporanCabang) {
            Inertia.get(route("admin.laporan.cabang"), {
                page,  // Kirim halaman baru untuk laporan cabang
                laporanCabangPage: page,  // Pastikan nama parameter sesuai dengan yang di backend
            });
        }
    };
    
    // Fungsi untuk menangani perubahan halaman laporan pengeluaran
    const handlePageChangePengeluaran = (page) => {
        if (page !== current_page_pengeluaran) {
            Inertia.get(route("admin.laporan.cabang"), {
                page,  // Kirim halaman baru untuk laporan pengeluaran
                laporanCabangPagePengeluaran: page,  // Pastikan nama parameter sesuai dengan yang di backend
            });
        }
    };
    
    // const calculateTotals = (laporanCabang, laporanPengeluaranCabang) => {
    //     const totalProfit = laporanCabang.reduce(
    //         (sum, laporan) => sum + laporan.totalpemasukan,
    //         0
    //     );
    //     const totalOutcome = laporanPengeluaranCabang.reduce(
    //         (sum, pengeluaran) => sum + pengeluaran.totalpengeluaran,
    //         0
    //     );
    //     const totalLaba = totalProfit - totalOutcome;
    //     const totalStudents = laporanCabang.reduce(
    //         (sum, laporan) =>
    //             sum +
    //             (laporan.biaya_5000 +
    //                 laporan.biaya_10000 +
    //                 laporan.biaya_12000),
    //         0
    //     );

    //     return { totalLaba, totalProfit, totalOutcome, totalStudents };
    // };
    // const { totalLaba, totalProfit, totalOutcome, totalStudents } =
    //     calculateTotals(laporanCabang, laporanPengeluaranCabang);

    const downloadExcel = () => {
        // Prepare the data for the Excel file
        const data = laporanCabang.map((laporan) => ({
            Hari: laporan.hari,
            Tanggal: laporan.tanggal,
            Cabang: laporan.cabang ? laporan.cabang.nama : "N/A",
            5000: laporan.biaya_5000,
            10000: laporan.biaya_10000,
            12000: laporan.biaya_12000,
            "Total Biaya": laporan.totalbiaya,
            Daftar: laporan.daftar,
            Modul: laporan.modul,
            Kaos: laporan.kaos,
            Kas: laporan.kas,
            "Lain Lain": laporan.lainlain,
            Total: laporan.totalpemasukan,
        }));

        // Create a worksheet from the data
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LaporanCabang");

        // Generate and download the Excel file
        XLSX.writeFile(workbook, "LaporanCabang.xlsx");
    };
    const downloadExcel2 = (laporanCabang, laporanPengeluaranCabang) => {
        const combinedData = [];

        // Menambahkan tabel pertama: laporanCabang
        const laporanCabangData = laporanCabang.map((laporan) => ({
            Jenis_Laporan: "Laporan Cabang",
            Hari: laporan.hari,
            Tanggal: laporan.tanggal,
            Cabang: laporan.cabang ? laporan.cabang.nama : "N/A",
            Biaya_5000: laporan.biaya_5000,
            Biaya_10000: laporan.biaya_10000,
            Biaya_12000: laporan.biaya_12000,
            Total_Biaya: laporan.totalbiaya,
            Daftar: laporan.daftar,
            Modul: laporan.modul,
            Kaos: laporan.kaos,
            Kas: laporan.kas,
            Lainlain: laporan.lainlain,
            Total_Pemasukan: laporan.totalpemasukan,
        }));

        // Menambahkan tabel kedua: laporanPengeluaranCabang
        const laporanPengeluaranData = laporanPengeluaranCabang.map(
            (pengeluaran) => ({
                Jenis_Laporan: "Laporan Pengeluaran Cabang",
                Hari: pengeluaran.hari,
                Tanggal: pengeluaran.tanggal,
                Cabang: pengeluaran.cabang ? pengeluaran.cabang.nama : "N/A",
                User: pengeluaran.user ? pengeluaran.user.name : "N/A",
                Gaji: pengeluaran.gaji,
                ATK: pengeluaran.atk,
                Sewa: pengeluaran.sewa,
                Intensif: pengeluaran.intensif,
                Lisensi: pengeluaran.lisensi,
                Thr: pengeluaran.thr,
                Lainlain: pengeluaran.lainlain,
                Total_Pengeluaran: pengeluaran.totalpengeluaran,
            })
        );

        // Membuat worksheet untuk laporanCabang
        const wsLaporanCabang = XLSX.utils.json_to_sheet(laporanCabangData, {
            header: Object.keys(laporanCabangData[0]),
        });

        // Membuat worksheet untuk laporanPengeluaranCabang
        const wsLaporanPengeluaranCabang = XLSX.utils.json_to_sheet(
            laporanPengeluaranData,
            { header: Object.keys(laporanPengeluaranData[0]) }
        );

        // Membuat workbook dan menambahkan kedua sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsLaporanCabang, "Laporan Cabang");
        XLSX.utils.book_append_sheet(
            wb,
            wsLaporanPengeluaranCabang,
            "Laporan Pengeluaran Cabang"
        );

        // Menyimpan file Excel
        XLSX.writeFile(wb, "laporan_combined.xlsx");
    };

    return (
        <DefaultLayout>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10">
                <CardDataStats
                    title="Total Laba"
                    total={`Rp ${totalLaba.toLocaleString()}`}
                    rate=""
                    levelUp
                >
                    <svg
                        className="fill-primary dark:fill-white"
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                            fill=""
                        />
                        <path
                            d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                            fill=""
                        />
                    </svg>
                </CardDataStats>
                <CardDataStats
                    title="Total Profit"
                    total={`Rp ${totalProfit.toLocaleString()}`}
                    rate=""
                    levelUp
                >
                    <svg
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
                            fill=""
                        />
                        <path
                            d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
                            fill=""
                        />
                        <path
                            d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
                            fill=""
                        />
                    </svg>
                </CardDataStats>
                <CardDataStats
                    title="Total Outcome"
                    total={`Rp ${totalOutcome.toLocaleString()}`}
                    rate=""
                    levelUp
                >
                    <svg
                        className="fill-primary dark:fill-white"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                            fill=""
                        />
                        <path
                            d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                            fill=""
                        />
                    </svg>
                </CardDataStats>
                <CardDataStats
                    title="Total Students"
                    total={totalStudents}
                    rate=""
                    levelUp
                >
                    <svg
                        className="fill-primary dark:fill-white"
                        width="22"
                        height="18"
                        viewBox="0 0 22 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                            fill=""
                        />
                        <path
                            d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                            fill=""
                        />
                        <path
                            d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                            fill=""
                        />
                    </svg>
                </CardDataStats>
            </div> */}
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Laporan Pemasukan Cabang
                    </h4>
                    <div>
                        <Link href="/admin/laporan/cabang/create">
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                                Tambah Laporan
                            </button>
                        </Link>
                        <button
                            // onClick={downloadExcel}
                            onClick={() =>
                                downloadExcel2(
                                    laporanCabang,
                                    laporanPengeluaranCabang
                                )
                            }
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
                                    Cabang
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    5000
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    10.000
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    12.000
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
                                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data_laporanCabang.map((laporan, key) => (
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
                                        {laporan.cabang
                                            ? laporan.cabang.nama
                                            : "N/A"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.biaya_5000}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.biaya_10000}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.biaya_12000}
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
                                    <td className="py-4 px-4 text-center">
                                        {/* Action buttons */}
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                href={`/admin/laporan/cabang/${laporan.id}/edit`}
                                            >
                                                <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                            </Link>
                                            <Link
                                                href={`/admin/laporan/cabang/${laporan.id}`}
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
                        {/* <tfoot>
                            <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                                <td
                                    colSpan="3"
                                    className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10"
                                >
                                    Total
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.biaya_5000 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.biaya_10000 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.biaya_12000 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.totalbiaya || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.daftar || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.modul || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.kaos || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.kas || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.lainlain || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {laporanCabang.reduce(
                                        (sum, laporan) =>
                                            sum + (laporan.totalpemasukan || 0),
                                        0
                                    )}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot> */}
                    </table>
                    {/* Pagination Controls */}
                    <div className="pagination">
    <button
        onClick={() => handlePageChangeCabang(current_page_laporanCabang - 1)}
        disabled={current_page_laporanCabang <= 1}
    >
        Previous
    </button>
    <span>{current_page_laporanCabang} / {last_page_laporanCabang}</span>
    <button
        onClick={() => handlePageChangeCabang(current_page_laporanCabang + 1)}
        disabled={current_page_laporanCabang >= last_page_laporanCabang}
    >
        Next
    </button>
</div>
                </div>
            </div>

            {/* P E N G E L U A R A N */}

            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
                <div className="flex justify-between px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Laporan Pengeluaran Cabang
                    </h4>
                    <Link href="/admin/laporan/pengeluaran/create">
                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                            Tambah Pengeluaran
                        </button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                {/* Table Headers */}
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Hari
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Tanggal
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Cabang
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Nama Guru
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Gaji
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    ATK
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Sewa
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Intensif
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Lisensi
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    THR
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
                        {data_pengeluaran && data_pengeluaran.length > 0 ? (
    data_pengeluaran.map((pengeluaran, key) => (
        <tr key={key} className="border-b border-stroke dark:border-strokedark">
            {/* Data Rows */}
            <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                {pengeluaran.hari}
            </td>
            <td className="py-4 px-4 text-sm text-black dark:text-white">
                {pengeluaran.tanggal}
            </td>
            {/* More Data Cells */}
        </tr>
    ))
) : (
    <tr>
        <td colSpan="12" className="text-center">No data available</td>
    </tr>
)}
                        </tbody>
                        {/* Footer Row for Totals */}
                        {/* <tfoot>
                            <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                                <td
                                    colSpan="4"
                                    className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10"
                                >
                                    Total
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.gaji,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.atk,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.sewa,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.intensif,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.lisensi,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.thr,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.lainlain,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {laporanPengeluaranCabang.reduce(
                                        (sum, pengeluaran) =>
                                            sum + pengeluaran.totalpengeluaran,
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4"></td>
                            </tr>
                        </tfoot> */}
                    </table>
                    {/* Pagination Controls */}
                    <div className="pagination">
    <button
        onClick={() => handlePageChangePengeluaran(current_page_pengeluaran - 1)}
        disabled={current_page_pengeluaran <= 1}
    >
        Previous
    </button>
    <span>{current_page_pengeluaran} / {last_page_pengeluaran}</span>
    <button
        onClick={() => handlePageChangePengeluaran(current_page_pengeluaran + 1)}
        disabled={current_page_pengeluaran >= last_page_pengeluaran}
    >
        Next
    </button>
</div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Laporan;
