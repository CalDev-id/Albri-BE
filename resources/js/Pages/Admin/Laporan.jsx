import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "@inertiajs/react";

import DatePickerOne from "@/components/DatePickerOne";
import SelectGroupTwo from "@/components/SelectGroupTwo";
import { useEffect } from "react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon

const Laporan = () => {
    useEffect(() => {
        // Pastikan inisialisasi dijalankan setelah komponen dimuat
        if (typeof window !== "undefined" && window.Datepicker) {
            new window.Datepicker(document.getElementById("datepicker-format"));
        }
    }, []);
    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Mitra
                        </h3>
                    </div>
                    <form action="#">
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Hari/Tanggal
                                    </label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="datepicker-format"
                                            datepicker
                                            datepicker-format="mm-dd-yyyy"
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Select date"
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Cabang
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled selected>
                                            Jakarta
                                        </option>
                                        <option>Jakarta</option>
                                        <option>Solo</option>
                                        <option>BalikPapan</option>
                                    </select>
                                </div>
                            </div>

                            <h2 className="py-5 text-2xl font-bold text-black">
                                Income
                            </h2>
                            {/* biaya */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Biaya
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled selected>
                                            5000
                                        </option>
                                        <option>5000</option>
                                        <option>10.000</option>
                                        <option>12.000</option>
                                    </select>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Jumlah anak
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Biaya
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled selected>
                                            5000
                                        </option>
                                        <option>5000</option>
                                        <option>10.000</option>
                                        <option>12.000</option>
                                    </select>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Jumlah anak
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Biaya
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled selected>
                                            5000
                                        </option>
                                        <option>5000</option>
                                        <option>10.000</option>
                                        <option>12.000</option>
                                    </select>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Jumlah anak
                                        </label>
                                        <input
                                            type="text"
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
                                            Modul
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Pendaftaran
                                        </label>
                                        <input
                                            type="text"
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
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="py-5 text-2xl font-bold text-black">
                                Pengeluaran
                            </h2>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Nama Guru
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled selected>
                                            agus
                                        </option>
                                        <option>ical</option>
                                        <option>rafi</option>
                                        <option>fajril</option>
                                    </select>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Gaji
                                        </label>
                                        <input
                                            type="text"
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
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Sewa
                                        </label>
                                        <input
                                            type="text"
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
                                            Intensif
                                        </label>
                                        <input
                                            type="text"
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
                                            Bensin
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2"></div>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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

// const chatData = [
//     {
//         avatar: "/images/user/user-01.png",
//         name: "Devid Heilo",
//         text: "Math Mentor",
//         address: "1234 Main St",
//         phone: "123-456-7890",
//         email: "devid@example.com",
//     },
//     {
//         avatar: "/images/user/user-02.png",
//         name: "Henry Fisher",
//         text: "Philosophy Mentor",
//         address: "5678 Elm St",
//         phone: "987-654-3210",
//         email: "henry@example.com",
//     },
//     {
//         avatar: "/images/user/user-04.png",
//         name: "Jhon Doe",
//         text: "Religion Mentor",
//         address: "9101 Oak St",
//         phone: "555-666-7777",
//         email: "jhon@example.com",
//     },
//     {
//         avatar: "/images/user/user-05.png",
//         name: "Jane Doe",
//         text: "Physics Mentor",
//         address: "1213 Pine St",
//         phone: "888-999-0000",
//         email: "jane@example.com",
//     },
//     {
//         avatar: "/images/user/user-01.png",
//         name: "Jhon Doe",
//         text: "Art Mentor",
//         address: "1415 Cedar St",
//         phone: "222-333-4444",
//         email: "artjhon@example.com",
//     },
//     {
//         avatar: "/images/user/user-03.png",
//         name: "Jhon Doe",
//         text: "Biology Mentor",
//         address: "1617 Maple St",
//         phone: "444-555-6666",
//         email: "biojhon@example.com",
//     },
// ];

// const Laporan = () => {
//     return (
//         <DefaultLayout>
//             <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="flex justify-between px-7.5 mb-6">
//                     <h4 className="text-xl font-semibold text-black dark:text-white">
//                         Laporan Mitra
//                     </h4>
//                     <Link href="/add-mentor">
//                         <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
//                             Tambah Laporan
//                         </button>
//                     </Link>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full table-auto">
//                         <thead>
//                             <tr className="bg-gray-2 dark:bg-meta-4">
//                                 {/* <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Avatar</th> */}
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
//                                     Hari
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Total Biaya
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Modul
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Daftar
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Kaos
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Kas
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Nama Guru
//                                 </th><th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Gaji
//                                 </th><th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     ATK
//                                 </th><th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Sewa
//                                 </th><th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Intensif
//                                 </th><th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     THR
//                                 </th><th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Bensin
//                                 </th>
//                                 <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {chatData.map((chat, key) => (
//                                 <tr
//                                     key={key}
//                                     className="border-b border-stroke dark:border-strokedark"
//                                 >
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
//                                         {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"agus"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                     {"20"}
//                                     </td>
//                                     <td className="py-4 px-4 text-center">
//                                         <div className="flex justify-center gap-3">
//                                             {/* <Link href={`/view/${key}`}>
//                       <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" />
//                     </Link> */}
//                                             <Link href={`/edit/${key}`}>
//                                                 <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
//                                             </Link>
//                                             <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>


//             {/* P E N G E L U A R A N */}

//             {/* <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-20">
//                 <div className="flex justify-between px-7.5 mb-6">
//                     <h4 className="text-xl font-semibold text-black dark:text-white">
//                         Laporan Pengeluaran Mitra
//                     </h4>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full table-auto">
//                         <thead>
//                             <tr className="bg-gray-2 dark:bg-meta-4">
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
//                                     Nama
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Gaji
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     ATK
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Sewa
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Intensif
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     THR
//                                 </th>
//                                 <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
//                                     Bensin
//                                 </th>
                                
//                                 <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {chatData.map((chat, key) => (
//                                 <tr
//                                     key={key}
//                                     className="border-b border-stroke dark:border-strokedark"
//                                 >
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
//                                         {chat.name}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                         {chat.text}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                         {chat.address}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                         {chat.phone}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                         {chat.phone}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                         {chat.email}
//                                     </td>
//                                     <td className="py-4 px-4 text-sm text-black dark:text-white">
//                                         {"0"}
//                                     </td>
//                                     <td className="py-4 px-4 text-center">
//                                         <div className="flex justify-center gap-3">
//                                             <Link href={`/edit/${key}`}>
//                                                 <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
//                                             </Link>
//                                             <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div> */}
//         </DefaultLayout>
//     );
// };

// export default Laporan;
