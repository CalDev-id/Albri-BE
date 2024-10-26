const Page5 = () => {
    return (
        <div>
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
                            src="images/AlbriAssets/kegiatan.jpg"
                            alt="Learn to Read"
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Learn To Read And Write For Toddlers
                        </h3>
                        <p className="text-gray-600 mb-4">
                            At Incredible Kids GFDC, we believe early reading
                            skills are important for a strong future.
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                                190 Students
                            </span>
                            <span className="flex items-center text-yellow-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 17.25l6.16 3.243-1.18-6.885 5.015-4.882-6.927-1.006L12 2.25 9.927 7.72l-6.927 1.006 5.015 4.882-1.18 6.885L12 17.25z"
                                    />
                                </svg>
                                4.9
                            </span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src="images/AlbriAssets/kegiatan.jpg"
                            alt="Geography Class"
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Knowledge of Earth and World Geography
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Engage students in learning geography and its
                            importance in today’s world.
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                                190 Students
                            </span>
                            <span className="flex items-center text-yellow-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 17.25l6.16 3.243-1.18-6.885 5.015-4.882-6.927-1.006L12 2.25 9.927 7.72l-6.927 1.006 5.015 4.882-1.18 6.885L12 17.25z"
                                    />
                                </svg>
                                4.9
                            </span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src="images/AlbriAssets/kegiatan.jpg"
                            alt="Creativity Class"
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            The Level of Creativity and Student Activity
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Foster creativity and encourage activity-based
                            learning for young minds.
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                                190 Students
                            </span>
                            <span className="flex items-center text-yellow-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 17.25l6.16 3.243-1.18-6.885 5.015-4.882-6.927-1.006L12 2.25 9.927 7.72l-6.927 1.006 5.015 4.882-1.18 6.885L12 17.25z"
                                    />
                                </svg>
                                4.9
                            </span>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Page5;