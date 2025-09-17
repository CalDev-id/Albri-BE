import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";

const Laporan = () => {
    const { paketPrivates } = usePage().props; // Dynamic pakets from backend

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, errors } = useForm({
        hari: "Senin",
        tanggal: today,
        pakets: {}, // { paket_id: jumlah } - dynamic paket quantities
        daftar: 0,
        modul: 0,
        kaos: 0,
        kas: 0,
        lainlain: 0,
    });

    const [totalBiaya, setTotalBiaya] = useState(0);
    const [totalPemasukan, setTotalPemasukan] = useState(0);

    // Calculate totals whenever form data changes
    useEffect(() => {
        let biayaTotal = 0;

        // Calculate total from dynamic pakets
        if (paketPrivates && paketPrivates.length > 0) {
            paketPrivates.forEach(paket => {
                const jumlah = parseInt(data.pakets[paket.id]) || 0;
                biayaTotal += jumlah * paket.harga;
            });
        }

        const pemasukanTotal = biayaTotal +
            (parseInt(data.daftar) || 0) +
            (parseInt(data.modul) || 0) +
            (parseInt(data.kaos) || 0) +
            (parseInt(data.kas) || 0) +
            (parseInt(data.lainlain) || 0);

        setTotalBiaya(biayaTotal);
        setTotalPemasukan(pemasukanTotal);
    }, [data, paketPrivates]);

    const handlesubmit = (e) => {
        e.preventDefault();
        post("/admin/laporan/private/store");
    };

    const handleNumberChange = (field, value) => {
        const numValue = parseInt(value) || 0;
        setData(field, numValue);
    };

    const handleChangePaket = (id, value) => {
        setData("pakets", { ...data.pakets, [id]: value });
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pemasukan Private
                        </h3>
                    </div>
                    <form onSubmit={handlesubmit}>
                        <div className="p-6.5">
                            {/* Hari & Tanggal */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium">Hari</label>
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
                                    <label className="mb-3 block text-sm font-medium">Tanggal</label>
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
                                <label className="mb-3 block text-sm font-medium">Paket</label>
                                {paketPrivates && paketPrivates.map((paket) => (
                                    <div key={paket.id} className="mb-3">
                                        <label className="block text-sm text-black">
                                            {paket.nama_paket} (Rp {paket.harga.toLocaleString()})
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full rounded border px-3 py-2"
                                            value={data.pakets[paket.id] || 0}
                                            onChange={(e) => handleChangePaket(paket.id, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Biaya lain */}
                            <div className="grid grid-cols-2 gap-4">
                                {["daftar", "modul", "kaos", "kas", "lainlain"].map((field) => (
                                    <div key={field}>
                                        <label className="block mb-2 capitalize">{field}</label>
                                        <input
                                            type="number"
                                            value={data[field]}
                                            onChange={(e) => handleNumberChange(field, e.target.value)}
                                            className="w-full rounded border px-3 py-2"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="mt-5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                            >
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
