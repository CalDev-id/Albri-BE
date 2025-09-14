import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

const Navbar = ({ method = "get", active, forceBackground = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {  // Ubah angka sesuai dengan tinggi scroll yang kamu inginkan
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`w-full fixed z-[999999999] ${
                forceBackground || isScrolled ? "bg-[#4bb0b2]" : "bg-transparent"
            } transition duration-300 ease-in-out font-Geologica`} // Transisi yang halus saat bg berubah
        >
            <div className="md:container">
                <div className="navbar justify-between">
                    <div className="">
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost lg:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link
                                        href="/"
                                        className={
                                            active === "home"
                                                ? "text-[#EB9928] justify-between active:bg-[#FFCE2E]"
                                                : "justify-between active:bg-[#FFCE2E]"
                                        }
                                        method={method}
                                        as="button"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li tabIndex={0}>
                                    <Link
                                        href="/"
                                        className={
                                            active === "dbcc"
                                                ? "text-[#EB9928] justify-between active:bg-[#FFCE2E]"
                                                : "justify-between active:bg-[#FFCE2E]"
                                        }
                                        method={method}
                                        as="button"
                                    >
                                        Visi-Misi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        method={method}
                                        className={
                                            active === "national"
                                                ? "text-[#EB9928] active:bg-[#FFCE2E]"
                                                : "active:bg-[#FFCE2E]"
                                        }
                                        as="button"
                                    >
                                        Legalitas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        method={method}
                                        className={
                                            active === "guru"
                                                ? "text-[#EB9928] active:bg-[#FFCE2E]"
                                                : "active:bg-[#FFCE2E]"
                                        }
                                        as="button"
                                    >
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/berita-acara"
                                        className={
                                            active === "berita-acara"
                                                ? "text-[#EB9928] active:bg-[#FFCE2E]"
                                                : "active:bg-[#FFCE2E]"
                                        }
                                        as="button"
                                    >
                                        Berita Acara
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <h1 className="text-white font-bold text-2xl font-Geologica">
                            Albri
                        </h1>
                    </div>
                    <div className="">
                        <div className="hidden lg:flex mr-5">
                            <ul className="menu menu-horizontal px-1 font-semibold ">
                                <li>
                                    <Link
                                        href="/"
                                        className={
                                            active === "home"
                                                ? "border-b-2 border-white rounded-none text-white font-bold inline-block pb-2"
                                                : "border-b-2 border-transparent rounded-none text-white inline-block pb-2"
                                        }
                                        method={method}
                                        as="button"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li tabIndex={0}>
                                    <Link
                                        href="#visi"
                                        className={
                                            active === "dbcc"
                                                ? "border-b-2 border-white rounded-none text-white font-bold inline-block pb-2"
                                                : "border-b-2 border-transparent rounded-none text-white inline-block pb-2"
                                        }
                                        method={method}
                                        as="button"
                                    >
                                        Visi-Misi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#legal"
                                        method={method}
                                        className={
                                            active === "national"
                                                ? "border-b-2 border-white rounded-none text-white font-bold inline-block pb-2"
                                                : "border-b-2 border-transparent rounded-none text-white inline-block pb-2"
                                        }
                                        as="button"
                                    >
                                        Legalitas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#gallery"
                                        method={method}
                                        className={
                                            active === "guru"
                                                ? "border-b-2 border-white rounded-none text-white font-bold inline-block pb-2"
                                                : "border-b-2 border-transparent rounded-none text-white inline-block pb-2"
                                        }
                                        as="button"
                                    >
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/berita-acara"
                                        className={
                                            active === "berita-acara"
                                                ? "border-b-2 border-white rounded-none text-white font-bold inline-block pb-2"
                                                : "border-b-2 border-transparent rounded-none text-white inline-block pb-2"
                                        }
                                        as="button"
                                    >
                                        Berita Acara
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        href="/"
                                        method={method}
                                        className={
                                            active === "informasi"
                                                ? "border-b-2 border-white rounded-none text-white font-bold inline-block pb-2"
                                                : "border-b-2 border-transparent rounded-none text-white inline-block pb-2"
                                        }
                                        as="button"
                                    >
                                        Informasi
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>

                    <div className="text-transparent">
                        p
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;