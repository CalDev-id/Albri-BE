import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";


import { useEffect } from "react";

const CreatePengeluaran = () => {

    const { users } = usePage().props;
    const { data, setData, post, errors } = useForm({
        hari: "Senin",
        tanggal: "",
        mitras: [{ mitra_id: "", gaji: "" }], // bisa tambah banyak
        atk: "",
        intensif: "",
        lisensi: "",
        lainlain: "",
    });

    // Tambah input mitra baru
    const addMitra = () => {
        setData("mitras", [...data.mitras, { mitra_id: "", gaji: "" }]);
    };

    // Ubah value mitra
    const updateMitra = (index, field, value) => {
        const updated = [...data.mitras];
        updated[index][field] = value;
        setData("mitras", updated);
    };




    const handlesubmit = (e) => {
        e.preventDefault();
        post("/admin/laporan/pengeluaranmitra/store");
    }


    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pengeluaran Mitra
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
                                        <option disabled value="">
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

                            {/* Section Mitra */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Data Mitra
                                </label>
                                {data.mitras.map((mitra, index) => (
                                    <div key={index} className="mb-3 flex flex-col gap-4 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <input
                                                type="text"
                                                value={mitra.mitra_id}
                                                onChange={(e) => updateMitra(index, "mitra_id", e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Nama Mitra"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <input
                                                type="number"
                                                value={mitra.gaji}
                                                onChange={(e) => updateMitra(index, "gaji", e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Gaji"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={addMitra} className="mb-4 rounded bg-meta-3 px-6 py-2 text-white hover:bg-opacity-90">
                                    + Tambah Mitra
                                </button>
                            </div>

                            {/* Section ATK dan lainnya */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            ATK
                                        </label>
                                        <input
                                            type="text"
                                            value={data.atk}
                                            onChange={(e) => setData("atk", e.target.value)}
                                            placeholder=""
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
                                            type="text"
                                            value={data.intensif}
                                            onChange={(e) => setData("intensif", e.target.value)}
                                            placeholder=""
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
                                            type="text"
                                            value={data.lisensi}
                                            onChange={(e) => setData("lisensi", e.target.value)}
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Lain Lain
                                        </label>
                                        <input
                                            type="number"
                                            value={data.lainlain}
                                            onChange={(e) => setData("lainlain", e.target.value)}
                                            placeholder=""
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
