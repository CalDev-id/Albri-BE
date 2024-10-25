import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Create = () => {
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        address: '',
        phone: '',
        email: '',
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/guru', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
                Tambah Guru
            </h4>

            <form onSubmit={handleSubmit}>
                {/* Nama */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.nama && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                </div>

                {/* Alamat */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Alamat
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.alamat && <div className="text-red-600 text-sm mt-1">{errors.address}</div>}
                </div>

                {/* No HP */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        No HP
                    </label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.no_hp && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                </div>

               

                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Tambah Guru
                </button>
            </form>
        </div>
    );
};

export default Create;
