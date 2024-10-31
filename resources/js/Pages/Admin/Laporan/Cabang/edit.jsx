import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const EditCabang = () => {
    const { cabang } = usePage().props
    const{data, setData, put, errors} = useForm({
        nama: cabang.nama,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/cabang/${cabang.id}`);
    };

    return (
        <DefaultLayout>
            <h1>Edit Cabang</h1>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    {/* Input untuk Nama */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            placeholder="Enter name"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.nama && <div className="text-red-500">{errors.nama}</div>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </DefaultLayout>
    );
}
export default EditCabang;