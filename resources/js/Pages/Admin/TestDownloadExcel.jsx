// import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import CardDataStats from "@/components/Tables/CardDataStats";

import DatePickerOne from "@/components/DatePickerOne";
import SelectGroupTwo from "@/components/SelectGroupTwo";
// import { useEffect } from "react";

import "flowbite/dist/flowbite.min.js";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon

const chatData = [
    {
        avatar: "/images/user/user-01.png",
        name: "Devid Heilo",
        text: "Math Mentor",
        address: "1234 Main St",
        phone: "123-456-7890",
        email: "devid@example.com",
    },
    {
        avatar: "/images/user/user-02.png",
        name: "Henry Fisher",
        text: "Philosophy Mentor",
        address: "5678 Elm St",
        phone: "987-654-3210",
        email: "henry@example.com",
    },
    {
        avatar: "/images/user/user-04.png",
        name: "Jhon Doe",
        text: "Religion Mentor",
        address: "9101 Oak St",
        phone: "555-666-7777",
        email: "jhon@example.com",
    },
    {
        avatar: "/images/user/user-05.png",
        name: "Jane Doe",
        text: "Physics Mentor",
        address: "1213 Pine St",
        phone: "888-999-0000",
        email: "jane@example.com",
    },
    {
        avatar: "/images/user/user-01.png",
        name: "Jhon Doe",
        text: "Art Mentor",
        address: "1415 Cedar St",
        phone: "222-333-4444",
        email: "artjhon@example.com",
    },
    {
        avatar: "/images/user/user-03.png",
        name: "Jhon Doe",
        text: "Biology Mentor",
        address: "1617 Maple St",
        phone: "444-555-6666",
        email: "biojhon@example.com",
    },
];

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const YourComponent = () => {
    const chatData = [
        {
            avatar: "/images/user/user-01.png",
            name: "Devid Heilo",
            text: "Math Mentor",
            address: "1234 Main St",
            phone: "123-456-7890",
            email: "devid@example.com",
        },
        {
            avatar: "/images/user/user-02.png",
            name: "Henry Fisher",
            text: "Philosophy Mentor",
            address: "5678 Elm St",
            phone: "987-654-3210",
            email: "henry@example.com",
        },
        {
            avatar: "/images/user/user-04.png",
            name: "Jhon Doe",
            text: "Religion Mentor",
            address: "9101 Oak St",
            phone: "555-666-7777",
            email: "jhon@example.com",
        },
        {
            avatar: "/images/user/user-05.png",
            name: "Jane Doe",
            text: "Physics Mentor",
            address: "1213 Pine St",
            phone: "888-999-0000",
            email: "jane@example.com",
        },
        {
            avatar: "/images/user/user-01.png",
            name: "Jhon Doe",
            text: "Art Mentor",
            address: "1415 Cedar St",
            phone: "222-333-4444",
            email: "artjhon@example.com",
        },
        {
            avatar: "/images/user/user-03.png",
            name: "Jhon Doe",
            text: "Biology Mentor",
            address: "1617 Maple St",
            phone: "444-555-6666",
            email: "biojhon@example.com",
        },
    ];

    const handleDownloadExcel = () => {
        // Prepare data for Excel
        const worksheetData = chatData.map((chat, index) => ({
            "Hari": "senin", // You can replace this with dynamic values from chatData
            "Tanggal": "20/21/2111",
            "7000": chat.column3 || 0,
            "8000": chat.column4 || 0,
            "10.000": chat.column5 || 0,
            "15.000": chat.column6 || 0,
            "Total Biaya": chat.totalBiaya || 0,
            "Daftar": chat.daftar || 0,
            "Modul": chat.modul || 0,
            "Kaos": chat.kaos || 0,
            "Kas": chat.kas || 0,
            "Lain Lain": chat.lainLain || 0,
            "Total": chat.Total || 0,
        }));

        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

        // Trigger file download
        XLSX.writeFile(workbook, "LaporanPemasukanMitra.xlsx");
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between px-7.5 mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Laporan Pemasukan Mitra
                </h4>
                <div>
                    <Link href="/admin/laporan/mitra/create">
                        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                            Tambah Laporan
                        </button>
                    </Link>
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                    >
                        Download Excel
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">
                                    Hari
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Tanggal
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    7000
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    8000
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    10.000
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    15.000
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Total Biaya
                                </th>

                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Daftar
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Modul
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Kaos
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Kas
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Lain Lain
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">
                                    Total
                                </th>
                                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {chatData.map((chat, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-stroke dark:border-strokedark"
                                >
                                    <td className="py-4 px-4 text-sm text-black dark:text-white pl-10">
                                        {"senin"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20/21/2111"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20.000"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"0"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"0"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"0"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"0"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"0"}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                                        {"20000"}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link href={`/edit/${key}`}>
                                                <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                                            </Link>
                                            <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {/* Total row */}
                            <tr className="bg-gray-2 dark:bg-meta-4 font-semibold">
                                <td
                                    className="py-4 px-4 text-left text-sm text-black dark:text-white pl-10"
                                    colSpan="2"
                                >
                                    Total
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of column 3 */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.column3 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of column 4 */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.column4 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of column 5 */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.column5 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of column 6 */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.column6 || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Total Biaya */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.totalBiaya || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Daftar */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.daftar || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Modul */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.modul || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Kaos */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.kaos || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Kas */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.kas || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Lain Lain */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.lainLain || 0),
                                        0
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm text-black dark:text-white">
                                    {/* Sum of Modul */}
                                    {chatData.reduce(
                                        (acc, chat) =>
                                            acc + Number(chat.Total || 0),
                                        0
                                    )}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default YourComponent;
