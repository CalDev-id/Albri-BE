import React from "react";

const Page2 = () => {
    return (
        <section className="container min-h-screen font-Geologica">
        <div className=" flex flex-col md:flex-row px-5 md:px-0 py-10">
            {/* Bagian teks utama */}
            <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-[#16023f] text-3xl md:text-6xl font-bold">
                    Kenapa Harus <br /> Ikut Bimbel Di Albri?
                </h1>
            </div>

            {/* Bagian deskripsi dan fitur */}
            <div className="md:w-1/2">
                <h2 className="text-slate-500 mb-5 text-base md:text-lg">
                    Membangun Kreatifitas dan Kecerdasan melalui pembelajaran
                    yang menyenangkan, interaktif, dan inovatif bersama para
                    tutor yang berpengalaman.
                </h2>
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col md:pr-10">
                        {/* Fitur pertama */}
                        <div className="flex items-center mt-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" fill="#EF4444" />
                                <path
                                    stroke="#ffffff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2l4-4"
                                />
                            </svg>
                            <p className="text-[#16023f] ml-2">
                                Menambah Wawasan
                            </p>
                        </div>

                        {/* Fitur kedua */}
                        <div className="flex items-center mt-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" fill="#EF4444" />
                                <path
                                    stroke="#ffffff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2l4-4"
                                />
                            </svg>
                            <p className="text-[#16023f] ml-2">
                                Bertemu Teman Baru
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {/* Fitur ketiga */}
                        <div className="flex items-center mt-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" fill="#EF4444" />
                                <path
                                    stroke="#ffffff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2l4-4"
                                />
                            </svg>
                            <p className="text-[#16023f] ml-2">
                                Menambah Pengetahuan
                            </p>
                        </div>

                        {/* Fitur keempat */}
                        <div className="flex items-center mt-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" fill="#EF4444" />
                                <path
                                    stroke="#ffffff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2l4-4"
                                />
                            </svg>
                            <p className="text-[#16023f] ml-2">
                                Menambah Kepercayaan Diri
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian gambar */}
            
        </div>
            <div className="container">
            <img src="images/AlbriAssets/81ebb630-4479-45b4-9561-1fdbe3384b0f.jpeg" alt="" />
            </div>
        </section>
    );
};

export default Page2;
