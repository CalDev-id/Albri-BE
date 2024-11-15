import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import * as XLSX from "xlsx";
import TablePengeluaran from "./TablePengeluaran";
import TablePemasukan from "./TablePemasukan";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon


const Laporan = () => {
    const {  laporanPrivate, laporanPrivateFull, laporanPengeluaranPrivate, laporanPengeluaranPrivateFull } = usePage().props;

    const handleDownloadExcel = () => {
        // Prepare data for Excel
        const worksheetData = chatData.map((chat, index) => ({
            "Hari": "senin", // You can replace this with dynamic values from chatData
            "Tanggal": "20/21/2111",
            "7000": chat.column3 || 0,
            "8000": chat.column4 || 0,
            "10.000": chat.column5 || 0,
            "15.000": chat.column6 || 0,
            "Total Biaya": chat.totalBiaya || 0,
            "Daftar": chat.daftar || 0,
            "Modul": chat.modul || 0,
            "Kaos": chat.kaos || 0,
            "Kas": chat.kas || 0,
            "Lain Lain": chat.lainLain || 0,
            "Total": chat.Total || 0,
        }));

        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

        // Trigger file download
        XLSX.writeFile(workbook, "LaporanPemasukanMitra.xlsx");
    };
    return (
        <DefaultLayout>

        
        <TablePemasukan laporanPrivate={laporanPrivate} />
          



          {/* P E N G E L U A R A N */}

          <TablePengeluaran laporanPengeluaranPrivate={laporanPengeluaranPrivate} />
           
        </DefaultLayout>
    );
};

export default Laporan;
