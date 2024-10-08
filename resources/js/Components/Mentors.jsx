// import Link from "next/link";
import { Link } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icon

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

const ChatTable = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between px-7.5 mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Mentors
        </h4>
        <Link href="/add-mentor">
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
            Tambah Mentor
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white pl-10">Avatar</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Name</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Role</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Address</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Phone</th>
              <th className="py-4 px-4 text-left text-sm font-medium text-black dark:text-white">Email</th>
              <th className="py-4 px-4 text-center text-sm font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chatData.map((chat, key) => (
              <tr key={key} className="border-b border-stroke dark:border-strokedark">
                <td className="py-4 px-4 pl-10">
                  <div className="relative h-14 w-14 rounded-full">
                    {/* <Image
                      width={56}
                      height={56}
                      src={chat.avatar}
                      alt="User"
                      className="rounded-full"
                    /> */}
                    <img className="w-[50px] h-[50px] rounded-full" src={chat.avatar} alt="Logo" />
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-black dark:text-white">{chat.name}</td>
                <td className="py-4 px-4 text-sm text-black dark:text-white">{chat.text}</td>
                <td className="py-4 px-4 text-sm text-black dark:text-white">{chat.address}</td>
                <td className="py-4 px-4 text-sm text-black dark:text-white">{chat.phone}</td>
                <td className="py-4 px-4 text-sm text-black dark:text-white">{chat.email}</td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <Link href={`/view/${key}`}>
                      <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                    <Link href={`/edit/${key}`}>
                      <FaEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" />
                    </Link>
                    <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChatTable;
