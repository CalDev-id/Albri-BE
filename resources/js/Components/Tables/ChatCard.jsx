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

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Mentors
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            to="/" // Use 'to' instead of 'href' for React Router
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              {/* <Image
                width={56}
                height={56}
                src={chat.avatar}
                alt="User"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              /> */}
              <img className="w-[50px]" src={chat.avatar} alt="" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {chat.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {chat.text}
                  </span>
                  {/* <span className="text-xs"> . {chat.time} min</span> */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
