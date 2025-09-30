import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaSearch, FaFileExcel, FaFilePdf, FaPlus, FaEdit, FaTrash, FaCalendarWeek, FaCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const GajiGuruIndex = ({ dates, gurus, data, filters }) => {
    const [search, setSearch] = useState(filters.search || "");
    const [showDetails, setShowDetails] = useState({});

    const toggleDetails = (date, guruId) => {
        const key = `${date}-${guruId}`;
        setShowDetails(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

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
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const renderGajiCell = (date, guru) => {
        const gajiData = data[date] && data[date][guru.id] ? data[date][guru.id] : { details: [], total: 0 };
        const key = `${date}-${guru.id}`;
        const isDetailsShown = showDetails[key];
        
        if (gajiData.total === 0) {
            return (
                <span className="text-gray-400 dark:text-gray-500">
                    -
                </span>
            );
        }
        
        return (
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-black dark:text-white">
                        {formatCurrency(gajiData.total)}
                    </span>
                    {gajiData.details && gajiData.details.length > 0 && (
                        <button
                            onClick={() => toggleDetails(date, guru.id)}
                            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {isDetailsShown ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                        </button>
                    )}
                </div>
                
                {isDetailsShown && gajiData.details && gajiData.details.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs space-y-1">
                        {gajiData.details.map((detail, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-300">
                                    {detail.nama}
                                </span>
                                <span className="font-medium text-black dark:text-white">
                                    {formatCurrency(detail.gaji)}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-1 mt-1">
                            <div className="flex justify-between items-center font-medium">
                                <span className="text-gray-800 dark:text-gray-200">Total:</span>
                                <span className="text-black dark:text-white">
                                    {formatCurrency(gajiData.total)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
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
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">Tanggal</th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">Total</th>
                                    {gurus && gurus.map((guru) => (
                                        <th key={guru.id} className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                            {guru.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dates && dates.length > 0 ? (
                                    dates.map((date, index) => {
                                        // Calculate total for this row
                                        const totalRow = gurus.reduce((sum, guru) => {
                                            const gajiData = data[date] && data[date][guru.id] ? data[date][guru.id] : { total: 0 };
                                            return sum + (gajiData.total || 0);
                                        }, 0);
                                        return (
                                            <tr key={index} className="hover:bg-gray-1 dark:hover:bg-meta-4">
                                                <td className="border border-stroke py-5 px-4 dark:border-strokedark">
                                                    <div className="font-medium text-black dark:text-white">
                                                        {formatDate(date)}
                                                    </div>
                                                </td>
                                                <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark font-bold text-primary">
                                                    {formatCurrency(totalRow)}
                                                </td>
                                                {gurus && gurus.map((guru) => (
                                                    <td key={guru.id} className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                        {renderGajiCell(date, guru)}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })
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