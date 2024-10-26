import React from "react";

const Map = () => {
    return (
        <div className="py-20 container mx-auto">
            {/* Title */}
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 md:my-10">Lokasi Cabang</h2>
            
            {/* Container for Map and Info */}
            <div className="flex flex-col md:flex-row justify-center gap-10">
                
                {/* Map Section */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253037.1877948854!2d109.72534059453125!3d-7.714655299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aebf547170f6d%3A0xe4f15188193cc331!2sRumah%20Belajar%20ALBRI%20Purworejo!5e0!3m2!1sen!2sid!4v1729068651072!5m2!1sen!2sid"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-96"
                    ></iframe>
                </div>
                
                {/* Information Section */}
                <div className="flex flex-col justify-center md:w-1/2">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Yayasan Pendidikan Albri</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Jl. Jend. Sudirman No. 1, Purworejo, Jawa Tengah 54111
                    </p>
                    
                    {/* Additional Info */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Kontak Kami</h3>
                        <p className="text-gray-600">Telp: (0275) 123456</p>
                        <p className="text-gray-600">Email: info@albrifoundation.org</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Jam Operasional</h3>
                        <p className="text-gray-600">Senin - Jumat: 08:00 - 16:00</p>
                        <p className="text-gray-600">Sabtu: 08:00 - 12:00</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Deskripsi</h3>
                        <p className="text-gray-600">
                            Yayasan Pendidikan Albri berkomitmen untuk memberikan pendidikan terbaik
                            kepada anak-anak di Purworejo dan sekitarnya. Dengan fasilitas yang lengkap
                            dan tenaga pengajar yang berpengalaman, kami hadir untuk membantu anak-anak
                            mencapai potensi terbaik mereka.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;
