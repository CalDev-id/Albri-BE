import React from "react";

const Hero = () => {
    return (
        <>
            <section className="bg-[#4bb0b2] relative min-h-screen max-h-screen overflow-hidden pt-20 md:pt-0">
                <div className="container md:mx-auto md:flex relative z-10">
                    <div className="md:min-w-1/2 w-full justify-center md:justify-end md:hidden flex -mt-20">
                        <img
                            className="md:w-full w-3/4 z-0"
                            src="images/AlbriAssets/anak.svg"
                            alt="Anak Hero"
                        />
                    </div>
                    <div className="md:min-w-1/2 w-full flex flex-col justify-center md:pr-8">
                        <h1 className="text-white md:text-[70px]  text-3xl font-bold leading-tight font-Geologica">
                            Yayasan Bimbingan Anak Prestasi Indonesia
                        </h1>
                        <p className="text-white mt-4 font-Geologica">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolorum fugiat unde minus explicabo? Dolorum
                            neque officiis assumenda maxime sunt repudiandae!
                        </p>
                        <button className="btn bg-[#16023f] text-white border-none font-Geologica font-semibold rounded-full px-10 mt-6 w-fit">
                            Gabung Sekarang
                        </button>
                    </div>
                    <div className="md:min-w-1/2 w-full  justify-center md:justify-end md:flex hidden">
                        <img
                            className="md:w-full w-3/4 z-0"
                            src="images/AlbriAssets/anak.svg"
                            alt="Anak Hero"
                        />
                    </div>
                </div>
                <img
                    className="w-full absolute md:-bottom-10 left-0 bottom-0 z-10"
                    src="images/AlbriAssets/wave.svg"
                    alt="Wave Background"
                />
            </section>
        </>
    );
};

export default Hero;
