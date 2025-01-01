import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ChapterCard({ chapter }) {

    useEffect(() => {
        console.log(chapter.chapterIndex, "=> ", chapter);
    }, []);

    const randomInteger = Math.floor(Math.random() * (5 - 2 + 1)) + 2;

    function convertToDateFormat(dateString) {
        // Create a Date object from the ISO string
        const date = new Date(dateString);

        // Get day, month and year
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        const year = date.getFullYear();

        // Return formatted date as dd/mm/yyyy
        return `${day}/${month}/${year}`;
    }

    return (
        <Link to={`/view-manga/${chapter.manga.bookID}`} className="w-full max-w-sm bg-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
                className="rounded-t-lg w-full h-[200px] object-cover"  // Ensure the image covers 75% of the card height
                src={chapter.manga.poster}
                alt={chapter.chapterIndex}
            />
            <div className="w-[240px] h-[120px] px-3 py-2 bg-gray-300 rounded-b-lg dark:bg-gray-800">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {chapter.manga.name}
                    </h5>
                    <h5 className="text-l font-semibold tracking-tight text-gray-400 dark:text-white">
                        Chapter {chapter.chapterIndex} - {convertToDateFormat(chapter.dateUpdate)}
                    </h5>
                </a>
                <div className="flex items-center mt-1 mb-1">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 ${index < randomInteger ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {10}
                    </span>
                </div>
            </div>
        </Link>
    );
}
