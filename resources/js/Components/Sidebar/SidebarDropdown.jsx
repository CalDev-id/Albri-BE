import React from "react";
import { Link } from "@inertiajs/react"; // Inertia.js Link
import { usePage } from "@inertiajs/react"; // Import usePage to access the current page

const SidebarDropdown = ({ item }) => {
  const { url } = usePage(); // Use Inertia.js to get the current URL

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {item.map((dropdownItem, index) => (
        <li key={index}>
          <Link
            href={dropdownItem.route} // Use `href` for Inertia.js links
            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
              url === dropdownItem.route ? "text-white" : ""
            }`}
          >
            {dropdownItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;

