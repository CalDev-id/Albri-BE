import React from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useForm, Link } from "@inertiajs/react";

const Create = () => {
    const { data, setData, post, errors } = useForm({
        nama_paket: "",
        harga: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/laporan/mitra/setting-harga/store");
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Tambah Paket Mitra
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Nama Paket <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_paket}
                                    onChange={(e) => setData("nama_paket", e.target.value)}
                                    placeholder="Masukkan nama paket"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                {errors.nama_paket && (
                                    <div className="text-meta-1 text-sm mt-1">
                                        {errors.nama_paket}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Harga <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.harga}
                                    onChange={(e) => setData("harga", e.target.value)}
                                    placeholder="Masukkan harga paket"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                {errors.harga && (
                                    <div className="text-meta-1 text-sm mt-1">
                                        {errors.harga}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                >
                                    Simpan Paket
                                </button>
                                <Link
                                    href="/admin/laporan/mitra/setting-harga"
                                    className="flex w-full justify-center rounded border border-stroke p-3 font-medium text-black hover:bg-opacity-90 dark:border-strokedark dark:text-white"
                                >
                                    Batal
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Create;
