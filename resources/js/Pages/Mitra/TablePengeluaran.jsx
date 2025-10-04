import React from "react";
import { Link } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import * as XLSX from "xlsx";

const TablePengeluaran = () => {
    const {
        laporanPengeluaranMitra,
        startOfWeek,
        endOfWeek,
        nextWeekOffset,
        prevWeekOffset,
    } = usePage().props;

    const goToWeek = (weekOffset) => {
        Inertia.get(route("Mitra.index"), { weekOffset });
    };

    // Function to calculate totals for the columns
    const calculateTotal = (field) => {
        return laporanPengeluaranMitra.data.reduce((sum, pengeluaran) => sum + (Number(pengeluaran[field]) || 0), 0);
    };

    // Function to calculate total gaji from mitras
    const calculateTotalGaji = () => {
        return laporanPengeluaranMitra.data.reduce((sum, pengeluaran) => {
            const mitras = pengeluaran.mitras || [];
            const totalGaji = mitras.reduce((gajiSum, mitra) => gajiSum + (Number(mitra.gaji) || 0), 0);
            return sum + totalGaji;
        }, 0);
    };

    // Function to get total gaji from mitras for a single report
    const getTotalGajiMitra = (pengeluaran) => {
        if (!pengeluaran.mitras || pengeluaran.mitras.length === 0) return 0;
        return pengeluaran.mitras.reduce((sum, mitra) => sum + (Number(mitra.gaji) || 0), 0);
    };

    // Function to get names of all mitras for a single report
    const getMitraNames = (pengeluaran) => {
        if (!pengeluaran.mitras || pengeluaran.mitras.length === 0) return "N/A";
        return pengeluaran.mitras.map(mitra => mitra.mitra_nama).join(", ");
    };

    const downloadExcelPengeluaran = () => {
        const data = laporanPengeluaranMitra.data.map((pengeluaran) => ({
            Hari: pengeluaran.hari,
            Tanggal: pengeluaran.tanggal,
            Pembuat: pengeluaran.user ? pengeluaran.user.name : "N/A",
            "Nama Mitra": getMitraNames(pengeluaran),
            Gaji: getTotalGajiMitra(pengeluaran),
            ATK: Number(pengeluaran.atk) || 0,
            Intensif: Number(pengeluaran.intensif) || 0,
            Lisensi: Number(pengeluaran.lisensi) || 0,
            "Lain Lain": Number(pengeluaran.lainlain) || 0,
            Total: Number(pengeluaran.totalpengeluaran) || 0,
        }));

        // Hitung total untuk setiap kolom numerik
        const totals = {
            Hari: "Total",
            Tanggal: "",
            Pembuat: "",
            "Nama Mitra": "",
            Gaji: data.reduce((sum, row) => sum + Number(row.Gaji), 0),
            ATK: data.reduce((sum, row) => sum + Number(row.ATK), 0),
            Intensif: data.reduce((sum, row) => sum + Number(row.Intensif), 0),
            Lisensi: data.reduce((sum, row) => sum + Number(row.Lisensi), 0),
            "Lain Lain": data.reduce((sum, row) => sum + Number(row["Lain Lain"]), 0),
            Total: data.reduce((sum, row) => sum + Number(row.Total), 0),
        };

        // Tambahkan total sebagai baris terakhir
        data.push(totals);

        // Urutan kolom yang diinginkan
        const headers = [
            "Hari",
            "Tanggal",
            "Pembuat",
            "Nama Mitra",
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pengeluaran Mitra");

        // Tentukan nama file
        const fileName = `Laporan_Pengeluaran_Mitra_${startOfWeek}_to_${endOfWeek}.xlsx`;

        // Simpan file
        XLSX.writeFile(workbook, fileName);
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Laporan Pengeluaran Mitra
                </h4>
                <div>
                    <Link href="/admin/laporan/pengeluaranmitra/create">
                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                            Tambah Pengeluaran
                        </button>
                    </Link>
                    <button
                        onClick={() => downloadExcelPengeluaran()}
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
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Hari</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Nama Mitra</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Gaji</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">ATK</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Intensif</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lisensi</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Lain Lain</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Total</th>
                            <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laporanPengeluaranMitra.data.map((pengeluaran, key) => (
                            <tr key={key} className="border-b border-stroke dark:border-strokedark">
                                <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.user ? pengeluaran.user.name : "N/A"}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {pengeluaran.mitras && pengeluaran.mitras.length > 0
                                        ? pengeluaran.mitras.map((mitra) => (
                                            <div key={mitra.id}>
                                                {mitra.mitra_nama} - Rp {Number(mitra.gaji).toLocaleString()}
                                            </div>
                                        ))
                                        : "N/A"}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(pengeluaran.atk).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(pengeluaran.intensif).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(pengeluaran.lisensi).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(pengeluaran.lainlain).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(pengeluaran.totalpengeluaran).toLocaleString()}</td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center gap-3">
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
                            <td colSpan="3" className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Total</td>
                            <td className="py-4 px-4 text-sm text-black dark:text-white">{calculateTotalGaji().toLocaleString()}</td>
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
    );
};

export default TablePengeluaran;