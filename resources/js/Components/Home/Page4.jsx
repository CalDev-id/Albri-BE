import React from "react";

const Page4 = () => {
    return (
        <div className="py-40 container">
            <h2 className="text-3xl md:text-4xl font-bold  text-center mb-10">Cabang Albri</h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
                {/* Cabang Kemiri */}
                <div className="bg-transparent text-left border-2 border-dashed border-white rounded-lg shadow-lg p-6 md:w-1/4">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Kemiri</h3>
                    <p className="text-sm text-black">Cabang ini terletak di Pituruh dan mencakup beberapa wilayah di sekitar.</p>
                </div>

                {/* Cabang Pituruh */}
                <div className="bg-[#ff8500] text-left rounded-lg shadow-lg p-6 text-white md:w-1/4">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Pituruh</h3>
                    <p className="text-sm ">
                        Cabang ini terletak di Pituruh dan mencakup beberapa wilayah di sekitar.
                    </p>
                </div>

                {/* Cabang Kutoarjo */}
                <div className="bg-transparent border-2 border-white border-dashed text-left rounded-lg shadow-lg p-6 md:w-1/4">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Kutoarjo</h3>
                    <p className="text-black text-sm">
                        Kutoarjo adalah salah satu cabang utama dengan akses pendidikan yang luas.
                    </p>
                </div>

                {/* Cabang Loano */}
                <div className="bg-[#ff8500] text-left rounded-lg shadow-lg p-6 text-white md:w-1/4">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Loano</h3>
                    <p className="text-sm">
                        Loano adalah cabang yang aktif dalam menyediakan berbagai kegiatan pendidikan.
                    </p>
                </div>

                {/* Cabang Mranti */}
                <div className="bg-transparent border-2 border-white border-dashed text-left rounded-lg shadow-lg p-6 md:w-1/4">
                    <h3 className="text-xl md:text-3xl font-bold mb-2">Mranti</h3>
                    <p className="text-black text-sm">
                        Mranti merupakan salah satu cabang terbaru dengan fasilitas modern.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page4;
