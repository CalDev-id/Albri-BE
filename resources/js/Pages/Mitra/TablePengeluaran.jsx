import React from "react";
import { Link } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

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

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Laporan Pengeluaran Mitra
                </h4>
                <Link href="/admin/laporan/pengeluaranmitra/create">
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                        Tambah Pengeluaran
                    </button>
                </Link>
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
                        {laporanPengeluaranMitra.data.map((pengeluaran, key) => {
                            // Get mitras data - could be array or single item
                            const mitras = pengeluaran.mitras || [];
                            const mitrasDisplay = mitras.length > 0
                                ? mitras.map(mitra => mitra.mitra_nama).join(', ')
                                : (pengeluaran.user ? pengeluaran.user.name : "N/A");

                            // Calculate total gaji for this row
                            const totalGajiRow = mitras.length > 0
                                ? mitras.reduce((sum, mitra) => sum + (Number(mitra.gaji) || 0), 0)
                                : 0;

                            return (
                                <tr key={key} className="border-b border-stroke dark:border-strokedark">
                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">{pengeluaran.hari}</td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">{pengeluaran.tanggal}</td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">{mitrasDisplay}</td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">{Number(totalGajiRow).toLocaleString()}</td>
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
                            );
                        })}
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