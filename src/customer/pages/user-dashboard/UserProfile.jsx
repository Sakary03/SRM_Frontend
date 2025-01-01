import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';

export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();

    useEffect(() => {
        console.log(">> User Infomation: ", user);
    }, []); // Adding empty dependency array to call loadUser only once
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                    <h2 className="text-center text-2xl font-semibold mb-4">User Detail</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Detail of user id: {user.userID}</h3>
                        <ul className="mt-2">
                            <li className="py-2 border-b">
                                <b>Avatar:</b>
                                <br />
                                <img src={`${user.avatar}`} alt="User Avatar" />
                            </li>
                            <li className="py-2 border-b">
                                <b>Name:</b> {user.name}
                            </li>
                            <li className="py-2 border-b">
                                <b>Username:</b> {user.username}
                            </li>
                            <li className="py-2">
                                <b>Email:</b> {user.email}
                            </li>
                            <li className="py-2">
                                <b>Date of birth:</b> {user.dob}
                            </li>
                            <li className="py-2">
                                <b>Address:</b> {user.address}
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className="mt-4 w-full inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200">
                        Back
                    </Link>
                </div>
            </div >
        </div>
    );
}
