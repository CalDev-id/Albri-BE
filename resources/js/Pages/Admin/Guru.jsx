import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';import { Link } from "@inertiajs/react";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Privat = () => {
    const { privateData } = usePage().props;
    return (
        <DefaultLayout>
             <div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="flex justify-between px-7.5 mb-6">
    <h4 className="text-xl font-semibold text-black dark:text-white">
      Users
    </h4>
    <Link href="/admin/users/create">
      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
        Tambah User
      </button>
    </Link>
  </div>

  <div className="overflow-x-auto">
            <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">No</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Name</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Email</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Role</th>
                <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>

                </tr>
            </thead>
            <tbody>
                {privateData.data.map((user, index) => (
                <tr key={user.id} className="border-b border-stroke dark:border-strokedark">
                    <td className="py-4 px-4 pl-10 text-sm text-black dark:text-white">
                    {privateData.from + index}
                    </td>
                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                    {user.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                    {user.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-black dark:text-white">
                    {user.roles.map((role) => (
                        <span key={role.id} className="mr-2">
                        {role.name}
                        </span>
                    ))}
                    </td>
                    <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    {/* <Link href={'/admin/users/{id}/edit'}>
                      <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link> */}

                    <Link href={`/admin/users/${user.id}/edit`}>
                    <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                    </Link>


                    <Link 
                     href={`/admin/users/${user.id}`}
                    method="delete"
                    as="button" // Menampilkan Link sebagai tombol
                    data={{ id: user.id }}
                    onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this user?')) {
                        e.preventDefault(); // Mencegah tindakan delete jika user membatalkan konfirmasi
                    }
                    }}
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
        </div>
        </DefaultLayout>
    );
}

export default Privat;