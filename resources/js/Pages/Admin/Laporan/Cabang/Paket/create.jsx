// import React from "react";
// import { usePage, useForm } from "@inertiajs/react";
// import DefaultLayout from "@/Layouts/DefaultLayout";

// const CreateCabang = () => {
//     const { data, setData, post, errors } = useForm({
//         nama: '',
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post('/admin/cabang');
//         //  jika berhasil, akan diarahkan ke halaman /admin/users
        
//     };
//     return (
//         <DefaultLayout>
//             <h1> Add Cabang</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="p-6.5">
//                     {/* Input untuk Nama */}
//                     <div className="w-full xl:w-1/2 mb-4.5">
//                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                             Name
//                         </label>
//                         <input
//                             type="text"
//                             value={data.nama}
//                             onChange={(e) => setData('nama', e.target.value)}
//                             placeholder="Enter name"
//                             className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
//                         />
//                         {errors.nama && <div className="text-red-500">{errors.nama}</div>}
//                     </div>
//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </DefaultLayout>
//     );
// }
// export default CreateCabang;
// import DefaultLayout from "@/Layouts/DefaultLayout";
import DefaultLayout from "@/Layouts/DefaultLayout";

import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    nama_paket: "",
    harga: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("paket.store"));
  };

  return (
        <DefaultLayout>

    <form onSubmit={submit} className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Paket</h1>

      <div className="mb-3">
        <label>Nama Paket</label>
        <input type="text" value={data.nama_paket} onChange={(e) => setData("nama_paket", e.target.value)} className="border p-2 w-full" />
        {errors.nama_paket && <div className="text-red-500">{errors.nama_paket}</div>}
      </div>

      <div className="mb-3">
        <label>Harga</label>
        <input type="number" value={data.harga} onChange={(e) => setData("harga", e.target.value)} className="border p-2 w-full" />
        {errors.harga && <div className="text-red-500">{errors.harga}</div>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  </DefaultLayout>
  );
}
