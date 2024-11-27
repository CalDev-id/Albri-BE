import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "@inertiajs/react";

import DatePickerOne from "@/components/DatePickerOne";
import SelectGroupTwo from "@/components/SelectGroupTwo";
import { useEffect } from "react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon

const Laporan = () => {

    const{ data, setData, post, errors }=useForm({
        hari: "Senin",
        tanggal: "",
        biaya_5000: "",
        biaya_8000: "",
        biaya_10000: "",
        biaya_15000: "",
        daftar: "",
        modul: "",
        kaos: "",
        kas: "",
        lainlain: "",
    });

    const handlesubmit = (e) => {
        e.preventDefault();
        post("/admin/laporan/mitra/store");
    };

    // useEffect(() => {
    //     // Pastikan inisialisasi dijalankan setelah komponen dimuat
    //     if (typeof window !== "undefined" && window.Datepicker) {
    //         new window.Datepicker(document.getElementById("datepicker-format"));
    //     }
    // }, []);
    return (
        <DefaultLayout>
          <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pemasukan Mitra
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
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                       
                                <div className="w-full  xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            7000
                                        </label>
                                        <input
                                            type="text"
                                            value={data.biaya_5000}
                                            onChange={(e) => setData("biaya_5000", e.target.value)}
                                            placeholder="   "
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            8000
                                        </label>
                                        <input
                                            type="text"
                                            value={data.biaya_8000}
                                            onChange={(e) => setData("biaya_8000", e.target.value)}
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
                                            10.000
                                        </label>
                                        <input
                                            type="text"
                                            value={data.biaya_10000}
                                            onChange={(e) => setData("biaya_10000", e.target.value)}
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            15.000
                                        </label>
                                        <input
                                            type="text"
                                            value={data.biaya_15000}
                                            onChange={(e) => setData("biaya_15000", e.target.value)}
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
                                            Pendaftaran
                                        </label>
                                        <input
                                            type="text"
                                            value={data.daftar}
                                            onChange={(e) => setData("daftar", e.target.value)}
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Modul
                                        </label>
                                        <input
                                            type="text"
                                            value={data.modul}
                                            onChange={(e) => setData("modul", e.target.value)}
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
                                            Kaos
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kaos}
                                            onChange={(e) => setData("kaos", e.target.value)}
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Kas
                                        </label>
                                        <input
                                            type="number"

                                            value={data.kas}
                                            onChange={(e) => setData("kas", e.target.value)}
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
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button  type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
           
        </DefaultLayout>
    );
};

export default Laporan;
