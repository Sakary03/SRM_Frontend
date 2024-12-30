import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableImage = ({ url, index, moveImage }) => {
    const [, ref] = useDrag({
        type: 'image',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'image',
        hover: (item) => {
            if (item.index !== index) {
                moveImage(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drop(ref(node))} className="flex flex-col items-center space-y-2">
            <img
                src={url}
                alt={`Page preview ${index + 1}`}
                className="w-48 h-64 object-cover rounded-md border border-gray-300"
            />
        </div>
    );
};

const AddChapterForm = () => {
    const { bookId } = useParams();
    const [pages, setPages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [chapterIndex, setChapterIndex] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setPages((prevPages) => [...prevPages, ...files]);

        const filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prevPreviews) => [...prevPreviews, ...filePreviews]);
    };

    const moveImage = (fromIndex, toIndex) => {
        const newPages = [...pages];
        const [movedPage] = newPages.splice(fromIndex, 1);
        newPages.splice(toIndex, 0, movedPage);
        setPages(newPages);

        const newPreviews = [...previewUrls];
        const [movedPreview] = newPreviews.splice(fromIndex, 1);
        newPreviews.splice(toIndex, 0, movedPreview);
        setPreviewUrls(newPreviews);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < pages.length; i++) {
            formData.append('pages', pages[i]);
        }
        formData.append('chapterIndex', chapterIndex);

        try {
            const response = await axios.post(`/addchapter/${bookId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Chapter added successfully!');
        } catch (error) {
            setMessage('Error adding chapter. Please try again.');
            console.error(error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Add New Chapter</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="pages" className="block text-sm font-medium text-gray-700">
                            Pages (PDF or Images)
                        </label>
                        <input
                            type="file"
                            id="pages"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                        />
                    </div>

                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                            {previewUrls.map((url, index) => (
                                <DraggableImage key={index} url={url} index={index} moveImage={moveImage} />
                            ))}
                        </div>
                    )}

                    <div>
                        <label htmlFor="chapterIndex" className="block text-sm font-medium text-gray-700">
                            Chapter Index
                        </label>
                        <input
                            type="number"
                            id="chapterIndex"
                            value={chapterIndex}
                            onChange={(e) => setChapterIndex(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
            </div>
        </DndProvider>
    );
};

export default AddChapterForm;
