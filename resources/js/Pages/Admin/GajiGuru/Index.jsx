import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaSearch, FaFileExcel, FaFilePdf, FaPlus, FaEdit, FaTrash, FaCalendarWeek } from "react-icons/fa";

const GajiGuruIndex = ({ gajiGuru, filters }) => {
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
                            {/* Weekly Report Button */}
                            <Link
                                href="/gaji/guru/weekly"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <FaCalendarWeek size={16} />
                                Laporan Mingguan
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
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Gina
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Amel
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Lia
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Siti
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Nurul
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Hikma
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Safa
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Khoir
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Sarah
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Indri
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Aminah
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Rina
                                    </th>
                                    <th className="border border-stroke py-4 px-4 font-medium text-black dark:border-strokedark dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {gajiGuru.data.length > 0 ? (
                                    gajiGuru.data.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-1 dark:hover:bg-meta-4">
                                            <td className="border border-stroke py-5 px-4 dark:border-strokedark">
                                                <div className="font-medium text-black dark:text-white">
                                                    {item.hari}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(item.tanggal)}
                                                </div>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.gina)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.amel)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.lia)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.siti)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.nurul)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.hikma)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.safa)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.khoir)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.sarah)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.indri)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.aminah)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <span className="text-black dark:text-white">
                                                    {formatCurrency(item.rina)}
                                                </span>
                                            </td>
                                            <td className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                                                        <FaEdit size={12} />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" className="border border-stroke py-5 px-4 text-center dark:border-strokedark">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                Tidak ada data gaji guru yang ditemukan
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {gajiGuru.last_page > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Menampilkan {gajiGuru.from} sampai {gajiGuru.to} dari {gajiGuru.total} data
                            </div>
                            <div className="flex gap-2">
                                {gajiGuru.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-3 py-2 rounded border ${
                                            link.active
                                                ? "bg-primary text-white border-primary"
                                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                        preserveState
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

export default GajiGuruIndex;