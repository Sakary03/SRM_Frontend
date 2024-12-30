import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../component/Navbar';
import api from "../../api/AxiosConfig"

export default function ListManga() {
    const [mangas, setMangas] = useState([])
    const { id } = useParams();
    useEffect(() => {
        loadMangas();
    }, [])
    const loadMangas = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await api.get('/api/manga/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("result.data: ", result.data)
            setMangas(result.data.data);
        } catch (error) {
            console.log("Error when fetching category data:", error);
        };
    }

    return (

        <div>
            <Navbar />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <br></br>
                <Link to="/admin/addmanga">
                    <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex space-x-4 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                            />
                        </svg> Add Manga</button></Link>
                <br></br>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Manga Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Num Chapter
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mangas.length === 0 ? <tr><td colSpan="6" className="text-center">No data</td></tr> :
                                mangas.map((manga, index) => (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {manga.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {manga.numChapter}
                                        </td>
                                        <td className="px-6 py-4">
                                            {manga.rating}
                                        </td>
                                        <td className="px-6 py-4">
                                            "Add after"
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link className="font-medium text-green-600 dark:text-green-500 hover:underline" to={`/admin/manga-detail/${manga.bookID}`} style={{ margin: '0px 10px' }} >View</Link>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div >
        </div>
    )
}