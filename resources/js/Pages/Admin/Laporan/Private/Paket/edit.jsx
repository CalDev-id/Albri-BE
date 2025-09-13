import { useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Edit({ paketPrivate }) {
    const { data, setData, put, errors } = useForm({
        nama_paket: paketPrivate.nama_paket,
        harga: paketPrivate.harga,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("paketprivate.update", paketPrivate.id));
    };

    return (
        <DefaultLayout>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-7.5 mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Edit Paket Harga Private
                    </h4>
                </div>

                <form onSubmit={submit} className="px-7.5">
                    <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Nama Paket
                        </label>
                        <input
                            type="text"
                            value={data.nama_paket}
                            onChange={(e) => setData("nama_paket", e.target.value)}
                            placeholder="Enter package name"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.nama_paket && <div className="text-red-500 text-sm mt-1">{errors.nama_paket}</div>}
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Harga
                        </label>
                        <input
                            type="number"
                            value={data.harga}
                            onChange={(e) => setData("harga", e.target.value)}
                            placeholder="Enter price"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.harga && <div className="text-red-500 text-sm mt-1">{errors.harga}</div>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <a
                            href="/admin/laporan/private/paket"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}
