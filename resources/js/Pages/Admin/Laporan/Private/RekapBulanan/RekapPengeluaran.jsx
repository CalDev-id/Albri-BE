import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';

const RekapPengeluaran = () => {
    const {
        laporanPengeluaranPrivate,
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

    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.private"), {
            bulan: month,
            tahun: year,
        });
    };


    // Function to calculate totals for the columns
    const calculateTotal = (field) => {
        return (laporanPengeluaranPrivate?.data || []).reduce((sum, pengeluaran) => sum + (pengeluaran[field] || 0), 0);
    };

    const downloadExcelPengeluaran = (laporanPengeluaranPrivate, judul) => {
        const data = (laporanPengeluaranPrivate?.data || []).map((pengeluaran) => ({
            Hari: pengeluaran.hari,
            Tanggal: pengeluaran.tanggal,
            "Nama Guru": pengeluaran.user ? pengeluaran.user.name : "N/A",
            Gaji: pengeluaran.gaji || 0,
            ATK: pengeluaran.atk || 0,
            Intensif: pengeluaran.intensif || 0,
            Lisensi: pengeluaran.lisensi || 0,
            "Lain Lain": pengeluaran.lainlain || 0,
            Total: pengeluaran.totalpengeluaran || 0,
        }));

        // Hitung total untuk setiap kolom numerik
        const totals = {
            Hari: "Total",
            Tanggal: "",
            "Nama Guru": "",
            Gaji: data.reduce((sum, row) => sum + row.Gaji, 0),
            ATK: data.reduce((sum, row) => sum + row.ATK, 0),
            Intensif: data.reduce((sum, row) => sum + row.Intensif, 0),
            Lisensi: data.reduce((sum, row) => sum + row.Lisensi, 0),
            "Lain Lain": data.reduce((sum, row) => sum + row["Lain Lain"], 0),
            Total: data.reduce((sum, row) => sum + row.Total, 0),
        };

        // Tambahkan total sebagai baris terakhir
        data.push(totals);

        // Urutan kolom yang diinginkan
        const headers = [
            "Hari",
            "Tanggal",
            "Nama Guru",
            "Gaji",
            "ATK",
            "Intensif",
            "Lisensi",
            "Lain Lain",
            "Total",
        ];

        // Membuat worksheet dengan header khusus
        const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

        // Menambahkan header secara eksplisit (jika perlu)
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

        // Membuat workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap");

        // Tentukan nama file
        const fileName = `Rekap_Pengeluaran_Private_${judul}.xlsx`;

        // Simpan file
        XLSX.writeFile(workbook, fileName);
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
            setSelectedItems(laporanPengeluaranPrivate.data.map(item => item.id));
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
                Inertia.post('/admin/laporan/pengeluaranprivate/bulk-delete', {
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
        setSelectAll(selectedItems.length === laporanPengeluaranPrivate.data.length && laporanPengeluaranPrivate.data.length > 0);
    }, [selectedItems, laporanPengeluaranPrivate.data]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Rekap Pengeluaran Private - {bulan} {tahun}
                </h4>
                <div>
                    {/* <Link href="/admin/laporan/pengeluaranprivate/create">
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                        Tambah Pengeluaran
                    </button>
                </Link> */}
                    <button
                        onClick={() => downloadExcelPengeluaran(laporanPengeluaranPrivate, `${bulan} sampai ${tahun}`)}
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
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Nama Guru</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Gaji</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">ATK</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Intensif</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lisensi</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lain Lain</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Total</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(laporanPengeluaranPrivate?.data || []).map((pengeluaran, key) => (
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
                                {/* Data Rows */}
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari || ""}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal || ""}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.user ? pengeluaran.user.name : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {pengeluaran.gurus && pengeluaran.gurus.length > 0
                                        ? pengeluaran.gurus.map((guru, index) => (
                                            <div key={index}>
                                                {guru.guru_id} - Rp {parseInt(guru.gaji).toLocaleString()}
                                            </div>
                                        ))
                                        : `Rp ${pengeluaran.gaji ? pengeluaran.gaji.toLocaleString() : 0}`}
                                </td>                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.atk || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.intensif || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.lisensi || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.lainlain || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{(pengeluaran.totalpengeluaran || 0).toLocaleString()}</td>
                                <td className="py-4 px-4 text-center">
                                    {/* Actions */}
                                    <div className="flex justify-center gap-3">
                                        <Link href={`/admin/laporan/pengeluaranprivate/${pengeluaran.id}/edit`}>
                                            <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                        </Link>
                                        <Link
                                            href={`/admin/laporan/pengeluaranprivate/${pengeluaran.id}`}
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
                    {/* Footer Row for Totals */}
                    <tfoot>
                        <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                            <td colSpan="4" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('gaji').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('atk').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('intensif').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('lisensi').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('lainlain').toLocaleString()}</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotal('totalpengeluaran').toLocaleString()}</td>
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

export default RekapPengeluaran;