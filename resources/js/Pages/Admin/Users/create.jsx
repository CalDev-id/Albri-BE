import React from "react";
import { usePage } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon
import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';



const createUsers = () => {
    const{data, setData, post, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: '',
    });

    const handlesubmit = (e) => {
        e.preventDefault();
        post('/admin/users');
    };

    const handleRoleChange = (e) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setData('roles', value);
    };

    return (

        <DefaultLayout>
        <h1> Add User</h1>


        <form onSubmit={handlesubmit}>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter name"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter email"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter password"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>  

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Password Confirmation
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Enter password confirmation"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}

                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Role
                        </label>
                        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="form-group">
            <strong>Role:</strong>
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
          </div>
        </div>


                        <input
                            type="text"
                            value={data.roles}
                            onChange={(e) => setData('roles', e.target.value)}
                            placeholder="Enter role"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.roles && <div className="text-red-500">{errors.roles}</div>}    

                        </div>

                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                        Add User
                    </button>

                </div> 
                </div>

                 
        </form>
    

        </DefaultLayout>
    );
    
}
export default createUsers;