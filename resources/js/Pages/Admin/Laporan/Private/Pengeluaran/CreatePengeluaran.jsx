import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";


import { useEffect } from "react";

const CreatePengeluaran = () => {

    const { users } = usePage().props;
    const { data, setData, post, errors } = useForm({
        hari : "senin",
        tanggal : "",
        guru_id : users.length > 0 ? users[0].id : "", // Set the default value to the first user's id if available
        gaji : "",
        atk: "",
        sewa: "",
        thr: "",
        intensif: "",
        lisensi: "",
        lainlain: "",

    });




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
                            Laporan Pemasukan Cabang
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
                                               


                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    guru
                                </label>
                                <select className="select select-bordered w-full"
                                    value={data.guru_id}
                                    onChange={(e) => setData("guru_id", e.target.value)}
                                >
                                    <option disabled selected>
                                        Pilih Cabang
                                    </option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Gaji
                                        </label>
                                        <input
                                            type="text"
                                            value={data.gaji}
                                            onChange={(e) => setData("gaji", e.target.value)}
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
                          

                              
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Sewa
                                        </label>
                                        <input
                                            type="text"
                                            value={data.sewa}
                                            onChange={(e) => setData("sewa", e.target.value)}
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
                                            type="text"
                                            value={data.thr}
                                            onChange={(e) => setData("thr", e.target.value)}
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

export default CreatePengeluaran;
