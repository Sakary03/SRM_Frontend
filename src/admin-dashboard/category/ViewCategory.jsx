import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useParams } from 'react-router-dom';
import api from "../../api/AxiosConfig"

export default function ViewCategory() {
    const { id } = useParams();
    const [category, setCategory] = useState([])
    const [listManga, setListManga] = useState([])
    useEffect(() => {
        console.log("ViewCategory")
        fetchCategory();
        fetchMangaByCategory();
    }, [])

    const fetchCategory = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await api.get(`/api/category/get-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Category data: ", result.data)
            setCategory(result.data.data);
        } catch (error) {
            console.log("Error when fetching category data:", error);
        };
    }

    const fetchMangaByCategory = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await api.get(`/api/manga/get-by-category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Match manga: ", result.data)
            setListManga(result.data.data);
        } catch (error) {
            console.log("Error when fetching category data:", error);
        };
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className="w-4/5 bg-white shadow-lg rounded-lg p-6 mx-auto mt-10">
                    <p className="text-gray-800 text-xl font-semibold">{category.categoryName}</p>
                    <p className="text-gray-800 text-l font-semibold">{category.overview}</p>
                </div>
                <div>
                    {listManga.length > 0 ? (
                        <div>Manga list is not empty!</div>
                    ) : (
                        <div>No manga found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
