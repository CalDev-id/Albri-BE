import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import "flowbite/dist/flowbite.min.js";
import { Inertia } from "@inertiajs/inertia";

import { Link } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import RekapPemasukan from "./RekapPemasukan";
import RekapPengeluaran from "./RekapPengeluaran";

const Laporan = ({
    laporanPrivate,
    laporanPengeluaranPrivate,
    bulan,
    tahun,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
    paketPrivate,
}) => {
    const calculateTotals = (
        laporanPrivateData,
        laporanPengeluaranPrivateData
    ) => {
        // Pastikan data adalah array
        if (!Array.isArray(laporanPrivateData)) laporanPrivateData = [];
        if (!Array.isArray(laporanPengeluaranPrivateData))
            laporanPengeluaranPrivateData = [];

        // Hitung total pemasukan
        const totalProfit = laporanPrivateData.reduce(
            (sum, laporan) => sum + (laporan.totalpemasukan || 0),
            0
        );

        // Hitung total pengeluaran
        const totalOutcome = laporanPengeluaranPrivateData.reduce(
            (sum, pengeluaran) => sum + (pengeluaran.totalpengeluaran || 0),
            0
        );

        // Hitung total laba
        const totalLaba = totalProfit - totalOutcome;

        // Hitung total students (biaya)
        const totalStudents = laporanPrivateData.reduce(
            (sum, laporan) =>
                sum +
                ((laporan.biaya_30 || 0) +
                    (laporan.biaya_35 || 0) +
                    (laporan.biaya_40 || 0) +
                    (laporan.biaya_45 || 0)),
            0
        );

        return { totalLaba, totalProfit, totalOutcome, totalStudents };
    };

    // Memastikan .data digunakan saat memanggil fungsi
    const { totalLaba, totalProfit, totalOutcome, totalStudents } =
        calculateTotals(laporanPrivate?.data || [], laporanPengeluaranPrivate?.data || []);

    // Fungsi untuk download Excel gabungan dalam 1 halaman untuk Private
    const downloadExcelGabungan = (laporanPrivate, laporanPengeluaranPrivate, paketPrivate, judul) => {
        const workbook = XLSX.utils.book_new();
        const n = (v) => (typeof v === "number" ? v : (parseInt(v, 10) || 0));
        const safePaketPrivate = paketPrivate || [];

        // Data gabungan dalam satu sheet
        const dataGabungan = [];

        // Hitung posisi header pengeluaran berdasarkan jumlah kolom pemasukan
        // Kolom pemasukan: Hari, Tanggal, Nama + 4 kolom paket (30, 35, 40, 45) + 7 kolom lainnya (Total Biaya, Daftar, Modul, Kaos, Kas, Lain Lain, Jumlah) + 1 kolom jarak
        const jumlahKolomPemasukan = 3 + 4 + 7 + 1; // 3 kolom awal + 4 paket tetap + 7 kolom akhir + 1 jarak

        // Buat array header utama dengan posisi yang tepat
        const headerUtama = [`LAPORAN PEMASUKAN BULAN ${bulan.toUpperCase()} ${tahun}`];
        // Isi kolom kosong sampai posisi pembuat laporan (kolom pertama pengeluaran)
        for (let i = 1; i < jumlahKolomPemasukan; i++) {
            headerUtama.push("");
        }
        // Tambahkan header pengeluaran di posisi yang tepat
        headerUtama.push(`LAPORAN PENGELUARAN BULAN ${bulan.toUpperCase()}`);

        dataGabungan.push(headerUtama);

        // Header kolom pemasukan
        const headerPemasukan = ["Hari", "Tanggal", "Nama"];
        // Tambahkan kolom paket private yang tetap (30, 35, 40, 45)
        headerPemasukan.push("30 Menit", "35 Menit", "40 Menit", "45 Menit");
        headerPemasukan.push("Total Biaya", "Daftar", "Modul", "Kaos", "Kas", "Lain Lain", "Jumlah", ""); // Tambah kolom jarak kosong

        // Header kolom pengeluaran
        const headerPengeluaran = ["Pembuat Laporan", "Detail Gaji Private", "ATK", "Sewa", "Intensif", "Lisensi", "THR", "Lain Lain", "Jumlah", "Laba"];

        // Gabungkan header
        const headerLengkap = [...headerPemasukan, ...headerPengeluaran];
        dataGabungan.push(headerLengkap);

        // Buat map untuk data harian
        const hariMap = new Map();

        // Kumpulkan data pemasukan private
        if (laporanPrivate && laporanPrivate.data) {
            laporanPrivate.data.forEach(lap => {
                const key = lap.tanggal;
                if (!hariMap.has(key)) {
                    hariMap.set(key, {
                        hari: lap.hari,
                        tanggal: lap.tanggal,
                        pemasukan: {
                            nama: [],
                            biaya_30: 0,
                            biaya_35: 0,
                            biaya_40: 0,
                            biaya_45: 0,
                            totalbiaya: 0,
                            daftar: 0,
                            modul: 0,
                            kaos: 0,
                            kas: 0,
                            lainlain: 0,
                            total: 0
                        },
                        pengeluaran: {
                            pembuat: [],
                            gajiDetail: [],
                            atk: 0,
                            sewa: 0,
                            intensif: 0,
                            lisensi: 0,
                            thr: 0,
                            lainlain: 0,
                            total: 0
                        }
                    });
                }

                const dayData = hariMap.get(key);

                // Kumpulkan nama pembuat pemasukan
                if (lap.user && lap.user.name) {
                    if (!dayData.pemasukan.nama.includes(lap.user.name)) {
                        dayData.pemasukan.nama.push(lap.user.name);
                    }
                }

                // Akumulasi data pemasukan private
                dayData.pemasukan.biaya_30 += n(lap.biaya_30);
                dayData.pemasukan.biaya_35 += n(lap.biaya_35);
                dayData.pemasukan.biaya_40 += n(lap.biaya_40);
                dayData.pemasukan.biaya_45 += n(lap.biaya_45);
                dayData.pemasukan.totalbiaya += n(lap.totalbiaya);
                dayData.pemasukan.daftar += n(lap.daftar);
                dayData.pemasukan.modul += n(lap.modul);
                dayData.pemasukan.kaos += n(lap.kaos);
                dayData.pemasukan.kas += n(lap.kas);
                dayData.pemasukan.lainlain += n(lap.lainlain);
                dayData.pemasukan.total += n(lap.totalpemasukan);
            });
        }

        // Kumpulkan data pengeluaran private
        if (laporanPengeluaranPrivate && laporanPengeluaranPrivate.data) {
            laporanPengeluaranPrivate.data.forEach(pengeluaran => {
                const key = pengeluaran.tanggal;
                if (!hariMap.has(key)) {
                    hariMap.set(key, {
                        hari: pengeluaran.hari,
                        tanggal: pengeluaran.tanggal,
                        pemasukan: {
                            nama: [],
                            biaya_30: 0,
                            biaya_35: 0,
                            biaya_40: 0,
                            biaya_45: 0,
                            totalbiaya: 0,
                            daftar: 0,
                            modul: 0,
                            kaos: 0,
                            kas: 0,
                            lainlain: 0,
                            total: 0
                        },
                        pengeluaran: {
                            pembuat: [],
                            gajiDetail: [],
                            atk: 0,
                            sewa: 0,
                            intensif: 0,
                            lisensi: 0,
                            thr: 0,
                            lainlain: 0,
                            total: 0
                        }
                    });
                }

                const dayData = hariMap.get(key);

                // Kumpulkan nama pembuat pengeluaran
                if (pengeluaran.user && pengeluaran.user.name) {
                    if (!dayData.pengeluaran.pembuat.includes(pengeluaran.user.name)) {
                        dayData.pengeluaran.pembuat.push(pengeluaran.user.name);
                    }
                }

                // Kumpulkan detail gaji private (sistem dinamis)
                if (pengeluaran.gurus && pengeluaran.gurus.length > 0) {
                    pengeluaran.gurus.forEach(guru => {
                        if (guru.guru_id && guru.gaji) {
                            dayData.pengeluaran.gajiDetail.push(`${guru.guru_id}: ${n(guru.gaji).toLocaleString()}`);
                        }
                    });
                } else if (pengeluaran.gaji && n(pengeluaran.gaji) > 0) {
                    dayData.pengeluaran.gajiDetail.push(`Private: ${n(pengeluaran.gaji).toLocaleString()}`);
                }

                // Akumulasi data pengeluaran
                dayData.pengeluaran.atk += n(pengeluaran.atk);
                dayData.pengeluaran.sewa += n(pengeluaran.sewa);
                dayData.pengeluaran.intensif += n(pengeluaran.intensif);
                dayData.pengeluaran.lisensi += n(pengeluaran.lisensi);
                dayData.pengeluaran.thr += n(pengeluaran.thr);
                dayData.pengeluaran.lainlain += n(pengeluaran.lainlain);
                dayData.pengeluaran.total += n(pengeluaran.totalpengeluaran);
            });
        }

        // Convert map to array dan sort by date
        const sortedData = Array.from(hariMap.values()).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

        // Buat baris data
        let totalPemasukanBulan = 0;
        let totalPengeluaranBulan = 0;
        let totalBiaya30Bulan = 0;
        let totalBiaya35Bulan = 0;
        let totalBiaya40Bulan = 0;
        let totalBiaya45Bulan = 0;

        sortedData.forEach(dayData => {
            const row = [];

            // Kolom pemasukan
            row.push(dayData.hari);
            row.push(dayData.tanggal);
            row.push(dayData.pemasukan.nama.join(", ") || "N/A"); // Nama pembuat pemasukan

            // Data paket private
            row.push(dayData.pemasukan.biaya_30 || 0);
            row.push(dayData.pemasukan.biaya_35 || 0);
            row.push(dayData.pemasukan.biaya_40 || 0);
            row.push(dayData.pemasukan.biaya_45 || 0);

            // Data pemasukan lainnya
            row.push(dayData.pemasukan.totalbiaya || 0);
            row.push(dayData.pemasukan.daftar || 0);
            row.push(dayData.pemasukan.modul || 0);
            row.push(dayData.pemasukan.kaos || 0);
            row.push(dayData.pemasukan.kas || 0);
            row.push(dayData.pemasukan.lainlain || 0);
            row.push(dayData.pemasukan.total || 0);
            row.push(""); // Kolom jarak

            // Kolom pengeluaran
            row.push(dayData.pengeluaran.pembuat.join(", ") || "N/A"); // Nama pembuat pengeluaran
            row.push(dayData.pengeluaran.gajiDetail.join(", ") || "N/A"); // Detail gaji private
            row.push(dayData.pengeluaran.atk || 0);
            row.push(dayData.pengeluaran.sewa || 0);
            row.push(dayData.pengeluaran.intensif || 0);
            row.push(dayData.pengeluaran.lisensi || 0);
            row.push(dayData.pengeluaran.thr || 0);
            row.push(dayData.pengeluaran.lainlain || 0);
            row.push(dayData.pengeluaran.total || 0);

            // Hitung laba harian (pemasukan - pengeluaran)
            const labaHarian = (dayData.pemasukan.total || 0) - (dayData.pengeluaran.total || 0);
            row.push(labaHarian);

            dataGabungan.push(row);

            // Update total bulanan
            totalPemasukanBulan += dayData.pemasukan.total || 0;
            totalPengeluaranBulan += dayData.pengeluaran.total || 0;
            totalBiaya30Bulan += dayData.pemasukan.biaya_30 || 0;
            totalBiaya35Bulan += dayData.pemasukan.biaya_35 || 0;
            totalBiaya40Bulan += dayData.pemasukan.biaya_40 || 0;
            totalBiaya45Bulan += dayData.pemasukan.biaya_45 || 0;
        });

        // Tambahkan baris kosong untuk pemisah
        dataGabungan.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);

        // Tambahkan baris total
        const rowTotal = [];
        rowTotal.push("TOTAL");
        rowTotal.push("");
        rowTotal.push("");
        rowTotal.push(totalBiaya30Bulan);
        rowTotal.push(totalBiaya35Bulan);
        rowTotal.push(totalBiaya40Bulan);
        rowTotal.push(totalBiaya45Bulan);
        // Skip kolom total biaya sampai jumlah pemasukan
        for (let i = 7; i < 12; i++) {
            rowTotal.push("");
        }
        rowTotal.push(totalPemasukanBulan);
        rowTotal.push(""); // Kolom jarak
        rowTotal.push(""); // Pembuat laporan
        rowTotal.push(""); // Detail gaji
        // Skip kolom ATK sampai lain-lain
        for (let i = 16; i < 22; i++) {
            rowTotal.push("");
        }
        rowTotal.push(totalPengeluaranBulan);
        rowTotal.push(totalPemasukanBulan - totalPengeluaranBulan); // Total laba

        dataGabungan.push(rowTotal);

        // Buat worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(dataGabungan);

        // Set lebar kolom
        const colWidths = [
            { wch: 10 }, // Hari
            { wch: 12 }, // Tanggal
            { wch: 15 }, // Nama Pemasukan
            { wch: 12 }, // 30 Menit
            { wch: 12 }, // 35 Menit
            { wch: 12 }, // 40 Menit
            { wch: 12 }, // 45 Menit
            { wch: 12 }, // Total Biaya
            { wch: 10 }, // Daftar
            { wch: 10 }, // Modul
            { wch: 10 }, // Kaos
            { wch: 10 }, // Kas
            { wch: 12 }, // Lain Lain
            { wch: 15 }, // Jumlah Pemasukan
            { wch: 3 },  // Jarak
            { wch: 15 }, // Pembuat Laporan
            { wch: 25 }, // Detail Gaji Private
            { wch: 10 }, // ATK
            { wch: 10 }, // Sewa
            { wch: 12 }, // Intensif
            { wch: 10 }, // Lisensi
            { wch: 10 }, // THR
            { wch: 12 }, // Lain Lain
            { wch: 15 }, // Jumlah Pengeluaran
            { wch: 15 }  // Laba
        ];
        worksheet['!cols'] = colWidths;

        // Style untuk header utama (bold dan center)
        const headerMainStyle = {
            font: { bold: true, size: 14 },
            alignment: { horizontal: 'center' }
        };

        // Style untuk header kolom (bold)
        const headerColumnStyle = {
            font: { bold: true },
            alignment: { horizontal: 'center' }
        };

        // Style untuk total (bold)
        const totalStyle = {
            font: { bold: true }
        };

        // Apply style ke header utama (baris 1)
        if (dataGabungan.length > 0) {
            const headerRange = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: colWidths.length - 1, r: 0 } });
            worksheet[XLSX.utils.encode_cell({ c: 0, r: 0 })] = {
                ...worksheet[XLSX.utils.encode_cell({ c: 0, r: 0 })],
                s: headerMainStyle
            };
            worksheet[XLSX.utils.encode_cell({ c: jumlahKolomPemasukan, r: 0 })] = {
                ...worksheet[XLSX.utils.encode_cell({ c: jumlahKolomPemasukan, r: 0 })],
                s: headerMainStyle
            };
        }

        // Apply style ke header kolom (baris 2)
        if (dataGabungan.length > 1) {
            for (let col = 0; col < colWidths.length; col++) {
                const cellRef = XLSX.utils.encode_cell({ c: col, r: 1 });
                if (worksheet[cellRef]) {
                    worksheet[cellRef].s = headerColumnStyle;
                }
            }
        }

        // Apply style ke baris total (baris terakhir)
        const totalRowIndex = dataGabungan.length - 1;
        if (totalRowIndex >= 0) {
            for (let col = 0; col < colWidths.length; col++) {
                const cellRef = XLSX.utils.encode_cell({ c: col, r: totalRowIndex });
                if (worksheet[cellRef]) {
                    worksheet[cellRef].s = totalStyle;
                }
            }
        }

        // Tambahkan worksheet ke workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Gabungan Private");

        // Download file
        const fileName = `${judul}_${bulan}_${tahun}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10">
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
            </div>

            {/* Tombol Download Excel Gabungan */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => downloadExcelGabungan(laporanPrivate, laporanPengeluaranPrivate, paketPrivate, `Rekap_Gabungan_Private`)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Excel Gabungan
                </button>
            </div>

            <RekapPemasukan
                laporanPrivate={laporanPrivate}
                bulan={bulan}
                tahun={tahun}
                nextMonth={nextMonth}
                nextYear={nextYear}
                prevMonth={prevMonth}
                prevYear={prevYear}
                paketPrivate={paketPrivate}
            />

            {/* P E N G E L U A R A N */}

            <RekapPengeluaran
                laporanPengeluaranPrivate={laporanPengeluaranPrivate}
                bulan={bulan}
                tahun={tahun}
                nextMonth={nextMonth}
                nextYear={nextYear}
                prevMonth={prevMonth}
                prevYear={prevYear}
            />
        </DefaultLayout>
    );
};

export default Laporan;
