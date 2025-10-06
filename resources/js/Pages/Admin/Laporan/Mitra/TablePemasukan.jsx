import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import { usePage } from "@inertiajs/react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Inertia } from "@inertiajs/inertia";

const TablePemasukan = ({ selectedIds = [], setSelectedIds = () => { } }) => {
    const {
        laporanMitra,
        startOfWeek,
        endOfWeek,
        nextWeekOffset,
        prevWeekOffset,
        paketMitra,
    } = usePage().props;

    const goToWeek = (weekOffset) => {
        Inertia.get(route("admin.laporan.mitra"), { weekOffset });
    };

    // Bulk delete handlers
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = laporanMitra.data.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) {
            alert('Pilih item yang akan dihapus');
            return;
        }

        if (confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} item?`)) {
            Inertia.post(route('admin.laporan.mitra.bulk-destroy'), {
                ids: selectedIds
            }, {
                onSuccess: () => {
                    setSelectedIds([]);
                }
            });
        }
    };

    // Calculate total values for each column
    const getTotal = (key) => {
        return laporanMitra.data.reduce(
            (sum, laporan) => sum + (Number(laporan[key]) || 0),
            0
        );
    };

    // Calculate total for specific paket
    const getPaketTotal = (paketId) => {
        return laporanMitra.data.reduce((sum, laporan) => {
            const paketData = laporan.pakets?.find(p => p.id === paketId);
            return sum + (Number(paketData?.pivot?.jumlah) || 0);
        }, 0);
    };

    const downloadExcel = (laporanMitra, judul) => {
        const data = laporanMitra.data.map((laporan) => {
            const excelRow = {
                Hari: laporan.hari,
                Tanggal: laporan.tanggal,
            };

            // Dynamic paket columns
            paketMitra?.forEach((paket) => {
                const paketData = laporan.pakets?.find(p => p.id === paket.id);
                excelRow[`${paket.nama_paket} (${paket.harga.toLocaleString()})`] = paketData?.pivot?.jumlah || 0;
            });

            // Static columns
            excelRow["Total Biaya"] = Number(laporan.totalbiaya) || 0;
            excelRow["Daftar"] = Number(laporan.daftar) || 0;
            excelRow["Modul"] = Number(laporan.modul) || 0;
            excelRow["Kaos"] = Number(laporan.kaos) || 0;
            excelRow["Kas"] = Number(laporan.kas) || 0;
            excelRow["Lain Lain"] = Number(laporan.lainlain) || 0;
            excelRow["Total Pemasukan"] = Number(laporan.totalpemasukan) || 0;

            return excelRow;
        });

        // Hitung total untuk setiap kolom numerik
        const totals = {
            Hari: "Total",
            Tanggal: "",
        };

        // Add dynamic paket totals
        paketMitra?.forEach((paket) => {
            const headerKey = `${paket.nama_paket} (${paket.harga.toLocaleString()})`;
            totals[headerKey] = data.reduce((sum, row) => sum + (Number(row[headerKey]) || 0), 0);
        });

        // Add static column totals
        totals["Total Biaya"] = data.reduce((sum, row) => sum + (Number(row["Total Biaya"]) || 0), 0);
        totals["Daftar"] = data.reduce((sum, row) => sum + (Number(row["Daftar"]) || 0), 0);
        totals["Modul"] = data.reduce((sum, row) => sum + (Number(row["Modul"]) || 0), 0);
        totals["Kaos"] = data.reduce((sum, row) => sum + (Number(row["Kaos"]) || 0), 0);
        totals["Kas"] = data.reduce((sum, row) => sum + (Number(row["Kas"]) || 0), 0);
        totals["Lain Lain"] = data.reduce((sum, row) => sum + (Number(row["Lain Lain"]) || 0), 0);
        totals["Total Pemasukan"] = data.reduce((sum, row) => sum + (Number(row["Total Pemasukan"]) || 0), 0);

        // Tambahkan total sebagai baris terakhir
        data.push(totals);

        // Generate dynamic headers
        const staticHeaders = ["Hari", "Tanggal"];
        const paketHeaders = paketMitra?.map(paket => `${paket.nama_paket} (${paket.harga.toLocaleString()})`) || [];
        const otherHeaders = ["Total Biaya", "Daftar", "Modul", "Kaos", "Kas", "Lain Lain", "Total Pemasukan"];
        const headers = [...staticHeaders, ...paketHeaders, ...otherHeaders];

        // Membuat worksheet dengan header khusus
        const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

        // Menambahkan header secara eksplisit (jika perlu)
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

        // Membuat workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

        // Menentukan nama file dan mendownload
        const fileName = `Laporan_Pemasukan_mitra_${judul}.xlsx`;
        XLSX.writeFile(workbook, fileName);
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
                            onClick={() => downloadExcel(laporanMitra, `${startOfWeek} sampai ${endOfWeek}`)}
                            className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                        >
                            Download Excel
                        </button>

                        {selectedIds.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                            >
                                Hapus Terpilih ({selectedIds.length})
                            </button>
                        )}

                        <Link href="/admin/laporan/mitra/setting-harga">
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 ml-2 ">
                                Setting Harga
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                {/* Checkbox Header */}
                                <th className="py-4 px-4 text-center">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={laporanMitra.data.length > 0 && selectedIds.length === laporanMitra.data.length}
                                        className="w-4 h-4"
                                    />
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Hari
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Nama
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Tanggal
                                </th>

                                {/* Dynamic Paket Headers */}
                                {paketMitra && paketMitra.map((paket) => (
                                    <th key={paket.id} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
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
                                    {/* Checkbox Column */}
                                    <td className="py-4 px-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(laporan.id)}
                                            onChange={() => handleSelectItem(laporan.id)}
                                            className="w-4 h-4"
                                        />
                                    </td>

                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.hari}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.user ? laporan.user.name : "N/A"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.tanggal}
                                    </td>

                                    {/* Dynamic Paket Data */}
                                    {paketMitra && paketMitra.map((paket) => {
                                        const paketData = laporan.pakets?.find(p => p.id === paket.id);
                                        return (
                                            <td key={paket.id} className="py-4 px-4 text-sm text-black dark:text-white">
                                                {paketData?.pivot?.jumlah || 0}
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
                                                            "Are you sure you want to delete this item?"
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
                                <td className="py-4 px-4 text-center"></td>
                                <td
                                    colSpan="3"
                                    className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white"
                                >
                                    Total
                                </td>

                                {/* Dynamic Paket Totals */}
                                {paketMitra && paketMitra.map((paket) => (
                                    <td key={paket.id} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                        {getPaketTotal(paket.id)}
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

