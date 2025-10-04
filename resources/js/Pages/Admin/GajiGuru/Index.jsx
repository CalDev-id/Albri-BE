import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaSearch, FaFileExcel, FaFilePdf, FaPlus, FaEdit, FaTrash, FaCalendarWeek, FaCalendarAlt, FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GajiGuruIndex = ({ gurus, monthlyData, teacherTotals, currentMonth, currentYear, monthName, prevMonth, nextMonth, availableMonths, filters }) => {
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
        router.get("/gaji/guru", { search, month: currentMonth, year: currentYear }, { preserveState: true });
    };

    const handlePreviousMonth = () => {
        if (prevMonth) {
            router.get('/gaji/guru', { month: prevMonth.month, year: prevMonth.year });
        }
    };

    const handleNextMonth = () => {
        if (nextMonth) {
            router.get('/gaji/guru', { month: nextMonth.month, year: nextMonth.year });
        }
    };

    const handleExportExcel = () => {
        window.location.href = `/gaji/guru/export-excel?month=${currentMonth}&year=${currentYear}`;
    };

    const handleExportPdf = () => {
        window.location.href = `/gaji/guru/export-pdf?month=${currentMonth}&year=${currentYear}`;
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

    const renderGajiCell = (day, guru) => {
        const gajiData = day.teachers[guru.id] || { details: [], total: 0 };
        const key = `${day.full_date}-${guru.id}`;
        const isDetailsShown = showDetails[key];

        if (gajiData.total === 0) {
            return (
                <span className="text-gray-400 dark:text-gray-500">
                    -
                </span>
            );
        }

        return (
            <div className="space-y-1 border">
                <div className="flex items-center justify-between">
                    <span className="text-center font-medium text-black dark:text-white">
                        {formatCurrency(gajiData.total)}
                    </span>
                    {gajiData.details && gajiData.details.length > 0 && (
                        <button
                            onClick={() => toggleDetails(day.full_date, guru.id)}
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
                                    {detail.nama} <span className="text-gray-400">({detail.source})</span>
                                </span>
                                <span className="font-medium text-center text-black dark:text-white">
                                    {formatCurrency(detail.gaji)}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-1 mt-1">
                            <div className="flex justify-between items-center font-medium">
                                <span className="text-gray-800 dark:text-gray-200">Total:</span>
                                <span className="text-center text-black dark:text-white">
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
                        <div>
                            <h3 className="font-semibold text-black dark:text-white text-xl">
                                Laporan Penggajian Guru
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {monthName}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Month Navigation */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePreviousMonth}
                                    disabled={!prevMonth}
                                    className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${prevMonth
                                        ? 'bg-gray-500 hover:bg-gray-600 text-white cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <FaChevronLeft size={14} />
                                    Bulan Sebelumnya
                                </button>
                                <button
                                    onClick={handleNextMonth}
                                    disabled={!nextMonth}
                                    className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${nextMonth
                                        ? 'bg-gray-500 hover:bg-gray-600 text-white cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Bulan Berikutnya
                                    <FaChevronRight size={14} />
                                </button>
                            </div>

                            {/* Report Button */}
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
                                Excel
                            </button>
                            <button
                                onClick={handleExportPdf}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <FaFilePdf size={16} />
                                PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="p-6.5">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">Tanggal</th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">Hari</th>
                                    {gurus && gurus.map((guru) => (
                                        <th key={guru.id} className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white text-center">
                                            {guru.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyData && monthlyData.length > 0 ? (
                                    <>
                                        {monthlyData.map((day, index) => (
                                            <tr key={index} className="hover:bg-gray-1 dark:hover:bg-meta-4">
                                                <td className="border border-stroke py-5 px-4 dark:border-strokedark">
                                                    <div className="font-medium text-black dark:text-white">
                                                        {day.date}
                                                    </div>
                                                </td>
                                                <td className="border border-stroke py-5 px-4 dark:border-strokedark">
                                                    <div className="text-black dark:text-white">
                                                        {day.day}
                                                    </div>
                                                </td>
                                                {gurus && gurus.map((guru) => (
                                                    <td key={guru.id} className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                        {renderGajiCell(day, guru)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* Total Row */}
                                        <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                                            <td colSpan="2" className="border border-stroke py-5 px-4 dark:border-strokedark text-black dark:text-white text-lg">
                                                TOTAL
                                            </td>
                                            {gurus && gurus.map((guru) => (
                                                <td key={guru.id} className="border border-stroke py-5 px-4 text-center dark:border-strokedark text-primary dark:text-blue-400 text-lg">
                                                    {formatCurrency(teacherTotals[guru.id] || 0)}
                                                </td>
                                            ))}
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={gurus ? gurus.length + 2 : 3} className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                Tidak ada data gaji guru untuk bulan ini
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