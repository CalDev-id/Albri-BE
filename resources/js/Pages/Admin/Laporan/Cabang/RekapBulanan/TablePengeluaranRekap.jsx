import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import "flowbite/dist/flowbite.min.js";
import { usePage } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
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
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Utility functions similar to working TablePemasukan
    const n = (v) => (typeof v === "number" ? v : (parseInt(v, 10) || 0));
    const fmt = (v) => n(v).toLocaleString();

    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.cabang"), {
            bulan: month,
            tahun: year,
        });
    };

    const calculateTotal = (field) => {
        return laporanPengeluaranCabang.data.reduce((sum, pengeluaran) => {
            if (field === "gaji") {
                // Handle gurus array with proper null checks
                if (pengeluaran.gurus && Array.isArray(pengeluaran.gurus) && pengeluaran.gurus.length > 0) {
                    return sum + pengeluaran.gurus.reduce((gSum, g) => gSum + n(g.gaji), 0);
                }
                // fallback ke gaji langsung
                return sum + n(pengeluaran.gaji);
            }

            // field normal (atk, sewa, dll) with null check
            return sum + n(pengeluaran[field]);
        }, 0);
    };

    const downloadExcelPengeluaran = (laporanPengeluaranCabang, judul) => {
        // Data pengeluaran with proper null handling
        const data = laporanPengeluaranCabang.data.map((pengeluaran) => {
            // Calculate gaji total for this row
            let gajiTotal = 0;
            if (pengeluaran.gurus && Array.isArray(pengeluaran.gurus) && pengeluaran.gurus.length > 0) {
                gajiTotal = pengeluaran.gurus.reduce((sum, g) => sum + n(g.gaji), 0);
            } else {
                gajiTotal = n(pengeluaran.gaji);
            }

            return {
                Hari: pengeluaran.hari || "",
                Tanggal: pengeluaran.tanggal || "",
                Cabang: pengeluaran.cabang ? pengeluaran.cabang.nama : "N/A",
                "Nama Guru": pengeluaran.user ? pengeluaran.user.name : "N/A",
                Gaji: gajiTotal,
                ATK: n(pengeluaran.atk),
                Sewa: n(pengeluaran.sewa),
                Intensif: n(pengeluaran.intensif),
                Lisensi: n(pengeluaran.lisensi),
                THR: n(pengeluaran.thr),
                "Lain Lain": n(pengeluaran.lainlain),
                Total: n(pengeluaran.totalpengeluaran),
            };
        });

        // Calculate totals using the same function
        const totals = {
            Hari: "Total",
            Tanggal: "",
            Cabang: "",
            "Nama Guru": "",
            Gaji: calculateTotal('gaji'),
            ATK: calculateTotal('atk'),
            Sewa: calculateTotal('sewa'),
            Intensif: calculateTotal('intensif'),
            Lisensi: calculateTotal('lisensi'),
            THR: calculateTotal('thr'),
            "Lain Lain": calculateTotal('lainlain'),
            Total: calculateTotal('totalpengeluaran'),
        };

        // Add totals row
        data.push(totals);

        // Create worksheet and workbook
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Pengeluaran");

        // Generate filename
        const fileName = `Rekap_Pengeluaran_cabang_${judul}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    // Fungsi untuk mengelola checkbox individual
    const handleItemSelect = (id) => {
        setSelectedItems(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Fungsi untuk select all checkbox
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(laporanPengeluaranCabang.data.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    // Fungsi untuk bulk delete
    const handleBulkDelete = () => {
        if (selectedItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih Data',
                text: 'Pilih item yang ingin dihapus terlebih dahulu',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: `Yakin ingin menghapus ${selectedItems.length} item yang dipilih?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const itemCount = selectedItems.length;
                Inertia.post('/admin/laporan/pengeluaran/bulk-delete', {
                    ids: selectedItems
                }, {
                    preserveScroll: true,
                    onStart: () => {
                        setSelectedItems([]);
                        setSelectAll(false);
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: `${itemCount} item berhasil dihapus`,
                            confirmButtonColor: '#3085d6',
                            timer: 2000,
                            timerProgressBar: true
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal!',
                            text: 'Terjadi kesalahan saat menghapus data',
                            confirmButtonColor: '#3085d6'
                        });
                    }
                });
            }
        });
    };

    // Update selectAll status berdasarkan selectedItems
    React.useEffect(() => {
        if (laporanPengeluaranCabang.data.length > 0) {
            setSelectAll(selectedItems.length === laporanPengeluaranCabang.data.length);
        }
    }, [selectedItems, laporanPengeluaranCabang.data]);


    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Rekap Pengeluaran Cabang - {bulan} {tahun}
                </h4>
                <div className="flex gap-2">
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
                    {selectedItems.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Hapus Terpilih ({selectedItems.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
                            {/* Checkbox select all */}
                            <th className="py-4 px-4 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    className="checkbox checkbox-sm"
                                />
                            </th>
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
                                {/* Checkbox untuk item individual */}
                                <td className="py-4 px-4 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(pengeluaran.id)}
                                        onChange={() => handleItemSelect(pengeluaran.id)}
                                        className="checkbox checkbox-sm"
                                    />
                                </td>
                                {/* Data Rows */}
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.cabang ? pengeluaran.cabang.nama : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.user ? pengeluaran.user.name : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {pengeluaran.gurus && Array.isArray(pengeluaran.gurus) && pengeluaran.gurus.length > 0
                                        ? pengeluaran.gurus.map((guru) => (
                                            <div key={guru.id}>
                                                {guru.guru_nama} - Rp {n(guru.gaji).toLocaleString()}
                                            </div>
                                        ))
                                        : "N/A"}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.atk)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.sewa)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.intensif)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.lisensi)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.thr)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.lainlain)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.totalpengeluaran)}</td>
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
                                                Swal.fire({
                                                    title: 'Konfirmasi Hapus',
                                                    text: 'Yakin hapus item ini?',
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#d33',
                                                    cancelButtonColor: '#3085d6',
                                                    confirmButtonText: 'Ya, Hapus!',
                                                    cancelButtonText: 'Batal'
                                                }).then((result) => {
                                                    if (!result.isConfirmed) {
                                                        e.preventDefault();
                                                    }
                                                });
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
                            <td className="py-4 px-4"></td> {/* Empty cell for checkbox column */}
                            <td colSpan="4" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('gaji'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('atk'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('sewa'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('intensif'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('lisensi'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('thr'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('lainlain'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('totalpengeluaran'))}</td>
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