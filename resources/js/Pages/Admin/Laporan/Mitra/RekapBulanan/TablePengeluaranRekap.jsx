import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import "flowbite/dist/flowbite.min.js";
import { usePage } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const TablePengeluaran = () => {
    const {
        laporanPengeluaranMitra,
        bulan,
        tahun,
        nextMonth,
        nextYear,
        prevMonth,
        prevYear,
    } = usePage().props;

    // State untuk mengelola checkbox
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Utility functions similar to working TablePemasukan
    const n = (v) => (typeof v === "number" ? v : (parseInt(v, 10) || 0));
    const fmt = (v) => n(v).toLocaleString();

    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.mitra"), {
            bulan: month,
            tahun: year,
        });
    };

    // Function to calculate totals for the columns with proper null handling
    const calculateTotal = (field) => {
        return (laporanPengeluaranMitra?.data || []).reduce((sum, pengeluaran) => {
            if (field === "gaji") {
                // Handle mitras array with proper null checks
                if (pengeluaran.mitras && Array.isArray(pengeluaran.mitras) && pengeluaran.mitras.length > 0) {
                    return sum + pengeluaran.mitras.reduce((mSum, m) => mSum + n(m.gaji), 0);
                }
                // Fallback to direct gaji field
                return sum + n(pengeluaran.gaji);
            }
            return sum + n(pengeluaran[field]);
        }, 0);
    };

    const downloadExcelPengeluaran = (laporanPengeluaranMitra, judul) => {
        const data = laporanPengeluaranMitra?.data || [];

        if (data.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Tidak ada data',
                text: 'Tidak ada data untuk di-download',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        // Process data with proper null handling
        const processedData = data.map((item, index) => {
            // Calculate gaji total for this row
            let gajiTotal = 0;
            if (item.mitras && Array.isArray(item.mitras) && item.mitras.length > 0) {
                gajiTotal = item.mitras.reduce((sum, m) => sum + n(m.gaji), 0);
            } else {
                gajiTotal = n(item.gaji);
            }

            return {
                No: index + 1,
                Hari: item.hari || "",
                Tanggal: item.tanggal || "",
                Nama: item.user?.name || "N/A",
                Gaji: gajiTotal,
                ATK: n(item.atk),
                Intensif: n(item.intensif),
                Lisensi: n(item.lisensi),
                "Lain-lain": n(item.lainlain),
                "Total Pengeluaran": n(item.totalpengeluaran)
            };
        });

        // Add totals row
        const totals = {
            No: "",
            Hari: "Total",
            Tanggal: "",
            Nama: "",
            Gaji: calculateTotal('gaji'),
            ATK: calculateTotal('atk'),
            Intensif: calculateTotal('intensif'),
            Lisensi: calculateTotal('lisensi'),
            "Lain-lain": calculateTotal('lainlain'),
            "Total Pengeluaran": calculateTotal('totalpengeluaran')
        };

        processedData.push(totals);

        const headers = ["No", "Hari", "Tanggal", "Nama", "Gaji", "ATK", "Intensif", "Lisensi", "Lain-lain", "Total Pengeluaran"];
        const ws = XLSX.utils.json_to_sheet(processedData, { header: headers });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Laporan Pengeluaran");

        XLSX.writeFile(wb, `${judul}.xlsx`);
    };

    // Fungsi untuk mengelola checkbox individual
    const handleItemSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Fungsi untuk select all checkbox
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(laporanPengeluaranMitra.data.map(item => item.id));
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
                Inertia.post('/admin/laporan/pengeluaranmitra/bulk-delete', {
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
        const dataLength = laporanPengeluaranMitra?.data?.length || 0;
        setSelectAll(selectedItems.length === dataLength && dataLength > 0);
    }, [selectedItems, laporanPengeluaranMitra?.data]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Rekap Pengeluaran Mitra - {bulan}/{tahun}
                </h4>
                <div>
                    {/* <Link href="/admin/laporan/pengeluaranmitra/create">
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                        Tambah Pengeluaran
                    </button>
                </Link> */}
                    <button
                        onClick={() => downloadExcelPengeluaran(laporanPengeluaranMitra, `${bulan} sampai ${tahun}`)}
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                    >
                        Download Excel
                    </button>
                    {selectedItems.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
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
                            {/* Checkbox header */}
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    className="rounded border-gray-300"
                                />
                            </th>
                            {/* Table Headers */}
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Hari</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Pembuat</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Gaji</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">ATK</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Intensif</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lisensi</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lain Lain</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Total</th>
                            <th className="py-4 px-4"> Aksi </th>

                        </tr>
                    </thead>
                    <tbody>
                        {(laporanPengeluaranMitra?.data || []).map((pengeluaran, key) => (
                            <tr key={key} className="border-b border-stroke dark:border-strokedark">
                                {/* Checkbox column */}
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(pengeluaran.id)}
                                        onChange={() => handleItemSelect(pengeluaran.id)}
                                        className="rounded border-gray-300"
                                    />
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.user ? pengeluaran.user.name : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {pengeluaran.mitras && Array.isArray(pengeluaran.mitras) && pengeluaran.mitras.length > 0
                                        ? pengeluaran.mitras.map((mitra) => (
                                            <div key={mitra.id}>
                                                {mitra.mitra_nama} - Rp {n(mitra.gaji).toLocaleString()}
                                            </div>
                                        ))
                                        : `Rp ${n(pengeluaran.gaji).toLocaleString()}`}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.atk)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.intensif)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.lisensi)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.lainlain)}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(pengeluaran.totalpengeluaran)}</td>

                                <td className="py-4 px-4">
                                    <div className="flex flex-row items-center justify-center gap-3 h-full">
                                        <Link href={`/admin/laporan/pengeluaranmitra/${pengeluaran.id}/edit`}>
                                            <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                        </Link>
                                        <Link
                                            href={`/admin/laporan/pengeluaranmitra/${pengeluaran.id}`}
                                            method="delete"
                                            as="button"
                                            data={{ id: pengeluaran.id }}
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this item?")) {
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
                            <td colSpan="4" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('gaji'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('atk'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('intensif'))}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{fmt(calculateTotal('lisensi'))}</td>
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
};

export default TablePengeluaran;