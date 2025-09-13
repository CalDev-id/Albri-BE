import React from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Link } from "@inertiajs/react";

const AdminPaket = () => {
    const { pakets } = usePage().props;



    return (
        <DefaultLayout>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="flex justify-between px-7.5 mb-6">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      Paket Harga Cabang
    </h4>
    <Link href="/admin/laporan/cabang/paket/create">
      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
        Tambah Paket Harga
      </button>
    </Link>
  </div>

        <div className="overflow-x-auto">
            <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">No</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Name</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Harga</th>
                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>

                </tr>
            </thead>
            <tbody>
                {pakets.map((paket, index) => (
                <tr key={paket.id} className="border-b border-stroke dark:border-strokedark">
                    <td className="py-4 px-4 pl-10 text-sm text-black dark:text-white">
                    {index + 1}
                    </td>
                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                    {paket.nama_paket}
                    </td>
                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                    {paket.harga}
                    </td>
                    <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    {/* <Link href={'/admin/users/{id}/edit'}>
                      <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link> */}
                    <Link href={`/admin/laporan/cabang/paket/${paket.id}/edit`}>
                      <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                    </Link>


                    <Link 
                    href={`/admin/cabang/${paket.id}`}
                    method="delete"
                    as="button"
                    data={{ id: paket.id }}
                    onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this user?')) {
                        e.preventDefault();
                        }
                    }
                    }
                        >
                      <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                    </Link>
                  </div>
                </td>
                </tr>
                ))}
            </tbody>
            
           
               
            </table>
        </div>
        </div>

        

        </DefaultLayout>
    );

}
export default AdminPaket;