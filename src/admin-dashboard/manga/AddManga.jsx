import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import api from "../../api/AxiosConfig";
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddManga() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // State to store selected category IDs
  const [poster, setPoster] = useState(null); // State to store the poster image
  const [name, setName] = useState(''); // State for manga name
  const [numChapter, setNumChapter] = useState(0); // State for number of chapters
  const [rating, setRating] = useState(10.0); // State for rating
  const token = localStorage.getItem('token');
  let navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await api.get('/api/category/get-all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(result.data.data);
      console.log("Categories data: ", result.data.data);
    } catch (error) {
      console.log("Error when fetching category data:", error);
    }
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions); // Get all selected options
    const ids = selectedOptions.map((option) => Number(option.value)); // Extract category IDs
    setSelectedCategories(ids); // Update state with selected IDs
    console.log("Selected category IDs: ", ids);
  };

  // Handle poster change (file input)
  const handlePosterChange = (event) => {
    const file = event.target.files[0]; // Get the selected file (poster)
    setPoster(file); // Update state with the poster file
    console.log("Selected poster file: ", file);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("poster", poster);
    selectedCategories.forEach((category) => {
      formData.append("categoryList", category); // Append each category individually
    });
    // Send POST request to the backend
    try {
      console.log("Sending POST request to create manga...", formData);
      const response = await api.post('/api/manga/create-manga', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Manga created successfully:", response.data);
      navigate("/admin/manga");
      // Optionally reset the form or redirect after success
    } catch (error) {
      console.log("Error creating manga:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-gradient-to-r from-blue-900 to-gray-800 shadow-xl rounded-lg text-white">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Add Manga</h1>
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


          {/* Poster URL (File Input for Poster) */}
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
              onChange={handlePosterChange} // Handle the file change
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
