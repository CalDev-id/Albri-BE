import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const EditCabang = () => {
    const { cabangs, laporanCabang, users } = usePage().props
    const { data, setData, put, errors } = useForm({
        hari: laporanCabang.hari,
        tanggal: laporanCabang.tanggal,
        cabang_id: laporanCabang.cabang_id,
        gurus: laporanCabang.gurus && laporanCabang.gurus.length > 0
            ? laporanCabang.gurus.map(guru => ({
                guru_id: guru.guru_nama || "",
                gaji: guru.gaji || ""
            }))
            : [{ guru_id: "", gaji: "" }],
        atk: laporanCabang.atk,
        sewa: laporanCabang.sewa,
        intensif: laporanCabang.intensif,
        lisensi: laporanCabang.lisensi,
        thr: laporanCabang.thr,
        lainlain: laporanCabang.lainlain,
    });

    // Tambah input guru baru
    const addGuru = () => {
        setData("gurus", [...data.gurus, { guru_id: "", gaji: "" }]);
    };

    // Hapus input guru
    const removeGuru = (index) => {
        if (data.gurus.length > 1) { // Pastikan minimal ada 1 guru
            const updated = data.gurus.filter((_, i) => i !== index);
            setData("gurus", updated);
        }
    };

    // Ubah value guru
    const updateGuru = (index, field, value) => {
        const updated = [...data.gurus];
        updated[index][field] = value;
        setData("gurus", updated);
    };

    // Helper functions for numeric inputs
    const handleNumericFocus = (e) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };

    const handleNumericBlur = (e, field) => {
        if (e.target.value === '' || e.target.value === '0') {
            setData(field, 0);
            e.target.value = '0';
        }
    };

    const handleGuruNumericFocus = (e) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };

    const handleGuruNumericBlur = (e, index) => {
        if (e.target.value === '' || e.target.value === '0') {
            updateGuru(index, "gaji", 0);
            e.target.value = '0';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', data);
        put(`/admin/laporan/pengeluaran/${laporanCabang.id}`, {
            onSuccess: () => {
                console.log('Update successful');
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            }
        });
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> s*/}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pengeluaran Cabang
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                                        <option value="senin">Senin</option>
                                        <option value="selasa">Selasa</option>
                                        <option value="rabu">Rabu</option>
                                        <option value="kamis">Kamis</option>
                                        <option value="jumat">Jumat</option>
                                        <option value="sabtu">Sabtu</option>
                                        <option value="minggu">Minggu</option>
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
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Cabang
                                    </label>
                                    <select className="select select-bordered w-full"
                                        value={data.cabang_id}
                                        onChange={(e) => setData("cabang_id", e.target.value)}
                                    >
                                        <option disabled selected>
                                            Pilih Cabang
                                        </option>
                                        {cabangs.map((cabang) => (
                                            <option key={cabang.id} value={cabang.id}>
                                                {cabang.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Section Guru */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Data Guru
                                </label>
                                {data.gurus.map((guru, index) => (
                                    <div key={index} className="mb-3 flex flex-col gap-4 xl:flex-row xl:items-end">
                                        <div className="w-full xl:w-1/2">
                                            <input
                                                type="text"
                                                value={guru.guru_id}
                                                onChange={(e) => updateGuru(index, "guru_id", e.target.value)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Nama Guru"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <input
                                                type="number"
                                                value={guru.gaji}
                                                onChange={(e) => updateGuru(index, "gaji", e.target.value)}
                                                onFocus={handleGuruNumericFocus}
                                                onBlur={(e) => handleGuruNumericBlur(e, index)}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Gaji"
                                            />
                                        </div>
                                        {data.gurus.length > 1 && (
                                            <div className="xl:w-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => removeGuru(index)}
                                                    className="rounded bg-red-600 px-4 py-3 text-white hover:bg-opacity-90"
                                                    title="Hapus Guru"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
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
                                            type="text"
                                            value={data.atk}
                                            onChange={(e) => setData("atk", e.target.value)}
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, "atk")}
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
                                            sewa
                                        </label>
                                        <input
                                            type="text"
                                            value={data.sewa}
                                            onChange={(e) => setData("sewa", e.target.value)}
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, "sewa")}
                                            placeholder="sewa"
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
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, "intensif")}
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
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, "lisensi")}
                                            placeholder=""
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
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, "thr")}
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
                                            Lain Lain
                                        </label>
                                        <input
                                            type="number"
                                            value={data.lainlain}
                                            onChange={(e) => setData("lainlain", e.target.value)}
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, "lainlain")}
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
}
export default EditCabang;