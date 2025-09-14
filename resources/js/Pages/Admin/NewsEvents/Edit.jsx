import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";
import { FaArrowLeft, FaSave, FaEye } from "react-icons/fa";
import TextEditor from "@/Components/TextEditor";

const NewsEventsEdit = ({ newsEvent }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: newsEvent.title || "",
        slug: newsEvent.slug || "",
        excerpt: newsEvent.excerpt || "",
        content: newsEvent.content || "",
        featured_image: null,
        status: newsEvent.status || "draft",
        published_at: newsEvent.published_at ? newsEvent.published_at.substring(0, 16) : "",
        meta_data: newsEvent.meta_data || {
            meta_title: "",
            meta_description: "",
            tags: ""
        }
    });

    const [previewMode, setPreviewMode] = useState(false);

    const handleSubmit = (e, status = null) => {
        e.preventDefault();
        if (status) {
            setData("status", status);
        }
        post(`/admin/news-events/${newsEvent.id}`, {
            _method: 'put',
            forceFormData: true,
        });
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData({
            ...data,
            title: title,
            slug: generateSlug(title)
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("featured_image", file);
    };

    const handleMetaDataChange = (field, value) => {
        setData("meta_data", {
            ...data.meta_data,
            [field]: value
        });
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
                            Edit Berita Acara
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setPreviewMode(!previewMode)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
                        >
                            <FaEye size={14} />
                            {previewMode ? "Edit" : "Preview"}
                        </button>
                    </div>
                </div>

                {!previewMode ? (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white font-medium">
                                            Judul Berita Acara
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan judul berita acara..."
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            value={data.title}
                                            onChange={handleTitleChange}
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kosongkan jika tidak ingin mengubah judul
                                        </p>
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white font-medium">
                                            Slug URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="slug-url-berita"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            value={data.slug}
                                            onChange={(e) => setData("slug", e.target.value)}
                                        />
                                        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white font-medium">
                                            Ringkasan
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Ringkasan singkat berita acara..."
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            value={data.excerpt}
                                            onChange={(e) => setData("excerpt", e.target.value)}
                                        />
                                        {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white font-medium">
                                            Konten
                                        </label>
                                        <TextEditor
                                            value={data.content}
                                            onChange={(value) => setData("content", value)}
                                            placeholder="Tulis konten berita acara di sini..."
                                        />
                                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                                        <p className="text-xs text-gray-500 mt-1">
                                            Gunakan toolbar di atas untuk formatting text, menambah gambar, link, dan lainnya. Kosongkan jika tidak ingin mengubah konten.
                                        </p>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Publish Settings */}
                                    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                                            Pengaturan Publish
                                        </h4>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                                    Status
                                                </label>
                                                <select
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={data.status}
                                                    onChange={(e) => setData("status", e.target.value)}
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Published</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                                    Tanggal Publish
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={data.published_at}
                                                    onChange={(e) => setData("published_at", e.target.value)}
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2 flex-1"
                                                >
                                                    <FaSave size={14} />
                                                    Simpan Draft
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleSubmit(e, "published")}
                                                    disabled={processing}
                                                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2 flex-1"
                                                >
                                                    Publish
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Featured Image */}
                                    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                                            Gambar Utama
                                        </h4>
                                        {newsEvent.featured_image && (
                                            <div className="mb-4">
                                                <img
                                                    src={`/storage/${newsEvent.featured_image}`}
                                                    alt="Current featured image"
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Gambar saat ini</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            <strong>Pilih gambar baru untuk mengubah</strong>, atau kosongkan jika tidak ingin mengubah gambar. 
                                            Anda dapat mengubah hanya gambar tanpa perlu mengubah field lain.
                                        </p>
                                        {errors.featured_image && <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>}
                                    </div>

                                    {/* SEO Settings */}
                                    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                                            SEO
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                                    Meta Title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Meta title untuk SEO..."
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={data.meta_data?.meta_title || ""}
                                                    onChange={(e) => handleMetaDataChange("meta_title", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Meta description untuk SEO..."
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={data.meta_data?.meta_description || ""}
                                                    onChange={(e) => handleMetaDataChange("meta_description", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2.5 block text-black dark:text-white font-medium">
                                                    Tags
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Tag1, Tag2, Tag3..."
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    value={data.meta_data?.tags || ""}
                                                    onChange={(e) => handleMetaDataChange("tags", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    /* Preview Mode */
                    <div className="p-6.5">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                                    {data.title || "Judul Berita Acara"}
                                </h1>
                                {data.excerpt && (
                                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                                        {data.excerpt}
                                    </p>
                                )}
                                <div className="text-sm text-gray-500">
                                    Status: <span className="font-medium">{data.status}</span>
                                    {data.published_at && (
                                        <span className="ml-4">
                                            Publish: {new Date(data.published_at).toLocaleDateString("id-ID")}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {newsEvent.featured_image && (
                                <div className="mb-6">
                                    <img
                                        src={`/storage/${newsEvent.featured_image}`}
                                        alt={data.title}
                                        className="w-full h-64 object-cover rounded"
                                    />
                                </div>
                            )}
                            <div className="prose max-w-none">
                                <div 
                                    className="text-black dark:text-white leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.content || "Konten berita acara akan ditampilkan di sini..." }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default NewsEventsEdit;