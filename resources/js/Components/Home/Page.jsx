import React, { useState, useEffect } from "react";

const slides = [
  {
    image: "https://picsum.photos/id/1018/1600/800",
    title: "Belajar React Carousel",
    date: "09 September 2025",
    author: "Kyasa Izumi",
    content:
      "Ini adalah contoh konten panjang yang akan dipotong agar tidak terlalu memenuhi layar. Dengan begitu user bisa klik tombol baca selengkapnya untuk melihat detail konten secara lengkap.",
  },
  {
    image: "https://picsum.photos/id/1015/1600/800",
    title: "Tips Belajar Pemrograman",
    date: "08 September 2025",
    author: "Admin",
    content:
      "Pemrograman itu menyenangkan kalau kita tahu cara belajarnya. Mulailah dari project kecil, lalu kembangkan seiring berjalannya waktu.",
  },
  {
    image: "https://picsum.photos/id/1019/1600/800",
    title: "Tutorial Tailwind CSS",
    date: "05 September 2025",
    author: "Tim Albri",
    content:
      "Tailwind CSS memudahkan kita membuat UI modern dengan cepat tanpa menulis banyak CSS manual. Yuk pelajari lebih dalam tentang utility-first framework ini.",
  },
];

const Page = () => {
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setReadMore(false); // reset baca selengkapnya saat slide berganti
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[index];
  const shortContent =
    currentSlide.content.length > 120
      ? currentSlide.content.substring(0, 120) + "..."
      : currentSlide.content;

  return (
    <section className="w-full min-h-screen font-Geologica px-10">
      <div className="relative w-full h-screen overflow-hidden rounded-2xl">
        {/* Slider */}
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <img
              key={i}
              src={slide.image}
              alt={slide.title}
              className="w-full h-screen object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Overlay konten */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="text-white max-w-2xl px-6 md:px-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {currentSlide.title}
            </h2>
            <p className="text-sm mb-2">
              {currentSlide.date} • Oleh {currentSlide.author}
            </p>
            <p className="text-lg mb-4">
              {readMore ? currentSlide.content : shortContent}
            </p>
            <button
              onClick={() => setReadMore(!readMore)}
              className="bg-white text-black px-4 py-2 rounded-xl shadow hover:bg-gray-200 transition"
            >
              {readMore ? "Tutup" : "Baca Selengkapnya"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
