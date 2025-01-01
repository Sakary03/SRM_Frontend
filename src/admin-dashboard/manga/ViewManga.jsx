import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from "../../api/AxiosConfig";
import Navbar from '../component/Navbar';
import { set } from 'react-hook-form';
import chapters from './chapterDataSample';
import { useNavigate } from 'react-router-dom';

export default function ViewManga() {
    const [manga, setManga] = useState({});
    const { bookID } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listChapter, setListChapter] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const fetchManga = async () => {
        try {
            console.log(">> bookID: ", bookID);
            const response = await api.get(`/api/manga/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setManga(response.data.data);
            console.log(manga);
        } catch (err) {
            setError("Failed to fetch manga data.");
        } finally {
            setLoading(false);
        }
    };

    const fecthChapter = async () => {
        try {
            const response = await api.get(`/api/manga/get-chapters/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(">> Response: ", response.data);
            setListChapter(response.data.data);
            chapters.sort((a, b) => a.chapterIndex - b.chapterIndex);
            console.log(">> Chapters:  ", listChapter);
        } catch (err) {
            setError("Failed to fetch Chapter data.");
        } finally {
            setLoading(false);
        }
    }

    // Format Date to DD/MM/YY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and ensure it's 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed)
        const year = date.getFullYear(); // Get the full year

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchManga();
        fecthChapter();
    }, []); // Add empty dependency array to prevent multiple calls

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Fixed colors for each category
    const categoryColorMapping = {
        Action: 'bg-red-500',
        Romance: 'bg-pink-500',
        Fantasy: 'bg-purple-500',
        Comedy: 'bg-yellow-500',
        Horror: 'bg-gray-500',
    };

    const getCategoryColor = (categoryName) => {
        return categoryColorMapping[categoryName] || 'bg-blue-500'; // Default color if not found
    };

    // Sample data for Categories
    const sampleCategory = [
        {
            "name": "Action",
            "description": "Thể loại truyện tranh có nhiều cảnh chiến đấu, hành động gây cấn và kịch tính."
        },
        {
            "name": "Romance",
            "description": "Thể loại tập trung vào câu chuyện tình yêu giữa các nhân vật chính, đầy cảm xúc và tình tiết lãng mạn."
        },
        {
            "name": "Fantasy",
            "description": "Thể loại truyện với các yếu tố kỳ ảo, phép thuật, và thế giới giả tưởng độc đáo."
        },
        {
            "name": "Comedy",
            "description": "Thể loại truyện mang tính chất hài hước, giải trí với những tình huống gây cười thú vị."
        },
        {
            "name": "Horror",
            "description": "Thể loại truyện với các yếu tố kinh dị, bí ẩn, mang lại cảm giác sợ hãi và hồi hộp cho người đọc."
        }
    ];

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover" src={manga.poster} alt="Product Image" />
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{manga.name}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                ante justo. Integer euismod libero id mauris malesuada tincidunt.
                            </p>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Số chương: </span>
                                    <span className="text-gray-600 dark:text-gray-300">{manga.numChapter}</span>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Rating: </span>
                                    <span className="text-gray-600 dark:text-gray-300">{manga.rating}/10</span>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">View: </span>
                                    <span className="text-gray-600 dark:text-gray-300">{manga.viewed}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Thể loại: </span>
                                <div className="flex items-center mt-2">
                                    {sampleCategory.map((category, index) => (
                                        <Link
                                            key={index}
                                            className={`py-2 px-4 rounded-full font-bold text-white ${getCategoryColor(category.name)} mr-2`}
                                            to={`/category/${category.name}`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {manga.overview}
                                </p>
                            </div>
                            <div className="flex -mx-2 mb-4 mt-8">
                                <div className="w-1/2 px-2">
                                    <Link className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" to={`/admin/update-manga/${bookID}`}>Chỉnh sửa thông tin</Link>
                                </div>
                                <div className="w-1/2 px-2">
                                    <Link to={`/admin/manga/${bookID}/add-chapter/`} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Thêm Chapter</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Số thứ tự</th>
                                <th scope="col" className="px-6 py-3">Ngày đăng</th>
                                <th scope="col" className="px-6 py-3">Số trang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listChapter.map((chapter, index) => (
                                <tr
                                    key={index}
                                    onClick={() => navigate(`/read-manga/chapter/${bookID}/${chapter.chapterIndex}`)}
                                    className={`${index % 2 === 0
                                        ? "bg-white dark:bg-gray-800"
                                        : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        }`}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {chapter.chapterIndex}
                                    </th>
                                    <td className="px-6 py-4">{formatDate(chapter.dateUpdate)}</td>
                                    <td className="px-6 py-4">{chapter.pages.length} Trang</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
