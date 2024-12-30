import React, { useEffect, useState } from 'react';
import api from '../../../../api/AxiosConfig';
import { Link } from 'react-router-dom';

export default function Carousel() {
    const [carouselData, setCarouselData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchCarousel = async () => {
            try {
                const response = await api.get('/api/manga/get-top-5');
                setCarouselData(response.data.data);
                console.log(carouselData)
            } catch (err) {
                setError("Failed to fetch carousel data.");
            } finally {
                setLoading(false);
            }
        };
        fetchCarousel();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div id="indicators-carousel" className="relative w-full" data-carousel="static">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {carouselData.map((item, index) => (
                    <Link
                        to={`/view-manga/${item.bookID}`}
                        key={index}
                        className={`duration-700 ease-in-out ${activeIndex === index ? 'block' : 'hidden'}`}
                    >
                        {/* Gradient Overlays (left and right) */}
                        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-50 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-50 z-10"></div>

                        {/* Carousel Image */}
                        <img
                            src={item.poster || '/default-image.jpg'}
                            alt={item.name}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-0"
                        />

                        {/* Gradient Overlay at the Bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-10"></div>

                        {/* Text Overlay at the Bottom Left */}
                        <div className="absolute bottom-5 left-5 z-20 text-white">
                            <h2 className="text-2xl font-bold">{item.name}</h2>
                            <p className="text-sm">{item.detail}</p>
                        </div>
                    </Link>
                ))}
            </div>


            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                {carouselData.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        aria-current={activeIndex === index ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                    ></button>
                ))}
            </div>
            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handlePrev}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handleNext}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}
