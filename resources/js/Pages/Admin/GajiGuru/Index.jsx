import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaSearch, FaFileExcel, FaFilePdf, FaPlus, FaEdit, FaTrash, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";

const GajiGuruIndex = ({ dates, gurus, data, filters }) => {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/gaji/guru", { search }, { preserveState: true });
    };

    const handleExportExcel = () => {
        window.location.href = `/gaji/guru/export-excel?search=${search}`;
    };

    const handleExportPdf = () => {
        window.location.href = `/gaji/guru/export-pdf?search=${search}`;
    };

    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return "-";
        return new Intl.NumberFormat("id-ID").format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <DefaultLayout>
            <Head title="Laporan Penggajian Guru" />
            
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {/* Header */}
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h3 className="font-semibold text-black dark:text-white text-xl">
                            Laporan Penggajian Guru
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Report Buttons */}
                            <Link
                                href="/gaji/guru/weekly"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <FaCalendarWeek size={16} />
                                Laporan Mingguan
                            </Link>
                            
                            <Link
                                href="/gaji/guru/monthly"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <FaCalendarAlt size={16} />
                                Laporan Bulanan
                            </Link>
                            
                            {/* Export Buttons */}
                            <button
                                onClick={handleExportExcel}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <FaFileExcel size={16} />
                                Download Excel
                            </button>
                            <button
                                onClick={handleExportPdf}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <FaFilePdf size={16} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="p-6.5 border-b border-stroke dark:border-strokedark">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan tanggal, hari, atau nama guru..."
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium flex items-center gap-2 transition-all"
                        >
                            <FaSearch size={14} />
                            Cari
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="p-6.5">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Tanggal
                                    </th>
                                    {gurus && gurus.map((guru) => (
                                        <th key={guru.id} className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                            {guru.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dates && dates.length > 0 ? (
                                    dates.map((date, index) => (
                                        <tr key={index} className="hover:bg-gray-1 dark:hover:bg-meta-4">
                                            <td className="border border-stroke py-5 px-4 dark:border-strokedark">
                                                <div className="font-medium text-black dark:text-white">
                                                    {formatDate(date)}
                                                </div>
                                            </td>
                                            {gurus && gurus.map((guru) => (
                                                <td key={guru.id} className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                    <span className="text-black dark:text-white">
                                                        {formatCurrency(data[date] && data[date][guru.id] ? data[date][guru.id] : 0)}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={gurus ? gurus.length + 1 : 1} className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                Tidak ada data gaji guru yang ditemukan
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default GajiGuruIndex;