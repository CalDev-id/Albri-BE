import React, { useState, useEffect } from "react";

const Page = ({ latestNews }) => {
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);

  // Jika tidak ada berita, tampilkan pesan
  if (!latestNews || latestNews.length === 0) {
    return (
      <section className="w-full min-h-screen font-Geologica px-10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Tidak Ada Berita Acara</h2>
          <p className="text-gray-500">Belum ada berita acara yang ditampilkan saat ini</p>
        </div>
      </section>
    );
  }

  const slides = latestNews;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setReadMore(false); // reset baca selengkapnya saat slide berganti
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[index];
  const shortContent =
    currentSlide.content && currentSlide.content.length > 120
      ? currentSlide.content.substring(0, 120) + "..."
      : currentSlide.content || "";

  const handleReadMore = () => {
    // Redirect ke halaman detail berita acara
    window.location.href = `/berita-acara/${currentSlide.slug}`;
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
    setReadMore(false);
  };

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setReadMore(false);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setReadMore(false);
  };

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
              onError={(e) => {
                console.log('Image failed to load:', slide.image);
                e.target.src = `https://picsum.photos/1600/800?random=${i + 1}`;
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

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
              onClick={handleReadMore}
              className="bg-white text-black px-4 py-2 rounded-xl shadow hover:bg-gray-200 transition"
            >
              Baca Selengkapnya
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
