import React from "react";
// import { Link } from "react-router-dom"; // Change import to React Router for navigation
// import Image from "next/image"; // You can replace this with standard <img> tag in React, or keep if you use next/image for static images
import { Link } from "@inertiajs/react";

const chatData = [
    {
        avatar: "/images/user/user-01.png",
        name: "Devid Heilo",
        text: "Math Mentor",
        address: "1234 Main St",
        phone: "123-456-7890",
        email: "devid@example.com",
    },
    {
        avatar: "/images/user/user-02.png",
        name: "Henry Fisher",
        text: "Philosophy Mentor",
        address: "5678 Elm St",
        phone: "987-654-3210",
        email: "henry@example.com",
    },
    {
        avatar: "/images/user/user-04.png",
        name: "Jhon Doe",
        text: "Religion Mentor",
        address: "9101 Oak St",
        phone: "555-666-7777",
        email: "jhon@example.com",
    },
    {
        avatar: "/images/user/user-05.png",
        name: "Jane Doe",
        text: "Physics Mentor",
        address: "1213 Pine St",
        phone: "888-999-0000",
        email: "jane@example.com",
    },
    {
        avatar: "/images/user/user-01.png",
        name: "Jhon Doe",
        text: "Art Mentor",
        address: "1415 Cedar St",
        phone: "222-333-4444",
        email: "artjhon@example.com",
    },
    {
        avatar: "/images/user/user-03.png",
        name: "Jhon Doe",
        text: "Biology Mentor",
        address: "1617 Maple St",
        phone: "444-555-6666",
        email: "biojhon@example.com",
    },
];

const UsersTable = ({ userData }) => {
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
                Users
            </h4>

            <div>
                {userData.data.map((user, index) => (
                    <tr key={user.id}>
                        {/* <td className="border px-4 py-2">{userData.from + index}</td> */}
                        {/* <td className="border px-4 py-2">{user.name}</td> */}
                        {/* <td className="border px-4 py-2">{user.email}</td> */}
                        {/* <td className="border px-4 py-2">  {user.roles.map(role => (
                        <span key={role.id} >
                            {role.name}
                        </span>
                    ))}</td> */}
                        <Link
                            to="/" // Use 'to' instead of 'href' for React Router
                            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
                        >
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-800">
                                <h1 className="text-2xl font-bold text-gray-200">
                                    {user.name.charAt(0)}
                                </h1>
                            </div>

                            <div className="flex flex-1 items-center justify-between">
                                <div>
                                    <h5 className="font-medium text-black dark:text-white">
                                        {user.name}
                                    </h5>
                                    <p>
                                        <span className="text-sm text-black dark:text-white">
                                            {user.roles.map((role) => (
                                                <span key={role.id}>
                                                    {role.name}
                                                </span>
                                            ))}
                                        </span>
                                        {/* <span className="text-xs"> . {chat.time} min</span> */}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </tr>
                ))}
            </div>
        </div>
    );
};

export default UsersTable;
