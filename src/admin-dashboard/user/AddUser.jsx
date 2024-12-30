import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUsers] = useState({
        name: "",
        username: "",
        email: "",
        dob: "",
        address: "",
        avatar: ""
    });

    const [preview, setPreview] = useState("");

    const { name, username, email, dob, address, avatar } = user;

    const onInputChange = (e) => {
        setUsers({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setUsers({ ...user, avatar: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("dob", dob);
        formData.append("address", address);
        formData.append("avatar", user.avatar);

        await axios.post("http://localhost:8080/user", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        navigate("/listuser");
    };

    return (
        <div className="">
            <Navbar />
            <div className='row bg-gray-900 min-h-screen '>
                <div className="col-md-6 offset-md-3 border rounded p-10 mt-2 shadow bg-gradient-to-r from-blue-900 to-gray-800 min-h-screen">
                    <h1 className="text-3xl font-extrabold mb-8 text-center text-white">Register User</h1>
                    <form className="bg-white rounded-lg shadow-md p-8 text-gray-800 " onSubmit={onSubmit}>
                        <label htmlFor="uploadAvatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                        <input
                            type="file"
                            name="uploadAvatar"
                            accept="image/*"
                            className="mb-4 p-2 border border-gray-300 rounded"
                            onChange={handleFileChange}
                        />
                        {preview && (
                            <img src={preview} alt="Avatar Preview" className="mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Your Name"
                                value={name}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Username"
                                value={username}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Email"
                                value={email}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={dob}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Your Address"
                                value={address}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <Link to="/listuser" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ margin: '0px 20px' }}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
