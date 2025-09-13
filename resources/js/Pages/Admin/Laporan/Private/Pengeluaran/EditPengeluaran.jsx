import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const EditCabang = () => {
    const { pengeluaranprivate, users } = usePage().props
    const { data, setData, put, errors } = useForm({
        hari: pengeluaranprivate.hari,
        tanggal: pengeluaranprivate.tanggal,
        gurus: pengeluaranprivate.gurus && pengeluaranprivate.gurus.length > 0
            ? pengeluaranprivate.gurus.map(guru => ({
                guru_id: guru.guru_id || "",
                gaji: guru.gaji || 0
            }))
            : [{ guru_id: "", gaji: 0 }],
        atk: pengeluaranprivate.atk || 0,
        sewa: pengeluaranprivate.sewa || 0,
        thr: pengeluaranprivate.thr || 0,
        intensif: pengeluaranprivate.intensif || 0,
        lisensi: pengeluaranprivate.lisensi || 0,
        lainlain: pengeluaranprivate.lainlain || 0,
    });

    // Tambah input guru baru
    const addGuru = () => {
        setData("gurus", [...data.gurus, { guru_id: "", gaji: 0 }]);
    };

    // Ubah value guru
    const updateGuru = (index, field, value) => {
        const updated = [...data.gurus];
        updated[index][field] = value;
        setData("gurus", updated);
    };

    // Hapus guru
    const removeGuru = (index) => {
        if (data.gurus.length > 1) {
            const updated = data.gurus.filter((_, i) => i !== index);
            setData("gurus", updated);
        }
    };

    // Hitung total gaji
    const getTotalGaji = () => {
        return data.gurus.reduce((total, guru) => total + (parseInt(guru.gaji) || 0), 0);
    };

    // Hitung total pengeluaran
    const getTotalPengeluaran = () => {
        return getTotalGaji() +
            (parseInt(data.atk) || 0) +
            (parseInt(data.sewa) || 0) +
            (parseInt(data.intensif) || 0) +
            (parseInt(data.lisensi) || 0) +
            (parseInt(data.thr) || 0) +
            (parseInt(data.lainlain) || 0);
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        put(`/admin/laporan/pengeluaranprivate/${pengeluaranprivate.id}`);
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Laporan Pengeluaran private
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

                            {/* Dynamic Guru Section */}
                            <div className="mb-4.5">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Guru & Gaji
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addGuru}
                                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                    >
                                        + Tambah Guru
                                    </button>
                                </div>

                                {data.gurus.map((guru, index) => (
                                    <div key={index} className="flex gap-4 mb-3 items-end">
                                        <div className="flex-1">
                                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                Nama Guru {index + 1}
                                            </label>
                                            <input
                                                type="text"
                                                value={guru.guru_id}
                                                onChange={(e) => updateGuru(index, "guru_id", e.target.value)}
                                                placeholder="Masukkan nama guru"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                                Gaji {index + 1}
                                            </label>
                                            <input
                                                type="number"
                                                value={guru.gaji}
                                                onChange={(e) => updateGuru(index, "gaji", parseInt(e.target.value) || 0)}
                                                placeholder="0"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        {data.gurus.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeGuru(index)}
                                                className="bg-red-500 text-white px-3 py-3 rounded hover:bg-red-600"
                                            >
                                                Hapus
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <div className="mt-3 p-3 bg-gray-100 rounded">
                                    <span className="font-medium">Total Gaji: Rp {getTotalGaji().toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                <div className="w-full xl:w-1/2">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            ATK
                                        </label>
                                        <input
                                            type="number"
                                            value={data.atk}
                                            onChange={(e) => setData("atk", parseInt(e.target.value) || 0)}
                                            placeholder="0"
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
                                            type="number"
                                            value={data.intensif}
                                            onChange={(e) => setData("intensif", parseInt(e.target.value) || 0)}
                                            placeholder="0"
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
                                            type="number"
                                            value={data.sewa}
                                            onChange={(e) => setData("sewa", parseInt(e.target.value) || 0)}
                                            placeholder="0"
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
                                            type="number"
                                            value={data.thr}
                                            onChange={(e) => setData("thr", parseInt(e.target.value) || 0)}
                                            placeholder="0"
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
                                            onChange={(e) => setData("lainlain", parseInt(e.target.value) || 0)}
                                            placeholder="0"
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
                                            type="number"
                                            value={data.lisensi}
                                            onChange={(e) => setData("lisensi", parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Total Pengeluaran Display */}
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Pengeluaran</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>Total Gaji: Rp {getTotalGaji().toLocaleString()}</div>
                                    <div>ATK: Rp {(parseInt(data.atk) || 0).toLocaleString()}</div>
                                    <div>Sewa: Rp {(parseInt(data.sewa) || 0).toLocaleString()}</div>
                                    <div>Intensif: Rp {(parseInt(data.intensif) || 0).toLocaleString()}</div>
                                    <div>Lisensi: Rp {(parseInt(data.lisensi) || 0).toLocaleString()}</div>
                                    <div>THR: Rp {(parseInt(data.thr) || 0).toLocaleString()}</div>
                                    <div>Lain-lain: Rp {(parseInt(data.lainlain) || 0).toLocaleString()}</div>
                                </div>
                                <div className="border-t border-blue-300 mt-3 pt-3">
                                    <div className="text-xl font-bold text-blue-900">
                                        TOTAL: Rp {getTotalPengeluaran().toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </DefaultLayout>
    );
}
export default EditCabang;