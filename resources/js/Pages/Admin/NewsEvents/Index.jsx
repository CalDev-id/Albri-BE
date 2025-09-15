import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";

const NewsEventsIndex = () => {
    const { newsEvents, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    const handleSearch = (e) => {
        e.preventDefault();
        const params = {};
        if (search && search !== '') {
            params.search = search;
        }
        if (status && status !== '') {
            params.status = status;
        }
        router.get("/admin/news-events", params, { preserveState: true });
    };

    const handleStatusFilter = (selectedStatus) => {
        setStatus(selectedStatus);
        const params = { search };
        if (selectedStatus && selectedStatus !== '') {
            params.status = selectedStatus;
        }
        router.get("/admin/news-events", params, { preserveState: true });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: "bg-green-100 text-green-800",
            draft: "bg-yellow-100 text-yellow-800",
        };
        return statusConfig[status] || "bg-gray-100 text-gray-800";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <DefaultLayout>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Postingan
                    </h4>
                    <Link href="/admin/news-events/create">
                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2">
                            <FaPlus size={14} />
                            Tambah Postingan
                        </button>
                    </Link>
                </div>

                {/* Filter dan Search */}
                <div className="px-7.5 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan judul..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="px-4 py-2 border rounded flex-1 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Cari
                            </button>
                        </form>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleStatusFilter("")}
                                className={`px-4 py-2 rounded ${status === "" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleStatusFilter("published")}
                                className={`px-4 py-2 rounded ${status === "published" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                            >
                                Published
                            </button>
                            <button
                                onClick={() => handleStatusFilter("draft")}
                                className={`px-4 py-2 rounded ${status === "draft" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"}`}
                            >
                                Draft
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">No</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Judul</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Status</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Penulis</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Tanggal Publish</th>
                                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsEvents.data.map((newsEvent, index) => (
                                <tr key={newsEvent.id} className="border-b border-stroke dark:border-strokedark">
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {newsEvents.from + index}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        <div>
                                            <div className="font-medium">{newsEvent.title}</div>
                                            {newsEvent.excerpt && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {newsEvent.excerpt.substring(0, 100)}...
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(newsEvent.status)}`}>
                                            {newsEvent.status === "published" ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {newsEvent.creator ? newsEvent.creator.name : "-"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {newsEvent.published_at ? formatDate(newsEvent.published_at) : "-"}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link href={`/admin/news-events/${newsEvent.id}`}>
                                                <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Lihat" />
                                            </Link>
                                            <Link href={`/admin/news-events/${newsEvent.id}/edit`}>
                                                <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" title="Edit" />
                                            </Link>
                                            <Link
                                                href={`/admin/news-events/${newsEvent.id}`}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => {
                                                    if (!confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" title="Hapus" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {newsEvents.data.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Tidak ada postingan yang ditemukan.
                    </div>
                )}

                {newsEvents.links && (
                    <div className="px-7.5 py-4">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Menampilkan {newsEvents.from} - {newsEvents.to} dari {newsEvents.total} data
                            </div>
                            <div className="flex gap-2">
                                {newsEvents.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-primary text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                        preserveState
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default NewsEventsIndex;