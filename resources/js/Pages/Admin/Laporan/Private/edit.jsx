import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";

const EditCabang = () => {
    const { laporanprivate, paketPrivates } = usePage().props; // Get both data and dynamic pakets

    // Initialize pakets from existing data or create empty object
    const initializePakets = () => {
        const pakets = {};
        if (laporanprivate.pakets) {
            // If JSON pakets data exists, use it
            return laporanprivate.pakets;
        } else {
            // Convert traditional fields to dynamic structure for backward compatibility
            if (paketPrivates && paketPrivates.length > 0) {
                paketPrivates.forEach(paket => {
                    if (paket.nama_paket === 'Paket 30K') pakets[paket.id] = laporanprivate.biaya_30 || 0;
                    if (paket.nama_paket === 'Paket 35K') pakets[paket.id] = laporanprivate.biaya_35 || 0;
                    if (paket.nama_paket === 'Paket 40K') pakets[paket.id] = laporanprivate.biaya_40 || 0;
                    if (paket.nama_paket === 'Paket 45K') pakets[paket.id] = laporanprivate.biaya_45 || 0;
                });
            }
        }
        return pakets;
    };

    const { data, setData, put, errors } = useForm({
        hari: laporanprivate.hari,
        tanggal: laporanprivate.tanggal,
        pakets: initializePakets(), // Dynamic paket quantities
        daftar: laporanprivate.daftar,
        modul: laporanprivate.modul,
        kaos: laporanprivate.kaos,
        kas: laporanprivate.kas,
        lainlain: laporanprivate.lainlain,
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

        // Ensure all paket values default to 0 if empty
        const processedPakets = {};
        if (paketPrivates && paketPrivates.length > 0) {
            paketPrivates.forEach(paket => {
                processedPakets[paket.id] = parseInt(data.pakets[paket.id]) || 0;
            });
        }

        // Update data with processed pakets before submitting
        const formData = {
            ...data,
            pakets: processedPakets
        };

        put(`/admin/laporan/private/${laporanprivate.id}`, {
            data: formData
        });
    };

    const handleNumberChange = (field, value) => {
        const numValue = parseInt(value) || 0;
        setData(field, numValue);
    };

    const handleChangePaket = (id, value) => {
        setData("pakets", { ...data.pakets, [id]: value });
    };

    // Helper functions for numeric inputs
    const handleNumericFocus = (e) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };

    const handleNumericBlur = (e, field) => {
        if (e.target.value === '' || e.target.value === null || e.target.value === undefined) {
            setData(field, 0);
        }
    };

    const handlePaketNumericFocus = (e) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };

    const handlePaketNumericBlur = (e, paketId) => {
        if (e.target.value === '' || e.target.value === null || e.target.value === undefined) {
            handleChangePaket(paketId, 0);
        }
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit Laporan Pemasukan Private
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
                                            onFocus={handlePaketNumericFocus}
                                            onBlur={(e) => handlePaketNumericBlur(e, paket.id)}
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
                                            onFocus={handleNumericFocus}
                                            onBlur={(e) => handleNumericBlur(e, field)}
                                            className="w-full rounded border px-3 py-2"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="mt-5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
}
export default EditCabang;