import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import api from "../../api/AxiosConfig";
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateManga() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [poster, setPoster] = useState(null);
    const [name, setName] = useState('');
    const [overview, setOverview] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(10.0);
    const [viewed, setViewed] = useState(0);
    const [oldPoster, setOldPoster] = useState(null); // Store the old poster URL for reference
    const token = localStorage.getItem('token');
    const { bookID } = useParams(); // Get manga ID from URL
    let navigate = useNavigate();

    // Fetch manga data to prefill the form
    useEffect(() => {
        loadCategories();
        loadMangaData();
    }, []);

    const loadCategories = async () => {
        try {
            const result = await api.get('/api/category/get-all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(result.data.data);
        } catch (error) {
            console.log("Error when fetching category data:", error);
        }
    };

    const loadMangaData = async () => {
        try {
            const response = await api.get(`/api/manga/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const manga = response.data.data;

            // Set state with manga data
            setName(manga.name);
            setOverview(manga.overview);
            setAuthor(manga.author);
            setRating(manga.rating);
            setViewed(manga.viewed);
            setSelectedCategories(manga.categories.map(cat => cat.categoryID)); // Assuming the response contains category IDs
            setOldPoster(manga.poster); // Store old poster URL for reference
        } catch (error) {
            console.log("Error loading manga data:", error);
        }
    };

    // Handle category selection
    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const ids = selectedOptions.map((option) => Number(option.value));
        setSelectedCategories(ids);
    };

    // Handle poster change (file input)
    const handlePosterChange = (event) => {
        const file = event.target.files[0];
        setPoster(file);
    };

    // Upload the poster image to Cloudinary and get the URL
    const uploadPoster = async (posterFile) => {
        const formData = new FormData();
        formData.append("image", posterFile);
        try {
            const response = await api.post("/cloudinary/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.data.url;
        } catch (error) {
            console.log("Error uploading poster:", error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // If a new poster is selected, upload it
        let posterUrl = oldPoster; // Default to old poster URL if no new poster selected
        if (poster) {
            posterUrl = await uploadPoster(poster);
            if (!posterUrl) {
                alert("Error uploading poster image. Please try again.");
                return;
            }
        }

        // Prepare the data to send to the backend
        const mangaData = {
            name,
            overview,
            author,
            rating,
            viewed,
            categories: selectedCategories,
            poster: posterUrl
        };

        // Send PUT request to update manga
        try {
            console.log("Sending PUT request to update manga...", mangaData);
            const response = await api.put(`/api/manga/update/${bookID}`, mangaData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'  // Send the data as JSON
                }
            });
            console.log("Manga updated successfully:", response.data);
            navigate("/admin/manga"); // Redirect to the manga list page
        } catch (error) {
            console.log("Error updating manga:", error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-8 p-8 bg-gradient-to-r from-blue-900 to-gray-800 shadow-xl rounded-lg text-white">
                <h1 className="text-3xl font-extrabold mb-8 text-center">Update Manga</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 text-gray-800">
                    {/* Name */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-lg font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter manga name"
                            className="w-full px-4 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Overview */}
                    <div className="mb-6">
                        <label htmlFor="overview" className="block text-lg font-semibold mb-2">
                            Overview
                        </label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={overview}
                            onChange={(e) => setOverview(e.target.value)}
                            placeholder="Enter manga overview"
                            className="w-full px-4 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                        />
                    </div>

                    {/* Author */}
                    <div className="mb-6">
                        <label htmlFor="author" className="block text-lg font-semibold mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter manga author"
                            className="w-full px-4 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Poster Image (File Input) */}
                    <div className="mb-6">
                        <label htmlFor="poster" className="block text-lg font-semibold mb-2">
                            Poster Image
                        </label>
                        <input
                            type="file"
                            id="poster"
                            name="poster"
                            accept="image/*"
                            className="w-full px-4 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handlePosterChange}
                        />
                        {poster && (
                            <div className="mt-4">
                                <img
                                    src={URL.createObjectURL(poster)} // Preview the selected image
                                    alt="Poster Preview"
                                    className="w-48 h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                        {!poster && oldPoster && (
                            <div className="mt-4">
                                <img
                                    src={oldPoster} // Display old poster if no new poster is selected
                                    alt="Old Poster"
                                    className="w-48 h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <label htmlFor="categories" className="block text-lg font-semibold mb-2">
                            Categories
                        </label>
                        <select
                            id="categories"
                            name="categories"
                            multiple
                            className="w-full px-4 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <option key={category.categoryID} value={category.categoryID}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-2">
                            Hold Ctrl (or Cmd on Mac) to select multiple categories.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
