import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const Laporan = () => {
    const { cabangs, pakets } = usePage().props; // props dari backend

    const { data, setData, post } = useForm({
        hari: "Senin",
        tanggal: "",
        cabang_id: cabangs.length > 0 ? cabangs[0].id : "",
        pakets: {}, // { paket_id: jumlah }
        daftar: "",
        modul: "",
        kaos: "",
        kas: "",
        lainlain: "",
    });

    // auto set cabang default
    useEffect(() => {
        if (cabangs.length > 0 && !data.cabang_id) {
            setData((prev) => ({ ...prev, cabang_id: cabangs[0].id }));
        }
    }, [cabangs]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/laporan/cabang/store");
    };

    const handleChangePaket = (id, value) => {
        setData("pakets", { ...data.pakets, [id]: value });
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pemasukan Cabang
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                                        {["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"].map((h) => (
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

                            {/* Cabang */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium">Cabang</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={data.cabang_id}
                                    onChange={(e) => setData("cabang_id", e.target.value)}
                                >
                                    {cabangs.map((c) => (
                                        <option key={c.id} value={c.id}>{c.nama}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Dynamic Paket */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium">Paket</label>
                                {pakets.map((paket) => (
                                    <div key={paket.id} className="mb-3">
                                        <label className="block text-sm text-black">
                                            {paket.nama_paket} (Rp {paket.harga})
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full rounded border px-3 py-2"
                                            value={data.pakets[paket.id] || ""}
                                            onChange={(e) =>
                                                handleChangePaket(paket.id, e.target.value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Biaya lain */}
                            <div className="grid grid-cols-2 gap-4">
                                {["daftar","modul","kaos","kas","lainlain"].map((field) => (
                                    <div key={field}>
                                        <label className="block mb-2 capitalize">{field}</label>
                                        <input
                                            type="number"
                                            value={data[field]}
                                            onChange={(e) => setData(field, e.target.value)}
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
