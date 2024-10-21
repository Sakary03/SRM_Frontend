import React from 'react';

export default function TestUpload() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h3 className="mb-4 text-2xl font-bold text-gray-700">Upload an Image</h3>
            <form
                method="POST"
                action="http://localhost:8080/upload/user-avatar"
                encType="multipart/form-data"
                className="flex flex-col items-center bg-white shadow-md rounded px-8 py-6"
            >
                <input
                    type="file"
                    name="uploadAvatar"
                    accept="image/*"
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}
