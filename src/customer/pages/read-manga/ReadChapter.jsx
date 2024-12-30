import React, { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { useParams } from 'react-router-dom';
import api from '../../../api/AxiosConfig';
import chapters from '../manga-detail/chapterDataSample';
import Footer from '../../footer/Footer';

export default function ReadChapter() {
    const [manga, setManga] = useState({});
    const [chapter, setChapter] = useState({ pages: [] });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const bookID = useParams().bookID;

    // Get manga data
    const fetchManga = async () => {
        try {
            console.log(">> bookID: ", bookID);
            const response = await api.get(`/api/manga/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Response: ", response.data.data);
            setManga(response.data.data);
            console.log("Manga Info: ", manga);
        } catch (err) {
            setError("Failed to fetch manga data.");
        } finally {
            setLoading(false);
        }
    };

    // Fake get chapter data
    const fetchChapter = async () => {
        try {
            const chapterData = await chapters[0]; // Assuming 'chapters' contains the data with 'pages'
            setChapter(chapterData);
            console.log("Chapter Info: ", chapter);
        } catch (err) {
            setError("Failed to fetch chapter data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManga();
        fetchChapter();
    }, []);

    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="min-h-screen h-auto justify-center">
                <div className="w-4/5 bg-white shadow-lg rounded-lg p-6 mx-auto mt-10">
                    <p className="text-gray-800 text-l font-semibold mb-4">Home  /  {manga.name}  /  1</p>
                    <p className="text-gray-800 text-xl font-semibold mb-4">{manga.name}  - Chap  {chapter.chapterIndex} <span className="text-sm font-normal">(Update in {chapter.dateUpdate})</span></p>
                    <div className="w-4/5 flex space-x-4 justify-center mx-auto">
                        <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg">Chương trước</button>
                        <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg">Chương sau</button>
                    </div>
                </div>
                <div className="w-4/5 shadow-lg rounded-lg p-6 mx-auto mt-10">
                    {Array.isArray(chapter.pages) && chapter.pages.length > 0 ? (
                        chapter.pages.map((page, index) => (
                            <div key={index} className="p-4 rounded-lg shadow-md mt-1">
                                <img src={page} alt={`Picture ${index + 1}`} className="w-full h-auto rounded-lg" />
                            </div>
                        ))
                    ) : (
                        <p>No pages available</p>
                    )}
                </div>
                <div className="w-4/5 bg-white shadow-lg rounded-lg p-6 mx-auto mt-10">
                    <div className="w-4/5 flex space-x-4 justify-center mx-auto">
                        <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg">Chương trước</button>
                        <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg">Chương sau</button>
                    </div>
                    <p className="text-gray-800 text-l font-semibold mb-4">Home  /  {manga.name}  /  1</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
