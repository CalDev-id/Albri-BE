import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

const MitraDashboard = ({ mitras: initialMitras }) => {
    const [mitras, setMitras] = useState(initialMitras);

    const fetchMitras = () => {
        fetch('/mitras')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMitras(data);
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    useEffect(() => {
        // Ambil data mitra saat pertama kali komponen di-render
        fetchMitras();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this mitra?")) {
            fetch(`/mitras/${id}`, {
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
                // Mengupdate state mitras untuk menghapus mitra yang telah dihapus
                setMitras(prevMitras => prevMitras.filter(mitra => mitra.id !== id));
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
                    Mitra Dashboard
                </h4>
                <Link href="/mitra/create">
                    <button className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90">
                        Add Mitra
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
                            Contact
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Email
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Joined Date
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {/* Data Rows */}
                {Array.isArray(mitras) && mitras.length > 0 ? (
                    mitras.map((mitra, index) => (
                        <div
                            className={`grid grid-cols-3 sm:grid-cols-5 ${
                                index === mitras.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                            }`}
                            key={mitra.id}
                        >
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-800">
                                    <h1 className="text-2xl font-bold text-gray-200">
                                        {mitra.name.charAt(0).toUpperCase()}{" "}
                                    </h1>
                                </div>
                                <p className="hidden text-black dark:text-white sm:block">
                                    {mitra.name}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">
                                    {mitra.phone}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-3">
                                    {mitra.email}
                                </p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="text-red dark:text-white">
                                    {mitra.joined_date}
                                </p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <div className="flex items-center space-x-3.5">
                                    <Link href={`/mitra/${mitra.id}/edit`}>
                                        <button className="hover:text-primary">
                                            {/* Icon Edit */}
                                           edit
                                        </button>
                                    </Link>
                                    <button
                                        className="hover:text-primary"
                                        onClick={() => handleDelete(mitra.id)}
                                    >
                                        {/* Icon Delete */}
                                      delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4">No Mitras found.</div>
                )}
            </div>
        </div>
    );
};

export default MitraDashboard;
