import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const authContext = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));
    const [userFullName, setUserFullName] = useState(user?.username);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogoutClick = () => {
        authContext.handleLogout();
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    return (
        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center">
                            <a href='https://github.com/Sakary03?tab=repositories'>
                                <img class="h-8 w-auto rounded-full" src="https://avatars.githubusercontent.com/u/107931611?v=4" alt="Your Repo" />
                            </a>
                        </div>
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <Link class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" aria-current="page" to="/admin/user">User</Link>
                                <Link to="/admin/manga" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Manga</Link>
                                <Link to="/admin/category" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Category</Link>
                            </div>
                        </div>
                    </div>
                    {userFullName ? (
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="absolute -inset-1.5"></span>
                                <span class="sr-only">View notifications</span>
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </button>
                            <div class="relative ml-3">
                                <div>
                                    <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={toggleDropdown}>
                                        <span class="absolute -inset-1.5"></span>
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                                    </button>
                                </div>
                                {dropdownVisible && (
                                    <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                        <div href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</div>
                                        <div href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</div>
                                        <div href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={() => handleLogoutClick()}>Sign out</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button className="bg-white text-[#006ce4] border border-transparent rounded px-2 py-2 hover:bg-gray-100" onClick={() => navigate("/signup")}>
                                Đăng ký
                            </button>
                            <button className="bg-white text-[#006ce4] border border-transparent rounded px-2 py-2 hover:bg-gray-100" onClick={() => navigate("/login")}>
                                Đăng nhập
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div class="sm:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">User</a>
                    <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Product</a>
                    <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Category</a>
                    <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
                </div>
            </div>
        </nav>
    )
}