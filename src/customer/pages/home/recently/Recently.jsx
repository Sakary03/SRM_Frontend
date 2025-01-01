import React, { useEffect, useState } from 'react';
import api from "../../../../api/AxiosConfig";
import ChapterCard from '../component/ChapterCard';

export default function Recently() {
    const [listChapter, setListChapter] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchListChapter();
    }, []);

    const fetchListChapter = async () => {
        try {
            const response = await api.get('/api/chapter/get-10-latest');
            console.log("Recently Data: ", response.data.data);
            setListChapter(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const slidesToShow = 4; // Set the number of slides to display at once
    const slideWidth = 100 / slidesToShow; // Calculate each slide's width percentage

    const handleNext = () => {
        if (currentIndex < Math.ceil(listChapter.length / slidesToShow) - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full max-w-[80vw] mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Recently Updated - By Chapter</h1>
            <div className="relative">
                {/* Slider */}
                <div className="flex overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${(slideWidth) * currentIndex}%)`,
                        }}
                    >
                        {listChapter.map((chapter, index) => (
                            <div
                                key={index}
                                className="w-[25%] m-4" // Ensure each card is a quarter of the container width
                            >
                                <ChapterCard chapter={chapter} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentIndex === 0}
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentIndex >= Math.ceil(listChapter.length / slidesToShow) - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
