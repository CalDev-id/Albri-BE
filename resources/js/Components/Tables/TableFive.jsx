import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

const TableFive = ({ initialCabangs }) => {
    const [cabangs, setCabangs] = useState(initialCabangs);

    // Fungsi untuk mengambil data cabang dari server
    const fetchCabangs = () => {
        fetch('/cabangs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCabangs(data);
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    useEffect(() => {
        // Ambil data cabang saat pertama kali komponen di-render
        fetchCabangs();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this branch?")) {
            fetch(`/cabangs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Deleted successfully:", data);
                // Mengupdate state cabangs untuk menghapus cabang yang telah dihapus
                setCabangs(prevCabangs => prevCabangs.filter(cabang => cabang.id !== id));
            })
            .catch(error => {
                console.error("There was a problem with the delete request:", error);
            });
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="mb-6 flex justify-between">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Branch
                </h4>
                <Link href="/cabangs/create">
                    <button className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90">
                        Add Branch
                    </button>
                </Link>
            </div>

            <div className="flex flex-col">
                {/* Header Row */}
                <div className="grid grid-cols-3 rounded-sm bg-gray-200 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Students
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Revenues
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Outcomes
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {/* Data Rows */}
                {Array.isArray(cabangs) && cabangs.length > 0 ? (
                    cabangs.map((cabang, index) => (
                        <div
                            className={`grid grid-cols-3 sm:grid-cols-5 ${
                                index === cabangs.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                            }`}
                            key={cabang.id}
                        >
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-800">
                                    <h1 className="text-2xl font-bold text-gray-200">
                                        {cabang.nama.charAt(0).toUpperCase()}{" "}
                                    </h1>
                                </div>
                                <p className="hidden text-black dark:text-white sm:block">
                                    {cabang.nama}{" "}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">
                                    {cabang.jumlah_murid}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-3">
                                    {cabang.pendapatan}
                                </p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="text-red dark:text-white">
                                    {cabang.pengeluaran}
                                </p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <div className="flex items-center space-x-3.5">
                                    <Link href={`/cabangs/${cabang.id}/edit`}>
                                        <button className="hover:text-primary">
                                            {/* Icon Edit */}
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.97961 11.9035L3.19461 14.9277C3.10415 15.2598 3.19255 15.6116 3.42452 15.8436C3.65649 16.0755 4.00833 16.1639 4.34038 16.0735L7.36461 15.2885C7.54395 15.2412 7.70799 15.1468 7.84389 15.0109L14.6726 8.18221C15.0406 7.8142 15.0406 7.2207 14.6726 6.8527L11.1473 3.32741C10.7793 2.9594 10.1858 2.9594 9.81777 3.32741L2.98906 10.1561C2.85316 10.292 2.75883 10.456 2.71155 10.6354L1.92655 13.6596C1.88112 13.8302 1.8964 14.0081 1.9707 14.1683C2.04501 14.3284 2.17468 14.4629 2.33755 14.5527L5.25328 16.4266C5.44083 16.536 5.66352 16.5505 5.87255 16.4653C6.08159 16.3801 6.24088 16.2054 6.30669 15.9935L8.58848 8.0249L3.97961 11.9035Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    </Link>
                                    <button
                                        className="hover:text-primary"
                                        onClick={() => handleDelete(cabang.id)}
                                    >
                                        {/* Icon Delete */}
                                        <svg
                                            className="fill-current"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21921C3.75765 2.47502 3.5116 2.72206 3.5116 3.18362C3.5116 3.64518 3.75765 3.89222 4.21921 3.89222H5.14632L5.43321 15.0201C5.47393 16.1878 6.41599 17.115 7.58265 17.115H10.3165C11.4788 17.115 12.4294 16.1878 12.4739 15.0201L12.7576 3.89222H13.7197C14.1813 3.89222 14.4273 3.64518 14.4273 3.18362C14.4273 2.72206 14.1813 2.47502 13.7535 2.47502ZM9.67929 15.0834H8.32071C8.1187 15.0834 7.92823 14.9545 7.86712 14.7584C7.81057 14.5908 7.88763 14.407 8.05141 14.2835L9.08566 13.1704C9.25762 13.0365 9.50262 13.0365 9.67457 13.1704L10.7088 14.2835C10.8725 14.407 10.9497 14.5908 10.8931 14.7584C10.8321 14.9545 10.6416 15.0834 10.4396 15.0834H9.67929Z"
                                                fill=""
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center p-5">
                        <p className="text-black dark:text-white">No data available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableFive;
