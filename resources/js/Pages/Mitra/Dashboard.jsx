import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';


const MitraDashboard = () => {
    const { mitraData } = usePage().props;

    return (
        <DefaultLayout>
            <h1>Mitra Dashboard</h1>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {mitraData.data.map((user, index) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{mitraData.from + index}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                {user.roles.map(role => (
                                    <span key={role.id} >
                                        {role.name}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DefaultLayout>
    );
}   
export default MitraDashboard;
