import React, { useState } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

const Create = () => {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        name: "",
        phone: "",
        email: "",
        company: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim data form ke server menggunakan post
        post("/mitras");
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Mitra</h2>

            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`w-full p-2 border rounded-md ${
                            errors.name ? "border-red-500" : ""
                        }`}
                        placeholder="Enter mitra's name"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Contact Field */}
                <div className="mb-4">
                    <label className="block text-gray-700">Contact</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className={`w-full p-2 border rounded-md ${
                            errors.phone ? "border-red-500" : ""
                        }`}
                        placeholder="Enter contact number"
                    />
                    {errors.phone && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.phone}
                        </div>
                    )}
                </div>

                {/* Address Field */}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <textarea
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className={`w-full p-2 border rounded-md ${
                            errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="Enter address"
                    ></textarea>
                    {errors.address && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Company</label>
                    <textarea
                        value={data.company}
                        onChange={(e) => setData("company", e.target.value)}
                        className={`w-full p-2 border rounded-md ${
                            errors.company ? "border-red-500" : ""
                        }`}
                        placeholder="Enter address"
                    ></textarea>
                    {errors.company && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.company}
                        </div>
                    )}
                </div>



                {/* Buttons */}
                <div className="flex justify-end mt-6">
                    <Link href="/mitra/dashboard" className="mr-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        disabled={processing}
                    >
                        {processing ? "Processing..." : "Add Mitra"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
