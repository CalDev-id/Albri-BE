import React from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

const NewsEventsShow = ({ newsEvent }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: "bg-green-100 text-green-800",
            draft: "bg-yellow-100 text-yellow-800",
        };
        return statusConfig[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <DefaultLayout>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/news-events">
                            <FaArrowLeft className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </Link>
                        <h3 className="font-semibold text-black dark:text-white">
                            Detail Berita Acara
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/news-events/${newsEvent.id}/edit`}>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2">
                                <FaEdit size={14} />
                                Edit
                            </button>
                        </Link>
                        <Link
                            href={`/admin/news-events/${newsEvent.id}`}
                            method="delete"
                            as="button"
                            onClick={(e) => {
                                if (!confirm("Apakah Anda yakin ingin menghapus berita acara ini?")) {
                                    e.preventDefault();
                                }
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                        >
                            <FaTrash size={14} />
                            Hapus
                        </Link>
                    </div>
                </div>

                <div className="p-6.5">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Info */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(newsEvent.status)}`}>
                                    {newsEvent.status === "published" ? "Published" : "Draft"}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Slug: <code className="bg-gray-100 px-2 py-1 rounded">{newsEvent.slug}</code>
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                                {newsEvent.title}
                            </h1>

                            {newsEvent.excerpt && (
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                    {newsEvent.excerpt}
                                </p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                                <div>
                                    <span className="font-medium">Dibuat oleh:</span> {newsEvent.creator?.name || "-"}
                                </div>
                                <div>
                                    <span className="font-medium">Tanggal dibuat:</span> {formatDate(newsEvent.created_at)}
                                </div>
                                {newsEvent.updater && (
                                    <div>
                                        <span className="font-medium">Diupdate oleh:</span> {newsEvent.updater.name}
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium">Terakhir update:</span> {formatDate(newsEvent.updated_at)}
                                </div>
                                {newsEvent.published_at && (
                                    <div>
                                        <span className="font-medium">Tanggal publish:</span> {formatDate(newsEvent.published_at)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Featured Image */}
                        {newsEvent.featured_image && (
                            <div className="mb-8">
                                <img
                                    src={`/storage/${newsEvent.featured_image}`}
                                    alt={newsEvent.title}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}

        {/* Content */}
        <div className="prose max-w-none mb-8">
            <div 
                className="text-black dark:text-white leading-relaxed"
                dangerouslySetInnerHTML={{ __html: newsEvent.content }}
            />
        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default NewsEventsShow;