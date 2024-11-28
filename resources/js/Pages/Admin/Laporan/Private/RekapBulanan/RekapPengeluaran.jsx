import React from "react";
import { Link } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import * as XLSX from "xlsx";

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

    const goToMonth = (month, year) => {
        Inertia.get(route("admin.rekap.private"), {
            bulan: month,
            tahun: year,
        });
    };
    

    // Function to calculate totals for the columns
    const calculateTotal = (field) => {
        return laporanPengeluaranPrivate.data.reduce((sum, pengeluaran) => sum + (pengeluaran[field] || 0), 0);
    };

    const downloadExcelPengeluaran = (laporanPengeluaranPrivate, judul) => {
        const data = laporanPengeluaranPrivate.data.map((pengeluaran) => ({
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
                        </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
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
                        </tr>
                    </thead>
                    <tbody>
                        {laporanPengeluaranPrivate.data.map((pengeluaran, key) => (
                            <tr key={key} className="border-b border-stroke dark:border-strokedark">
                                {/* Data Rows */}
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.user ? pengeluaran.user.name : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.gaji.toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.atk.toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.intensif.toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.lisensi.toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.lainlain.toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.totalpengeluaran.toLocaleString()}</td>

                            </tr>
                        ))}
                    </tbody>
                    {/* Footer Row for Totals */}
                    <tfoot>
                        <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                            <td colSpan="3" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>
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