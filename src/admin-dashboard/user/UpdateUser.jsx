import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
export default function UpdateUser() {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        username: '',
        dob: '',
        email: '',
        address: '',
        avatar: ''
    });
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    var oldAvatar;
    useEffect(() => {
        loadUser();
    }, []);

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUser({ ...user, avatar: file });
        setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitting");
        try {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('username', user.username);
            formData.append('dob', user.dob);
            formData.append('email', user.email);
            formData.append('address', user.address);
            if (!(typeof user.avatar === "string")) {
                formData.append('avatarFile', user.avatar);
            } else {
                formData.append('avatarUrl', user.avatar);
            }
            console.log("Old Avatar: ", oldAvatar);
            console.log("Form Data Contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/user/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/user');
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/user/${id}`);
            setUser(result.data.data);
            console.log("Old User Data: ", result.data.data);
            if (result.data.data.avatar) {
                setPreview(`${result.data.data.avatar}`);
            }
        } catch (error) {
            console.error("There was an error loading the user!", error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-full max-w-lg bg-white border rounded-lg p-8 mt-8 shadow-xl">
                    <h2 className="text-center text-3xl font-semibold mb-8">Edit User Info</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="avatar" className="block text-gray-700 font-medium mb-2">Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                className="mb-4 p-2 border border-gray-300 rounded"
                                onChange={handleFileChange}
                            />
                            {preview && (
                                <img src={preview} alt="Avatar Preview" className="mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input type="text" id="name" className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 bg-gray-100" placeholder="Enter your name" name="name" value={user.name} onChange={onInputChange} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                            <input type="text" id="username" className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 bg-gray-100" placeholder="Enter your username" name="username" value={user.username} readonly />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input type="email" id="email" className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 bg-gray-100" placeholder="Enter your email" name="email" value={user.email} readonly />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                            <input type="date" id="dob" className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 bg-gray-100" placeholder="Enter your birthday" name="dob" value={user.dob} onChange={onInputChange} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                            <input type="text" id="address" className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 bg-gray-100" placeholder="Enter your address" name="address" value={user.address} onChange={onInputChange} />
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Submit</button>
                            <Link className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600" to="/admin/user">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
