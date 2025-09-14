import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";
import { FaCalendar, FaUser, FaArrowLeft, FaShare } from "react-icons/fa";

const NewsEventShow = ({ newsEvent, relatedNews }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    const handleShare = (platform) => {
        const title = encodeURIComponent(newsEvent.title);
        const url = encodeURIComponent(shareUrl);
        
        let shareLink = '';
        switch(platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${title}%20${url}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                alert('Link berhasil disalin!');
                return;
        }
        
        if (shareLink) {
            window.open(shareLink, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-Geologica">
            <Head title={newsEvent.title} />
            
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar active={"berita-acara"} forceBackground={true} />
            </div>

            {/* Back Button */}
            <div className="bg-white border-b pt-20">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/berita-acara"
                        className="inline-flex items-center gap-2 text-[#4bb0b2] hover:text-[#3a9597] font-semibold transition-colors duration-300"
                    >
                        <FaArrowLeft />
                        Kembali ke Daftar Berita
                    </Link>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Featured Image */}
                        {newsEvent.featured_image && (
                            <div className="relative h-64 md:h-96 bg-gradient-to-br from-[#4bb0b2] to-[#3a9597] overflow-hidden">
                                <img
                                    src={`/storage/${newsEvent.featured_image}`}
                                    alt={newsEvent.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        )}

                        {/* Article Header */}
                        <div className="p-6 md:p-10">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <FaCalendar className="text-[#4bb0b2]" />
                                    <span>{formatDateTime(newsEvent.published_at)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-[#4bb0b2]" />
                                    <span>Oleh: {newsEvent.creator?.name || 'Admin'}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                                {newsEvent.title}
                            </h1>

                            {/* Excerpt */}
                            {newsEvent.excerpt && (
                                <div className="bg-gray-50 border-l-4 border-[#4bb0b2] p-6 mb-8 rounded-r-lg">
                                    <p className="text-lg text-gray-700 font-medium italic">
                                        {newsEvent.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Share Buttons */}
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                                <span className="text-gray-600 font-medium">Bagikan:</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleShare('facebook')}
                                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                                        title="Bagikan ke Facebook"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleShare('twitter')}
                                        className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300"
                                        title="Bagikan ke Twitter"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleShare('whatsapp')}
                                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                                        title="Bagikan ke WhatsApp"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleShare('copy')}
                                        className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
                                        title="Salin Link"
                                    >
                                        <FaShare className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div 
                                className="prose prose-lg max-w-none content-article"
                                dangerouslySetInnerHTML={{ __html: newsEvent.content }}
                            />
                        </div>
                    </article>

                    {/* Related News */}
                    {relatedNews.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                                Berita Acara Lainnya
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedNews.map((news) => (
                                    <Link
                                        key={news.id}
                                        href={`/berita-acara/${news.slug}`}
                                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* Image */}
                                        <div className="relative h-40 bg-gradient-to-br from-[#4bb0b2] to-[#3a9597] overflow-hidden">
                                            {news.featured_image ? (
                                                <img
                                                    src={`/storage/${news.featured_image}`}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white text-2xl opacity-50">
                                                    📰
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                                <FaCalendar className="text-[#4bb0b2]" />
                                                {formatDate(news.published_at)}
                                            </div>
                                            <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-[#4bb0b2] transition-colors duration-300">
                                                {news.title}
                                            </h3>
                                            {news.excerpt && (
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                    {news.excerpt.substring(0, 80)}...
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Custom CSS for content styling */}
            <style jsx>{`
                .content-article h1,
                .content-article h2,
                .content-article h3,
                .content-article h4,
                .content-article h5,
                .content-article h6 {
                    color: #2d3748;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .content-article h1 { font-size: 2rem; }
                .content-article h2 { font-size: 1.75rem; }
                .content-article h3 { font-size: 1.5rem; }
                
                .content-article p {
                    margin-bottom: 1rem;
                    line-height: 1.7;
                    color: #4a5568;
                }
                
                .content-article ul,
                .content-article ol {
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                }
                
                .content-article li {
                    margin-bottom: 0.5rem;
                    color: #4a5568;
                }
                
                .content-article blockquote {
                    border-left: 4px solid #4bb0b2;
                    background-color: #f7fafc;
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                }
                
                .content-article img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                }
                
                .content-article a {
                    color: #4bb0b2;
                    text-decoration: underline;
                }
                
                .content-article a:hover {
                    color: #3a9597;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default NewsEventShow;