import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";


import { useEffect } from "react";

const CreatePengeluaran = () => {

    const { users } = usePage().props;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, errors } = useForm({
        hari: "Senin",
        tanggal: today,
        gurus: [{ guru_id: "", gaji: 0 }], // Dynamic guru list untuk private
        atk: 0,
        sewa: 0,
        intensif: 0,
        lisensi: 0,
        thr: 0,
        lainlain: 0,
    });

    // Tambah input guru baru
    const addGuru = () => {
        setData("gurus", [...data.gurus, { guru_id: "", gaji: 0 }]);
    };

    // Ubah value guru
    const updateGuru = (index, field, value) => {
        const updated = [...data.gurus];
        updated[index][field] = value;
        setData("gurus", updated);
    };

    // Hapus guru
    const removeGuru = (index) => {
        if (data.gurus.length > 1) {
            const updated = data.gurus.filter((_, i) => i !== index);
            setData("gurus", updated);
        }
    };




    const handlesubmit = (e) => {
        e.preventDefault();
        post("/admin/laporan/pengeluaranprivate/store");
    }


    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pengeluaran Private
                        </h3>
                    </div>
                    <form onSubmit={handlesubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Hari
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={data.hari}
                                        onChange={(e) => setData("hari", e.target.value)}
                                    >
                                        <option disabled selected>
                                            Pilih Hari
                                        </option>
                                        <option value="Senin">Senin</option>
                                        <option value="Selasa">Selasa</option>
                                        <option value="Rabu">Rabu</option>
                                        <option value="Kamis">Kamis</option>
                                        <option value="Jumat">Jumat</option>
                                        <option value="Sabtu">Sabtu</option>
                                        <option value="Minggu">Minggu</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={data.tanggal}
                                        onChange={(e) => setData("tanggal", e.target.value)}
                                        placeholder="Select date"
                                    />
                                </div>
                            </div>

                            {/* Section Guru - Dynamic like cabang */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Data Guru Private
                                </label>
                                {data.gurus.map((guru, index) => (
                                    <div key={index} className="mb-3 flex flex-col gap-4 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <input
                                                type="text"
                                                value={guru.guru_id}
                                                onChange={(e) => updateGuru(index, "guru_id", e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Nama Guru"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/3">
                                            <input
                                                type="number"
                                                value={guru.gaji || 0}
                                                onChange={(e) => updateGuru(index, "gaji", e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Gaji"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/6">
                                            {data.gurus.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeGuru(index)}
                                                    className="w-full h-full rounded bg-red-600 px-4 py-3 text-white hover:bg-opacity-90"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={addGuru} className="mb-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-opacity-90">
                                    + Tambah Guru
                                </button>
                            </div>

                            {/* Section ATK dan lainnya */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            ATK
                                        </label>
                                        <input
                                            type="number"
                                            value={data.atk}
                                            onChange={(e) => setData("atk", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Sewa
                                        </label>
                                        <input
                                            type="number"
                                            value={data.sewa}
                                            onChange={(e) => setData("sewa", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Intensif
                                        </label>
                                        <input
                                            type="number"
                                            value={data.intensif}
                                            onChange={(e) => setData("intensif", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Lisensi
                                        </label>
                                        <input
                                            type="number"
                                            value={data.lisensi}
                                            onChange={(e) => setData("lisensi", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            THR
                                        </label>
                                        <input
                                            type="number"
                                            value={data.thr}
                                            onChange={(e) => setData("thr", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Lain Lain
                                        </label>
                                        <input
                                            type="number"
                                            value={data.lainlain}
                                            onChange={(e) => setData("lainlain", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </DefaultLayout>
    );
};

export default CreatePengeluaran;
