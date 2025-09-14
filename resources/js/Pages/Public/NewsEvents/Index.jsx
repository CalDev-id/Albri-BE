import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";
import { FaSearch, FaCalendar, FaUser, FaEye } from "react-icons/fa";

const NewsEventsIndex = ({ newsEvents, filters }) => {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        const params = {};
        if (search && search !== '') {
            params.search = search;
        }
        router.get("/berita-acara", params, { preserveState: true });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-Geologica">
            <Head title="Berita Acara" />
            
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar active={"berita-acara"} />
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#4bb0b2] to-[#3a9597] pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Berita Acara
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90">
                            Informasi terkini seputar kegiatan dan acara Albri
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white shadow-sm py-8">
                <div className="container mx-auto px-4">
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari berita acara..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4bb0b2] focus:border-transparent shadow-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-6 bg-[#4bb0b2] text-white rounded-full hover:bg-[#3a9597] transition duration-300 flex items-center justify-center"
                            >
                                <FaSearch className="text-lg" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* News Events Grid */}
            <div className="container mx-auto px-4 py-12">
                {newsEvents.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsEvents.data.map((newsEvent) => (
                                <div
                                    key={newsEvent.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Featured Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-[#4bb0b2] to-[#3a9597] overflow-hidden">
                                        {newsEvent.featured_image ? (
                                            <img
                                                src={`/storage/${newsEvent.featured_image}`}
                                                alt={newsEvent.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="text-white text-6xl opacity-50">
                                                    <FaEye />
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <FaCalendar className="text-[#4bb0b2]" />
                                                <span>{formatDate(newsEvent.published_at)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaUser className="text-[#4bb0b2]" />
                                                <span>{newsEvent.creator?.name || 'Admin'}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#4bb0b2] transition-colors duration-300">
                                            {newsEvent.title}
                                        </h3>

                                        {newsEvent.excerpt && (
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {truncateText(newsEvent.excerpt, 120)}
                                            </p>
                                        )}

                                        <Link
                                            href={`/berita-acara/${newsEvent.slug}`}
                                            className="inline-flex items-center gap-2 text-[#4bb0b2] font-semibold hover:text-[#3a9597] transition-colors duration-300"
                                        >
                                            Baca Selengkapnya
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {newsEvents.links && newsEvents.links.length > 3 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-2">
                                    {newsEvents.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                                link.active
                                                    ? 'bg-[#4bb0b2] text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 hover:bg-[#4bb0b2] hover:text-white border border-gray-300'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-8xl mb-6">
                            <FaSearch className="mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-4">
                            Tidak Ada Berita Acara
                        </h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            {search ? 
                                `Tidak ditemukan berita acara dengan kata kunci "${search}".` :
                                'Belum ada berita acara yang dipublikasikan.'
                            }
                        </p>
                        {search && (
                            <Link
                                href="/berita-acara"
                                className="inline-flex items-center gap-2 bg-[#4bb0b2] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3a9597] transition-colors duration-300"
                            >
                                Lihat Semua Berita
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default NewsEventsIndex;