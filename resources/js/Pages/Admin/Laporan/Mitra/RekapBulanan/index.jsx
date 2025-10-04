import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import "flowbite/dist/flowbite.min.js";
import TablePemasukanRekap from "./TablePemasukanRekap";
import TablePengeluaran from "./TablePengeluaranRekap";

const Laporan = ({
    laporanMitra,
    laporanPengeluaranMitra,
    bulan,
    tahun,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
    paketMitra,
}) => {
    // Utility functions for safe calculations
    const n = (v) => (typeof v === "number" ? v : (parseInt(v, 10) || 0));
    const fmt = (v) => n(v).toLocaleString();

    const calculateTotals = (laporanMitraData, laporanPengeluaranMitraData) => {
        // Ensure data is array with proper null checks
        const safeDataPemasukan = laporanMitraData && Array.isArray(laporanMitraData) ? laporanMitraData : [];
        const safeDataPengeluaran = laporanPengeluaranMitraData && Array.isArray(laporanPengeluaranMitraData) ? laporanPengeluaranMitraData : [];

        // Calculate total pemasukan
        const totalProfit = safeDataPemasukan.reduce(
            (sum, laporan) => sum + n(laporan?.totalpemasukan),
            0
        );

        // Calculate total pengeluaran
        const totalOutcome = safeDataPengeluaran.reduce(
            (sum, pengeluaran) => sum + n(pengeluaran?.totalpengeluaran),
            0
        );

        // Calculate total laba
        const totalLaba = totalProfit - totalOutcome;

        // Calculate total students (from pivot table paket) with proper null checks
        const totalStudents = safeDataPemasukan.reduce((sum, laporan) => {
            if (!laporan || !laporan.pakets || !Array.isArray(laporan.pakets)) return sum;

            return sum + laporan.pakets.reduce((paketSum, paket) => {
                return paketSum + n(paket?.pivot?.jumlah);
            }, 0);
        }, 0);

        return { totalLaba, totalProfit, totalOutcome, totalStudents };
    };

    // Safely get data with null checks
    const safeLaporanMitra = laporanMitra?.data || [];
    const safeLaporanPengeluaranMitra = laporanPengeluaranMitra?.data || [];

    const { totalLaba, totalProfit, totalOutcome, totalStudents } = calculateTotals(
        safeLaporanMitra,
        safeLaporanPengeluaranMitra
    );

    // Fungsi untuk download Excel gabungan dalam 1 halaman untuk Mitra dengan proper null handling
    const downloadExcelGabungan = (laporanMitra, laporanPengeluaranMitra, paketMitra, judul) => {
        const wb = XLSX.utils.book_new();
        const safePaketMitra = paketMitra && Array.isArray(paketMitra) ? paketMitra : [];
        const safeDataPemasukan = laporanMitra?.data || [];
        const safeDataPengeluaran = laporanPengeluaranMitra?.data || [];

        // Data gabungan dalam satu sheet
        const dataGabungan = [];

        // Calculate header positions with null checks
        const jumlahKolomPemasukan = 3 + safePaketMitra.length + 7 + 1;

        // Build headers safely
        const headerUtama = [`LAPORAN PEMASUKAN BULAN ${(bulan || '').toString().toUpperCase()} ${tahun || ''}`];
        for (let i = 1; i < jumlahKolomPemasukan; i++) {
            headerUtama.push("");
        }
        headerUtama.push(`LAPORAN PENGELUARAN BULAN ${(bulan || '').toString().toUpperCase()}`);

        dataGabungan.push(headerUtama);

        // Header kolom pemasukan with null checks
        const headerPemasukan = ["Hari", "Tanggal", "Nama"];
        safePaketMitra.forEach(p => {
            const harga = p && p.harga ? n(p.harga).toLocaleString() : '0';
            headerPemasukan.push(`${p?.nama_paket || 'N/A'} (${harga})`);
        });
        headerPemasukan.push("Total Biaya", "Daftar", "Modul", "Kaos", "Kas", "Lain Lain", "Jumlah", "");

        // Header kolom pengeluaran
        const headerPengeluaran = ["Pembuat Laporan", "Detail Gaji Mitra", "ATK", "Sewa", "Intensif", "Lisensi", "THR", "Lain Lain", "Jumlah", "Albri"];

        const headerLengkap = [...headerPemasukan, ...headerPengeluaran];
        dataGabungan.push(headerLengkap);

        // Helper functions untuk pemasukan mitra with null checks
        const getJumlahPaketInRow = (laporan, paketId) => {
            if (!laporan || !laporan.pakets || !Array.isArray(laporan.pakets)) return 0;
            const found = laporan.pakets.find((p) => p && p.id === paketId);
            return found ? n(found.pivot?.jumlah) : 0;
        };

        // Process data safely
        const hariMap = new Map();

        // Kumpulkan data pemasukan mitra with null checks
        safeDataPemasukan.forEach(lap => {
            if (!lap || !lap.tanggal) return;

            const key = lap.tanggal;
            if (!hariMap.has(key)) {
                hariMap.set(key, {
                    hari: lap.hari || '',
                    tanggal: lap.tanggal || '',
                    pemasukan: {
                        nama: [],
                        pakets: {},
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

            // Akumulasi data pemasukan mitra
            safePaketMitra.forEach(p => {
                if (p && p.id) {
                    if (!dayData.pemasukan.pakets[p.id]) dayData.pemasukan.pakets[p.id] = 0;
                    dayData.pemasukan.pakets[p.id] += getJumlahPaketInRow(lap, p.id);
                }
            });

            dayData.pemasukan.totalbiaya += n(lap.totalbiaya);
            dayData.pemasukan.daftar += n(lap.daftar);
            dayData.pemasukan.modul += n(lap.modul);
            dayData.pemasukan.kaos += n(lap.kaos);
            dayData.pemasukan.kas += n(lap.kas);
            dayData.pemasukan.lainlain += n(lap.lainlain);
            dayData.pemasukan.total += n(lap.totalpemasukan);
        });

        // Kumpulkan data pengeluaran mitra with null checks
        safeDataPengeluaran.forEach(pengeluaran => {
            if (!pengeluaran || !pengeluaran.tanggal) return;

            const key = pengeluaran.tanggal;
            if (!hariMap.has(key)) {
                hariMap.set(key, {
                    hari: pengeluaran.hari || '',
                    tanggal: pengeluaran.tanggal || '',
                    pemasukan: {
                        nama: [],
                        pakets: {},
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

            // Kumpulkan detail gaji mitra dengan null checks
            if (pengeluaran.mitras && Array.isArray(pengeluaran.mitras) && pengeluaran.mitras.length > 0) {
                pengeluaran.mitras.forEach(mitra => {
                    if (mitra && mitra.mitra_nama) {
                        const gajiInfo = `${mitra.mitra_nama}: Rp ${n(mitra.gaji).toLocaleString()}`;
                        if (!dayData.pengeluaran.gajiDetail.includes(gajiInfo)) {
                            dayData.pengeluaran.gajiDetail.push(gajiInfo);
                        }
                    }
                });
            } else if (pengeluaran.gaji && n(pengeluaran.gaji) > 0) {
                // Fallback jika tidak ada array mitras tapi ada field gaji langsung
                const gajiInfo = `Gaji Mitra: Rp ${n(pengeluaran.gaji).toLocaleString()}`;
                if (!dayData.pengeluaran.gajiDetail.includes(gajiInfo)) {
                    dayData.pengeluaran.gajiDetail.push(gajiInfo);
                }
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

        // Convert map to array and sort by date
        const sortedData = Array.from(hariMap.values()).sort((a, b) => {
            const dateA = new Date(a.tanggal);
            const dateB = new Date(b.tanggal);
            return dateA - dateB;
        });

        // Build data rows
        let totalPemasukanBulan = 0;
        let totalPengeluaranBulan = 0;
        const totalPaketBulan = {};

        safePaketMitra.forEach(p => {
            if (p && p.id) {
                totalPaketBulan[p.id] = 0;
            }
        });

        sortedData.forEach(dayData => {
            const row = [];

            // Kolom pemasukan
            row.push(dayData.hari);
            row.push(dayData.tanggal);
            row.push(dayData.pemasukan.nama.join(", ") || "N/A");

            // Kolom paket
            safePaketMitra.forEach(p => {
                if (p && p.id) {
                    const jumlahPaket = dayData.pemasukan.pakets[p.id] || 0;
                    row.push(jumlahPaket);
                    totalPaketBulan[p.id] += jumlahPaket;
                }
            });

            row.push(dayData.pemasukan.totalbiaya);
            row.push(dayData.pemasukan.daftar);
            row.push(dayData.pemasukan.modul);
            row.push(dayData.pemasukan.kaos);
            row.push(dayData.pemasukan.kas);
            row.push(dayData.pemasukan.lainlain);
            row.push(dayData.pemasukan.total);
            row.push("");
            totalPemasukanBulan += dayData.pemasukan.total;

            // Kolom pengeluaran
            row.push(dayData.pengeluaran.pembuat.join(", ") || "N/A");
            row.push(dayData.pengeluaran.gajiDetail.join("; ") || "N/A");
            row.push(dayData.pengeluaran.atk);
            row.push(dayData.pengeluaran.sewa);
            row.push(dayData.pengeluaran.intensif);
            row.push(dayData.pengeluaran.lisensi);
            row.push(dayData.pengeluaran.thr);
            row.push(dayData.pengeluaran.lainlain);
            row.push(dayData.pengeluaran.total);
            row.push(dayData.pemasukan.total - dayData.pengeluaran.total);
            totalPengeluaranBulan += dayData.pengeluaran.total;

            dataGabungan.push(row);
        });

        // Build total row
        const totalRow = [];
        totalRow.push("TOTAL");
        totalRow.push("");
        totalRow.push("");

        // Total paket
        safePaketMitra.forEach(p => {
            if (p && p.id) {
                totalRow.push(totalPaketBulan[p.id] || 0);
            }
        });

        // Calculate totals safely
        const totalTotalBiaya = safeDataPemasukan.reduce((sum, lap) => sum + n(lap?.totalbiaya), 0);
        const totalDaftar = safeDataPemasukan.reduce((sum, lap) => sum + n(lap?.daftar), 0);
        const totalModul = safeDataPemasukan.reduce((sum, lap) => sum + n(lap?.modul), 0);
        const totalKaos = safeDataPemasukan.reduce((sum, lap) => sum + n(lap?.kaos), 0);
        const totalKas = safeDataPemasukan.reduce((sum, lap) => sum + n(lap?.kas), 0);
        const totalLainLainPemasukan = safeDataPemasukan.reduce((sum, lap) => sum + n(lap?.lainlain), 0);

        totalRow.push(totalTotalBiaya);
        totalRow.push(totalDaftar);
        totalRow.push(totalModul);
        totalRow.push(totalKaos);
        totalRow.push(totalKas);
        totalRow.push(totalLainLainPemasukan);
        totalRow.push(totalProfit);
        totalRow.push("");

        totalRow.push("");

        // Total gaji dari semua mitra with safe calculation
        let totalGajiSemuaMitra = 0;
        safeDataPengeluaran.forEach(p => {
            if (p && p.mitras && Array.isArray(p.mitras) && p.mitras.length > 0) {
                totalGajiSemuaMitra += p.mitras.reduce((sum, mitra) => sum + n(mitra?.gaji), 0);
            } else {
                totalGajiSemuaMitra += n(p?.gaji);
            }
        });
        totalRow.push(`Total Gaji: Rp ${totalGajiSemuaMitra.toLocaleString()}`);

        const totalAtk = safeDataPengeluaran.reduce((sum, p) => sum + n(p?.atk), 0);
        const totalSewa = safeDataPengeluaran.reduce((sum, p) => sum + n(p?.sewa), 0);
        const totalIntensif = safeDataPengeluaran.reduce((sum, p) => sum + n(p?.intensif), 0);
        const totalLisensi = safeDataPengeluaran.reduce((sum, p) => sum + n(p?.lisensi), 0);
        const totalThr = safeDataPengeluaran.reduce((sum, p) => sum + n(p?.thr), 0);
        const totalLainLainPengeluaran = safeDataPengeluaran.reduce((sum, p) => sum + n(p?.lainlain), 0);

        totalRow.push(totalAtk);
        totalRow.push(totalSewa);
        totalRow.push(totalIntensif);
        totalRow.push(totalLisensi);
        totalRow.push(totalThr);
        totalRow.push(totalLainLainPengeluaran);
        totalRow.push(totalOutcome);
        totalRow.push(totalLaba);

        dataGabungan.push(totalRow);

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(dataGabungan);
        const wscols = headerLengkap.map(() => ({ width: 15 }));
        ws['!cols'] = wscols;

        // Apply formatting
        const totalRowIndex = dataGabungan.length - 1;
        for (let col = 0; col < headerLengkap.length; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: totalRowIndex, c: col });
            if (!ws[cellRef]) ws[cellRef] = {};
            ws[cellRef].s = {
                font: { bold: true }
            };
        }

        XLSX.utils.book_append_sheet(wb, ws, "Rekap Gabungan Mitra");

        const fileName = `Rekap_Gabungan_Mitra_${judul}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    // Print function with safe data handling
    const printLaporan = () => {
        const printWindow = window.open('', '_blank');
        const safePaketMitra = paketMitra && Array.isArray(paketMitra) ? paketMitra : [];
        const safeDataPemasukan = laporanMitra?.data || [];
        const safeDataPengeluaran = laporanPengeluaranMitra?.data || [];

        // Generate print content with safe operations
        let printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan Mitra ${(bulan || '').toString().toUpperCase()} ${tahun || ''}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px; 
                        font-size: 12px;
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                    }
                    .section-title { 
                        font-size: 16px; 
                        font-weight: bold; 
                        margin: 20px 0 10px 0; 
                        color: #333;
                        border-bottom: 2px solid #333;
                        padding-bottom: 5px;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-bottom: 20px; 
                    }
                    th, td { 
                        border: 1px solid #333; 
                        padding: 8px; 
                        text-align: left; 
                    }
                    th { 
                        background-color: #f5f5f5; 
                        font-weight: bold; 
                    }
                    .total-row { 
                        background-color: #e8f4fd; 
                        font-weight: bold; 
                    }
                    .summary { 
                        display: flex; 
                        justify-content: space-around; 
                        margin: 20px 0; 
                    }
                    .summary-item { 
                        text-align: center; 
                        padding: 15px; 
                        border: 2px solid #333; 
                        border-radius: 8px; 
                        background-color: #f9f9f9; 
                    }
                    .summary-value { 
                        font-size: 18px; 
                        font-weight: bold; 
                        color: #2563eb; 
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>LAPORAN REKAP BULANAN MITRA</h1>
                    <h2>${(bulan || '').toString().toUpperCase()} ${tahun || ''}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${fmt(totalLaba)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pemasukan</div>
                        <div class="summary-value">Rp ${fmt(totalProfit)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pengeluaran</div>
                        <div class="summary-value">Rp ${fmt(totalOutcome)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Siswa</div>
                        <div class="summary-value">${totalStudents}</div>
                    </div>
                </div>

                <div class="section-title">LAPORAN PEMASUKAN MITRA</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Pembuat Laporan</th>`;

        // Add paket headers safely
        safePaketMitra.forEach(paket => {
            const harga = paket && paket.harga ? n(paket.harga).toLocaleString() : '0';
            printContent += `<th>${paket?.nama_paket || 'N/A'}<br>(Rp ${harga})</th>`;
        });

        printContent += `
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;

        // Process data safely for print
        const totalPaketPrint = {};
        safePaketMitra.forEach(p => {
            if (p && p.id) {
                totalPaketPrint[p.id] = 0;
            }
        });

        safeDataPemasukan.forEach(laporan => {
            if (!laporan) return;

            printContent += `
                <tr>
                    <td>${laporan.hari || ''}</td>
                    <td>${laporan.tanggal || ''}</td>
                    <td>${laporan.user?.name || 'N/A'}</td>`;

            safePaketMitra.forEach(paket => {
                if (paket && paket.id) {
                    const jumlah = laporan.pakets?.find(p => p && p.id === paket.id)?.pivot?.jumlah || 0;
                    totalPaketPrint[paket.id] += n(jumlah);
                    printContent += `<td>${jumlah}</td>`;
                }
            });

            printContent += `
                    <td>Rp ${fmt(laporan.totalbiaya)}</td>
                    <td>Rp ${fmt(laporan.daftar)}</td>
                    <td>Rp ${fmt(laporan.modul)}</td>
                    <td>Rp ${fmt(laporan.kaos)}</td>
                    <td>Rp ${fmt(laporan.kas)}</td>
                    <td>Rp ${fmt(laporan.lainlain)}</td>
                    <td>Rp ${fmt(laporan.totalpemasukan)}</td>
                </tr>`;
        });

        // Add total row for pemasukan
        printContent += `
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>`;

        safePaketMitra.forEach(paket => {
            printContent += `<td><strong>${totalPaketPrint[paket.id]}</strong></td>`;
        });

        const totalTotalBiaya = laporanMitra?.data?.reduce((sum, lap) => sum + n(lap.totalbiaya), 0) || 0;
        const totalDaftar = laporanMitra?.data?.reduce((sum, lap) => sum + n(lap.daftar), 0) || 0;
        const totalModul = laporanMitra?.data?.reduce((sum, lap) => sum + n(lap.modul), 0) || 0;
        const totalKaos = laporanMitra?.data?.reduce((sum, lap) => sum + n(lap.kaos), 0) || 0;
        const totalKas = laporanMitra?.data?.reduce((sum, lap) => sum + n(lap.kas), 0) || 0;
        const totalLainLainPemasukan = laporanMitra?.data?.reduce((sum, lap) => sum + n(lap.lainlain), 0) || 0;

        printContent += `
                    <td><strong>Rp ${totalTotalBiaya.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalDaftar.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalModul.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalKaos.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalKas.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalLainLainPemasukan.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalProfit.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div class="section-title">LAPORAN PENGELUARAN MITRA</div>
        <table>
            <thead>
                <tr>
                    <th>Hari</th>
                    <th>Tanggal</th>
                    <th>Pembuat Laporan</th>
                    <th>Detail Gaji Mitra</th>
                    <th>ATK</th>
                    <th>Intensif</th>
                    <th>Lisensi</th>
                    <th>Lain-lain</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`;

        // Add pengeluaran data
        if (laporanPengeluaranMitra && laporanPengeluaranMitra.data) {
            laporanPengeluaranMitra.data.forEach(pengeluaran => {
                const gajiDetail = pengeluaran.mitras && pengeluaran.mitras.length > 0
                    ? pengeluaran.mitras.map(mitra => `${mitra.mitra_nama}: Rp ${(mitra.gaji || 0).toLocaleString()}`).join('<br>')
                    : 'N/A';

                printContent += `
                    <tr>
                        <td>${pengeluaran.hari}</td>
                        <td>${pengeluaran.tanggal}</td>
                        <td>${pengeluaran.user?.name || 'N/A'}</td>
                        <td>${gajiDetail}</td>
                        <td>Rp ${n(pengeluaran.atk).toLocaleString()}</td>
                        <td>Rp ${n(pengeluaran.intensif).toLocaleString()}</td>
                        <td>Rp ${n(pengeluaran.lisensi).toLocaleString()}</td>
                        <td>Rp ${n(pengeluaran.lainlain).toLocaleString()}</td>
                        <td>Rp ${n(pengeluaran.totalpengeluaran).toLocaleString()}</td>
                    </tr>`;
            });
        }

        // Add total row for pengeluaran
        let totalGajiSemuaMitra = 0;
        if (laporanPengeluaranMitra?.data) {
            laporanPengeluaranMitra.data.forEach(p => {
                if (p.mitras && p.mitras.length > 0) {
                    totalGajiSemuaMitra += p.mitras.reduce((sum, mitra) => sum + (mitra.gaji || 0), 0);
                }
            });
        }

        const totalAtk = laporanPengeluaranMitra?.data?.reduce((sum, p) => sum + n(p.atk), 0) || 0;
        const totalIntensif = laporanPengeluaranMitra?.data?.reduce((sum, p) => sum + n(p.intensif), 0) || 0;
        const totalLisensi = laporanPengeluaranMitra?.data?.reduce((sum, p) => sum + n(p.lisensi), 0) || 0;
        const totalLainLainPengeluaran = laporanPengeluaranMitra?.data?.reduce((sum, p) => sum + n(p.lainlain), 0) || 0;

        printContent += `
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${totalGajiSemuaMitra.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalAtk.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalIntensif.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalLisensi.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalLainLainPengeluaran.toLocaleString()}</strong></td>
                    <td><strong>Rp ${totalOutcome.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: center; font-size: 14px;">
            <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
        </div>

        </body>
        </html>`;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10">
                <CardDataStats
                    title="Total Laba"
                    total={`Rp ${fmt(totalLaba)}`}
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
                    total={`Rp ${fmt(totalProfit)}`}
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
                    total={`Rp ${fmt(totalOutcome)}`}
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

            {/* Tombol Download Excel Gabungan dan Print */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => downloadExcelGabungan(laporanMitra, laporanPengeluaranMitra, paketMitra, `${bulan}_${tahun}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Excel Gabungan
                </button>

                <button
                    onClick={printLaporan}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    Print Laporan
                </button>
            </div>

            <TablePemasukanRekap laporanMitra={laporanMitra} bulan={bulan} tahun={tahun} nextMonth={nextMonth} nextYear={nextYear} prevMonth={prevMonth} prevYear={prevYear} paketMitra={paketMitra} />

            {/* P E N G E L U A R A N */}

            <TablePengeluaran laporanPengeluaranMitra={laporanPengeluaranMitra} bulan={bulan} tahun={tahun} nextMonth={nextMonth} nextYear={nextYear} prevMonth={prevMonth} prevYear={prevYear} />
        </DefaultLayout>
    );
};

export default Laporan;
