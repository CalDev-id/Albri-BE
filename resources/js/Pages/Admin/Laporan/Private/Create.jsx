import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";

const Laporan = () => {
    const { paketPrivates } = usePage().props; // Dynamic pakets from backend

    const { data, setData, post, errors } = useForm({
        hari: "Senin",
        tanggal: "",
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
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Hari
                                    </label>
                                    <select
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={data.hari}
                                        onChange={(e) => setData("hari", e.target.value)}
                                    >
                                        <option value="Senin">Senin</option>
                                        <option value="Selasa">Selasa</option>
                                        <option value="Rabu">Rabu</option>
                                        <option value="Kamis">Kamis</option>
                                        <option value="Jumat">Jumat</option>
                                        <option value="Sabtu">Sabtu</option>
                                        <option value="Minggu">Minggu</option>
                                    </select>
                                    {errors.hari && <div className="text-red-500 text-sm mt-1">{errors.hari}</div>}
                                </div>
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={data.tanggal}
                                        onChange={(e) => setData("tanggal", e.target.value)}
                                        placeholder="Select date"
                                    />
                                    {errors.tanggal && <div className="text-red-500 text-sm mt-1">{errors.tanggal}</div>}
                                </div>
                            </div>

                            {/* Dynamic Paket Pricing Section */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Paket Harga (Jumlah Siswa)
                                </label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {paketPrivates && paketPrivates.map((paket) => (
                                        <div key={paket.id}>
                                            <label className="mb-2 block text-sm text-black dark:text-white">
                                                {paket.nama_paket} - Rp {paket.harga.toLocaleString()}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.pakets[paket.id] || ""}
                                                onChange={(e) => handleChangePaket(paket.id, e.target.value)}
                                                placeholder="Jumlah siswa"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            {errors[`pakets.${paket.id}`] && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors[`pakets.${paket.id}`]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {/* Total Biaya Display */}
                                <div className="mt-3 rounded border border-stroke bg-gray-2 px-4 py-3 dark:border-strokedark dark:bg-meta-4">
                                    <p className="text-sm font-medium text-black dark:text-white">
                                        Total Biaya Paket: Rp {totalBiaya.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Biaya Lainnya Section */}
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Biaya Lainnya
                                </label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm text-black dark:text-white">
                                            Pendaftaran
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.daftar}
                                            onChange={(e) => handleNumberChange("daftar", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.daftar && <div className="text-red-500 text-sm mt-1">{errors.daftar}</div>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm text-black dark:text-white">
                                            Modul
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.modul}
                                            onChange={(e) => handleNumberChange("modul", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.modul && <div className="text-red-500 text-sm mt-1">{errors.modul}</div>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm text-black dark:text-white">
                                            Kaos
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.kaos}
                                            onChange={(e) => handleNumberChange("kaos", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.kaos && <div className="text-red-500 text-sm mt-1">{errors.kaos}</div>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm text-black dark:text-white">
                                            Kas
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.kas}
                                            onChange={(e) => handleNumberChange("kas", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.kas && <div className="text-red-500 text-sm mt-1">{errors.kas}</div>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm text-black dark:text-white">
                                            Lain Lain
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.lainlain}
                                            onChange={(e) => handleNumberChange("lainlain", e.target.value)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.lainlain && <div className="text-red-500 text-sm mt-1">{errors.lainlain}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Total Pemasukan Display */}
                            <div className="mb-4.5">
                                <div className="rounded border border-stroke bg-primary/10 px-4 py-3 dark:border-strokedark dark:bg-primary/20">
                                    <p className="text-lg font-semibold text-primary dark:text-white">
                                        Total Pemasukan: Rp {totalPemasukan.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3">
                                <Link
                                    href="/admin/laporan/private"
                                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Laporan;
