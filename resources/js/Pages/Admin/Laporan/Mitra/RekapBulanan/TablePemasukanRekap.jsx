import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import "flowbite/dist/flowbite.min.js";
import { usePage } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const TablePemasukanRekap = ({
    laporanMitra,
    bulan,
    tahun,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
    paketMitra,
}) => {

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

    const getTotal = (key) => {
        return (laporanMitra?.data || []).reduce(
            (sum, laporan) => sum + n(laporan[key]),
            0
        );
    };

    // Calculate total for dynamic paket from relationship with proper null checks
    const getPaketTotal = (paketId) => {
        return (laporanMitra?.data || []).reduce(
            (sum, laporan) => {
                if (!laporan || !laporan.pakets || !Array.isArray(laporan.pakets)) return sum;
                const paketData = laporan.pakets.find(p => p && p.id === paketId);
                const jumlah = paketData?.pivot?.jumlah || 0;
                return sum + n(jumlah);
            },
            0
        );
    };

    const downloadExcel = (laporanMitra, judul) => {
        // Safe data handling
        const data = laporanMitra?.data || [];
        const safePaketMitra = paketMitra || [];

        if (data.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Tidak ada data',
                text: 'Tidak ada data untuk di-download',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        // Build headers dynamically with null checks
        const headers = [
            "No",
            "Hari",
            "Tanggal",
            // Dynamic paket columns
            ...safePaketMitra.map(p => p?.nama_paket || 'N/A'),
            "Daftar",
            "Modul",
            "Kaos",
            "Kas",
            "Lain-lain",
            "Total Pemasukan"
        ];

        const processedData = data.map((item, index) => {
            const row = {
                No: index + 1,
                Hari: item.hari || "",
                Tanggal: item.tanggal || "",
            };

            // Add dynamic paket columns with null checks
            safePaketMitra.forEach(p => {
                if (p && p.nama_paket) {
                    const paketData = item.pakets?.find(pk => pk && pk.id === p.id);
                    row[p.nama_paket] = n(paketData?.pivot?.jumlah);
                }
            });

            // Add static columns
            row["Daftar"] = n(item.daftar);
            row["Modul"] = n(item.modul);
            row["Kaos"] = n(item.kaos);
            row["Kas"] = n(item.kas);
            row["Lain-lain"] = n(item.lainlain);
            row["Total Pemasukan"] = n(item.totalpemasukan);

            return row;
        });

        // Add totals row
        const totals = {
            No: "",
            Hari: "Total",
            Tanggal: "",
        };

        safePaketMitra.forEach(p => {
            if (p && p.nama_paket) {
                totals[p.nama_paket] = getPaketTotal(p.id);
            }
        });

        totals["Daftar"] = getTotal("daftar");
        totals["Modul"] = getTotal("modul");
        totals["Kaos"] = getTotal("kaos");
        totals["Kas"] = getTotal("kas");
        totals["Lain-lain"] = getTotal("lainlain");
        totals["Total Pemasukan"] = getTotal("totalpemasukan");

        processedData.push(totals);

        const ws = XLSX.utils.json_to_sheet(processedData, { header: headers });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Laporan");

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
            setSelectedItems(laporanMitra.data.map(item => item.id));
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
                Inertia.post('/admin/laporan/mitra/bulk-delete', {
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
        const dataLength = laporanMitra?.data?.length || 0;
        setSelectAll(selectedItems.length === dataLength && dataLength > 0);
    }, [selectedItems, laporanMitra?.data]);

    return (
        <div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Rekap Pemasukan Mitra - {bulan}/{tahun}
                    </h4>

                    <div>
                        {/* <Link href="/admin/laporan/mitra/create">
                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                            Tambah Laporan
                        </button>
                    </Link> */}
                        <button
                            // onClick={downloadExcel}
                            onClick={() => downloadExcel(laporanMitra, `${bulan} / ${tahun}`)}
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
                                {/* Header cells */}
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Hari
                                </th>


                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Tanggal
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Nama</th>


                                {/* Dynamic paket headers */}
                                {paketMitra && Array.isArray(paketMitra) && paketMitra.length > 0 && paketMitra.map((paket, index) => (
                                    <th key={index} className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                        {paket?.nama_paket || 'N/A'} ({paket?.harga ? n(paket.harga).toLocaleString() : '0'})
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
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(laporanMitra?.data || []).map((laporan, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-stroke dark:border-strokedark"
                                >
                                    {/* Checkbox column */}
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(laporan.id)}
                                            onChange={() => handleItemSelect(laporan.id)}
                                            className="rounded border-gray-300"
                                        />
                                    </td>
                                    {/* Table rows with data */}
                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                                        {laporan.hari}
                                    </td>

                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {laporan.tanggal}
                                    </td>

                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{laporan.user ? laporan.user.name : "N/A"}</td>


                                    {/* Dynamic paket data */}
                                    {paketMitra && Array.isArray(paketMitra) && paketMitra.length > 0 && paketMitra.map((paket, index) => {
                                        // Find paket data from relationship with pivot table
                                        if (!paket || !paket.id) return <td key={index} className="py-4 px-4 text-sm text-black dark:text-white">0</td>;

                                        const paketData = laporan.pakets?.find(p => p && p.id === paket.id);
                                        const jumlah = paketData?.pivot?.jumlah || 0;
                                        return (
                                            <td key={index} className="py-4 px-4 text-sm text-black dark:text-white">
                                                {n(jumlah).toLocaleString()}
                                            </td>
                                        );
                                    })}

                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.totalbiaya)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.daftar)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.modul)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.kaos)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.kas)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.lainlain)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {fmt(laporan.totalpemasukan)}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {/* Action buttons */}
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
                                <td className="py-4 px-4"></td>
                                <td colSpan="3" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Total
                                </td>

                                {/* Dynamic paket totals with null checks */}
                                {paketMitra && Array.isArray(paketMitra) && paketMitra.length > 0 && paketMitra.map((paket, index) => {
                                    return (
                                        <td key={index} className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                            {paket && paket.id ? fmt(getPaketTotal(paket.id)) : '0'}
                                        </td>
                                    );
                                })}

                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("totalbiaya"))}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("daftar"))}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("modul"))}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("kaos"))}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("kas"))}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("lainlain"))}
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                                    {fmt(getTotal("totalpemasukan"))}
                                </td>
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

export default TablePemasukanRekap;
