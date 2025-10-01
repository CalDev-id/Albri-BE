import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaFileExcel, FaFilePdf, FaCalendarAlt, FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";

const GajiGuruMonthlyReport = ({ monthlySummary, year, filters }) => {
    const [selectedYear, setSelectedYear] = useState(year || 2025);
    const [expandedMonths, setExpandedMonths] = useState({});

    const handleYearChange = () => {
        router.get("/gaji/guru/monthly", { year: selectedYear }, { preserveState: true });
    };

    const handleExportExcel = () => {
        window.location.href = `/gaji/guru/monthly/export/excel?year=${selectedYear}`;
    };

    const handleExportPdf = () => {
        window.location.href = `/gaji/guru/monthly/export/pdf?year=${selectedYear}`;
    };

    const handlePrint = () => {
        window.print();
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

    const toggleMonth = (month) => {
        setExpandedMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }));
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 5; i <= currentYear + 1; i++) {
            years.push(i);
        }
        return years;
    };

    return (
        <DefaultLayout>
            <Head title="Laporan Penggajian Guru - Per Bulan" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {/* Header */}
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/gaji/guru"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                            >
                                <FaArrowLeft className="text-sm" />
                                <span>Kembali</span>
                            </Link>
                            <h3 className="font-semibold text-black dark:text-white text-xl">
                                Laporan Penggajian Guru - Per Bulan ({selectedYear})
                            </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Export Buttons */}
                            <button
                                onClick={handleExportExcel}
                                className="inline-flex items-center gap-2 rounded bg-success py-2 px-4 text-white hover:bg-opacity-90 transition duration-300"
                            >
                                <FaFileExcel className="text-lg" />
                                Download Excel
                            </button>
                            <button
                                onClick={handleExportPdf}
                                className="inline-flex items-center gap-2 rounded bg-danger py-2 px-4 text-white hover:bg-opacity-90 transition duration-300"
                            >
                                <FaFilePdf className="text-lg" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Year Selection */}
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                <label className="text-sm font-medium text-black dark:text-white whitespace-nowrap">
                                    Pilih Tahun:
                                </label>
                                <div className="flex gap-2 items-center">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="rounded border border-stroke py-1.5 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                    >
                                        {generateYearOptions().map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleYearChange}
                                        className="inline-flex items-center gap-1 rounded bg-primary py-1.5 px-3 text-white hover:bg-opacity-90 transition duration-300"
                                    >
                                        <FaCalendarAlt className="text-sm" />
                                        Terapkan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Summary */}
                <div className="p-6.5">
                    <div className="space-y-6">
                        {Object.values(monthlySummary).map((monthData) => {
                            // Ambil nama guru dinamis dari backend
                            const guruNames = Object.keys(monthData.totals).filter((n) => n !== 'total');
                            return (
                                <div key={monthData.month} className="border border-stroke rounded-lg dark:border-strokedark">
                                    {/* Month Header */}
                                    <div 
                                        className="bg-gray-2 dark:bg-meta-4 p-4 cursor-pointer"
                                        onClick={() => toggleMonth(monthData.month)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-black dark:text-white text-lg">
                                                {monthData.month_name} {selectedYear}
                                            </h4>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-black dark:text-white">
                                                    Total: <span className="font-semibold">{formatCurrency(monthData.totals.total)}</span>
                                                </span>
                                                <span className="text-sm text-black dark:text-white">
                                                    ({monthData.data.length} hari)
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.location.href = `/gaji/guru/monthly/export/excel?year=${selectedYear}&month=${monthData.month}`;
                                                    }}
                                                    className="inline-flex items-center gap-2 rounded bg-success py-1 px-3 text-white hover:bg-opacity-90 transition duration-300 text-xs"
                                                >
                                                    <FaFileExcel className="text-base" />
                                                    Excel Bulan Ini
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.location.href = `/gaji/guru/monthly/export/pdf?year=${selectedYear}&month=${monthData.month}`;
                                                    }}
                                                    className="inline-flex items-center gap-2 rounded bg-danger py-1 px-3 text-white hover:bg-opacity-90 transition duration-300 text-xs"
                                                >
                                                    <FaFilePdf className="text-base" />
                                                    PDF Bulan Ini
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(`/gaji/guru/monthly/print/pdf?year=${selectedYear}&month=${monthData.month}`, '_blank');
                                                    }}
                                                    className="inline-flex items-center gap-2 rounded bg-warning py-1 px-3 text-white hover:bg-opacity-90 transition duration-300 text-xs"
                                                >
                                                    <FaPrint className="text-base" />
                                                    Print PDF
                                                </button>
                                                {expandedMonths[monthData.month] ? (
                                                    <FaChevronUp className="text-primary" />
                                                ) : (
                                                    <FaChevronDown className="text-primary" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Month Detail */}
                                    {expandedMonths[monthData.month] && (
                                        <div className="p-4">
                                            {monthData.data.length > 0 ? (
                                                <>
                                                    {/* Detail Table */}
                                                    <div className="overflow-x-auto mb-4">
                                                        <table className="w-full table-auto text-sm">
                                                            <thead>
                                                                <tr className="bg-gray-50 text-left dark:bg-meta-4">
                                                                    <th className="py-2 px-2 font-medium text-black dark:text-white">Hari</th>
                                                                    <th className="py-2 px-2 font-medium text-black dark:text-white">Tanggal</th>
                                                                    {guruNames.map((name) => (
                                                                        <th key={name} className="py-2 px-2 font-medium text-black dark:text-white">{name}</th>
                                                                    ))}
                                                                    <th className="py-2 px-2 font-medium text-black dark:text-white">Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {monthData.data.map((item, index) => (
                                                                    <tr key={index} className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4">
                                                                        <td className="py-2 px-2 text-black dark:text-white">{item.hari}</td>
                                                                        <td className="py-2 px-2 text-black dark:text-white">{item.tanggal && !isNaN(new Date(item.tanggal)) ? formatDate(item.tanggal) : '-'}</td>
                                                                        {guruNames.map((name) => (
                                                                            <td key={name} className="py-2 px-2 text-black dark:text-white text-right">{formatCurrency(monthData.totals[name])}</td>
                                                                        ))}
                                                                        <td className="py-2 px-2 text-black dark:text-white text-right font-semibold">{formatCurrency(item.total)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* Monthly Summary */}
                                                    <div className="bg-primary/5 p-4 rounded border border-primary/20">
                                                        <h5 className="font-semibold text-black dark:text-white mb-3">
                                                            Ringkasan {monthData.month_name} {selectedYear}
                                                        </h5>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
                                                            {guruNames.map((name) => (
                                                                <div key={name} className="bg-white dark:bg-meta-4 p-2 rounded">
                                                                    <div className="text-black dark:text-white font-medium">{name}</div>
                                                                    <div className="text-primary font-semibold">{formatCurrency(monthData.totals[name])}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-3 pt-3 border-t border-primary/20">
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-semibold text-black dark:text-white">Total Bulan:</span>
                                                                <span className="font-bold text-primary text-lg">{formatCurrency(monthData.totals.total)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-black dark:text-white">Tidak ada data untuk bulan {monthData.month_name}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default GajiGuruMonthlyReport;