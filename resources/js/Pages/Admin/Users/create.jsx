import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const CreateUsers = () => {
    const { roles } = usePage().props;  // Mengambil data roles dari props
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/users');
        //  jika berhasil, akan diarahkan ke halaman /admin/users
        

 
    };

    const handleRoleChange = (e) => {
        const options = e.target.options;
        const selectedRoles = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedRoles.push(options[i].value);
            }
        }
        setData('roles', selectedRoles);
    };

    return (
        <DefaultLayout>
            <h1> Add User</h1>
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
                            onChange={(e) => setData('name', e.target.value)}
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
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter email"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    {/* Input untuk Password */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter password"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>  

                    {/* Input untuk Konfirmasi Password */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Password Confirmation
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Enter password confirmation"
                            className="w-full rounded border-[1.5px] px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white focus:border-primary"
                        />
                        {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}
                    </div>

                    {/* Dropdown Roles */}
                    <div className="w-full xl:w-1/2 mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Role
                        </label>
                        <select
                            name="roles"
                            className="form-control"
                            multiple
                            value={data.roles}
                            onChange={handleRoleChange}
                        >
                            {Object.entries(roles).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {errors.roles && <div className="text-red-500">{errors.roles}</div>}
                    </div>

                    {/* Tombol Submit */}
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                        Add User
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default CreateUsers;
