import React, { useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

const EditCabang = () => {
    const { laporanMitra, paketMitra } = usePage().props;

    // Prepare initial paket data from existing laporan
    const initialPakets = {};
    laporanMitra.pakets?.forEach(paket => {
        initialPakets[paket.id] = paket.pivot?.jumlah || 0;
    });

    const { data, setData, put, errors } = useForm({
        hari: laporanMitra.hari,
        tanggal: laporanMitra.tanggal,
        pakets: initialPakets, // { paket_id: jumlah }
        daftar: laporanMitra.daftar,
        modul: laporanMitra.modul,
        kaos: laporanMitra.kaos,
        kas: laporanMitra.kas,
        lainlain: laporanMitra.lainlain,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/laporan/mitra/${laporanMitra.id}`);
    };

    const handleChangePaket = (id, value) => {
        setData("pakets", { ...data.pakets, [id]: value });
    };

    return (
        <DefaultLayout>
            <Head title="Edit Laporan Pemasukan Mitra" />
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit Laporan Pemasukan Mitra
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            {/* Hari & Tanggal */}
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
                                        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((h) => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded border px-3 py-2"
                                        value={data.tanggal}
                                        onChange={(e) => setData("tanggal", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Dynamic Paket */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Paket
                                </label>
                                {paketMitra && paketMitra.map((paket) => (
                                    <div key={paket.id} className="mb-3">
                                        <label className="block text-sm text-black dark:text-white">
                                            {paket.nama_paket} (Rp {parseInt(paket.harga).toLocaleString('id-ID')})
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={data.pakets[paket.id] || ""}
                                            onChange={(e) =>
                                                handleChangePaket(paket.id, e.target.value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Biaya lain */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Pendaftaran
                                        </label>
                                        <input
                                            type="number"
                                            value={data.daftar}
                                            onChange={(e) => setData("daftar", e.target.value)}
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
                                            type="number"
                                            value={data.modul}
                                            onChange={(e) => setData("modul", e.target.value)}
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
                                            type="number"
                                            value={data.kaos}
                                            onChange={(e) => setData("kaos", e.target.value)}
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
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <div className="w-full">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Lain Lain
                                        </label>
                                        <input
                                            type="number"
                                            value={data.lainlain}
                                            onChange={(e) => setData("lainlain", e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditCabang;
