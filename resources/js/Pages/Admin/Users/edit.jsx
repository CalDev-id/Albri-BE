import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const EditUsers = () => {
    const { user, roles, userRole } = usePage().props; // Mengambil user, roles, dan userRole dari props
    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        roles: userRole, // Inisialisasi dengan userRole
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const handleRoleChange = (e) => {
        const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
        setData("roles", selectedRoles);
    };

    return (
        <DefaultLayout>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    {/* Input untuk Nama */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter name"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>

                    {/* Input untuk Email */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Enter email"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    {/* Input untuk Role */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Role
                        </label>
                        <select
                            multiple
                            value={data.roles}
                            onChange={handleRoleChange}
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        >
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        {errors.roles && <div className="text-red-500">{errors.roles}</div>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                    Update User
                </button>
            </form>
        </DefaultLayout>
    );
};

export default EditUsers;
