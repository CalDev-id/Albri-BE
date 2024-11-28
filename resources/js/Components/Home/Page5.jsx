const Page5 = () => {
    return (
        <div id="gallery">
            <div>
                <div
                    className="hero min-h-screen bg-cover bg-center"
                    style={{
                        backgroundImage: "url(images/AlbriAssets/page5.svg)",
                    }}
                >
                    <div className="hero-content text-neutral-content text-center text-white font-Geologica">
                        <div className="max-w-screen-xl mx-auto text-center py-20 md:py-0">
                            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-10">
                                Galery Kegiatan Siswa
                            </h2>
                            {/* <p className="text-lg mb-10 text-slate-200">
                            Quality Care Involves Accepting Each Child At Their
                            Individual Developmental
                        </p> */}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Card 1 */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <img
                                        src="images/AlbriAssets/gallery1.png"
                                        alt="Learn to Read"
                                        className="w-full h-60 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Sertifikat Anak Bintang Indonesia
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Sertifikat penghargaan ini diberikan
                                        kepada siswa yang telah menunjukkan
                                        pencapaian luar biasa dalam membaca dan
                                        belajar.
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <img
                                        src="images/AlbriAssets/galery2.png"
                                        alt="Geography Class"
                                        className="w-full h-60 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Sertifikat Anak Bintang Indonesia
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Penghargaan ini diberikan kepada siswa
                                        yang berprestasi
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <img
                                        src="images/AlbriAssets/gallery3.png"
                                        alt="Creativity Class"
                                        className="w-full h-60 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Sertifikat Anak Bintang Indonesia
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Sertifikat ini menghormati kreativitas
                                        siswa dalam mengekspresikan ide dan
                                        inovasi mereka.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Legalitas */}
                <h1 id="legal"  className="flex text-center items-center justify-center text-4xl font-semibold pt-10">
                    Legalitas
                </h1>
                <div className="flex w-full flex-col lg:flex-row md:px-50 md:py-20">
                    <div className="rounded-box grid flex-grow place-items-center">
                        <img src="images/AlbriAssets/lisensi1.png" alt="" />
                    </div>

                    <div className="rounded-box grid flex-grow place-items-center">
                        <img src="images/AlbriAssets/lisensi1.png" alt="" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page5;
