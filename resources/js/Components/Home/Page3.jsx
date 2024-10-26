import React from "react";

const Page3 = () => {
    return (
        <div>
            <div
                className="hero min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url(images/AlbriAssets/bg3.svg)",
                }}
            >
                <div className="hero-content text-neutral-content text-center text-white font-Geologica">
                    <div className="max-w-screen-xl mx-auto text-center py-20 md:py-0">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Program pembelajaran ALBRI meliputi
                        </h2>
                        <p className="text-lg mb-10 text-slate-200">
                            Quality Care Involves Accepting Each Child At Their
                            Individual Developmental
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            {/* Pre School Class */}
                            <div className="bg-transparent text-left border-2 border-dashed border-white rounded-lg shadow-lg p-6 md:w-1/3">
                                <div className="mb-4">
                                    <img
                                        src="images/AlbriAssets/count.svg"
                                        alt="Pre School Icon"
                                        className=" w-16"
                                    />
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold mb-2 md:my-5">
                                    Berhitung cepat secepat kalkulator
                                </h3>
                                <p className="text-white text-sm">
                                    At Incredible Kids GFDC, We Believe A Good
                                    Preschool Can Make A Huge Difference In A
                                    Child's Future School Years.
                                </p>
                            </div>

                            {/* Science Class */}
                            <div className="bg-[#ff8500] text-left rounded-lg shadow-lg p-6 text-white md:w-1/3">
                                <div className="mb-4">
                                    <img
                                        src="images/AlbriAssets/book2.svg"
                                        alt="Science Icon"
                                        className=" w-16"
                                    />
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold mb-2">
                                    Membaca tanpa mengeja
                                </h3>
                                <p className="text-sm">
                                    We Use Creative, Educational, And Fun
                                    Enrichment Activities To Keep Our Children
                                    Engaged In The Learning Process.
                                </p>
                            </div>

                            {/* Art Class */}
                            <div className="bg-transparent border-2 border-white border-dashed text-left rounded-lg shadow-lg p-6 md:w-1/3">
                                <div className="mb-4">
                                    <img
                                        src="images/AlbriAssets/school.svg"
                                        alt="Art Icon"
                                        className="w-16"
                                    />
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold mb-2">
                                    Mata Pelajaran Sekolah
                                </h3>
                                <p className="text-white text-sm">
                                    We Provide A Warm, Welcoming Environment
                                    Where Your Baby Grows From A Bundle Of Joy
                                    To A Bundle Of Curiosity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page3;
