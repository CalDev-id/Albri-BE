import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaSearch, FaFileExcel, FaFilePdf, FaCalendarWeek, FaArrowLeft } from "react-icons/fa";

const GajiGuruWeeklyReport = ({ gajiGuru, filters, week_start, week_end }) => {
    const [search, setSearch] = useState(filters.search || "");
    const [weekStart, setWeekStart] = useState(week_start || "");
    const [weekEnd, setWeekEnd] = useState(week_end || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/gaji/guru/weekly", { search, week_start: weekStart, week_end: weekEnd }, { preserveState: true });
    };

    const handleWeekChange = () => {
        router.get("/gaji/guru/weekly", { search, week_start: weekStart, week_end: weekEnd }, { preserveState: true });
    };

    const handleExportExcel = () => {
        window.location.href = `/gaji/guru/export-excel?search=${search}&week_start=${weekStart}&week_end=${weekEnd}`;
    };

    const handleExportPdf = () => {
        window.location.href = `/gaji/guru/export-pdf?search=${search}&week_start=${weekStart}&week_end=${weekEnd}`;
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

    const getCurrentWeekDates = () => {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7)); // Sunday
        
        return {
            start: startOfWeek.toISOString().split('T')[0],
            end: endOfWeek.toISOString().split('T')[0]
        };
    };

    const setCurrentWeek = () => {
        const currentWeek = getCurrentWeekDates();
        setWeekStart(currentWeek.start);
        setWeekEnd(currentWeek.end);
        router.get("/gaji/guru/weekly", { search, week_start: currentWeek.start, week_end: currentWeek.end }, { preserveState: true });
    };

    return (
        <DefaultLayout>
            <Head title="Laporan Penggajian Guru - Per Minggu" />
            
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
                                Laporan Penggajian Guru - Per Minggu
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
                        {/* Week Selection */}
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                <label className="text-sm font-medium text-black dark:text-white whitespace-nowrap">
                                    Pilih Minggu:
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="date"
                                        value={weekStart}
                                        onChange={(e) => setWeekStart(e.target.value)}
                                        className="rounded border border-stroke py-1.5 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                    />
                                    <span className="text-sm text-black dark:text-white">sampai</span>
                                    <input
                                        type="date"
                                        value={weekEnd}
                                        onChange={(e) => setWeekEnd(e.target.value)}
                                        className="rounded border border-stroke py-1.5 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                    />
                                    <button
                                        onClick={handleWeekChange}
                                        className="inline-flex items-center gap-1 rounded bg-primary py-1.5 px-3 text-white hover:bg-opacity-90 transition duration-300"
                                    >
                                        <FaCalendarWeek className="text-sm" />
                                        Terapkan
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={setCurrentWeek}
                                className="inline-flex items-center gap-2 rounded bg-secondary py-1.5 px-3 text-white hover:bg-opacity-90 transition duration-300 text-sm"
                            >
                                Minggu Ini
                            </button>
                        </div>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari tanggal, hari, atau nama guru..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded border border-stroke py-2 pl-10 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                />
                                <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body dark:text-bodydark" />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded bg-primary py-2 px-4 text-white hover:bg-opacity-90 transition duration-300"
                            >
                                Cari
                            </button>
                        </form>
                    </div>

                    {/* Week Info */}
                    {weekStart && weekEnd && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-meta-4 rounded">
                            <p className="text-sm text-black dark:text-white">
                                <span className="font-medium">Periode:</span> {formatDate(weekStart)} - {formatDate(weekEnd)}
                            </p>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="p-6.5">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[120px]">
                                        Tanggal
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[80px]">
                                        Hari
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Gina
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Amel
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Lia
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Siti
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Nurul
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Hikma
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Safa
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Khoir
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Sarah
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Indri
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Aminah
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[100px]">
                                        Rina
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[120px]">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {gajiGuru.data && gajiGuru.data.length > 0 ? (
                                    gajiGuru.data.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <div className="font-medium text-black dark:text-white">
                                                    {formatDate(item.tanggal)}
                                                </div>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                                    {item.hari}
                                                </span>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.gina)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.amel)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.lia)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.siti)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.nurul)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.hikma)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.safa)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.khoir)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.sarah)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.indri)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.aminah)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white text-right">
                                                    {formatCurrency(item.rina)}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white font-semibold text-right">
                                                    {formatCurrency(item.total)}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="15" className="border-b border-[#eee] py-10 text-center dark:border-strokedark">
                                            <p className="text-black dark:text-white">Tidak ada data untuk minggu yang dipilih</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {gajiGuru.links && (
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-black dark:text-white">
                                Menampilkan {gajiGuru.from || 0} sampai {gajiGuru.to || 0} dari {gajiGuru.total || 0} data
                            </p>
                            <div className="flex gap-2">
                                {gajiGuru.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-3 py-1 text-sm rounded ${
                                            link.active
                                                ? "bg-primary text-white"
                                                : "bg-gray-2 text-black dark:bg-meta-4 dark:text-white hover:bg-gray-3"
                                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default GajiGuruWeeklyReport;