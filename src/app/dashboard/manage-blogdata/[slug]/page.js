"use client";
// src/app/manage-blogs/[slug]/page.js
import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { deleteFileFromS3, uploadFileToS3 } from '../../utils/s3Upload';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function ManageBlogBodyPage() {
    const router = useRouter();
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('blogId');
    const isCar = blogId?.startsWith('car');
    const [isClient, setIsClient] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [empId, setEmpId] = useState(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const baseElementTypes = ['sub-title', 'paragraph', 'link', 'imageUrl', 'bullets', 'quote'];
    const elementTypes = isCar ? baseElementTypes : ['title', ...baseElementTypes];
    const elementValueHints = {
        title: 'Enter the main title',
        'sub-title': 'Enter a sub-title',
        paragraph: 'Enter a paragraph of text',
        link: 'Enter a URL',
        imageUrl: 'Upload an image',
        bullets: 'Enter bullet points, separated by commas',
        quote: 'Enter a quote',
    };

    const [currentData, setCurrentData] = useState({ order: '', elementType: elementTypes[0], elementValue: '', altText: '', alignment: 'start', imageUrl: '', bulletTitle: '', bulletDescription: '' });


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const authToken = localStorage.getItem('authToken');
        const storedEmpId = localStorage.getItem('empId');

        if (!authToken || !storedEmpId) {
            router.replace('/login');
        } else {
            setEmpId(storedEmpId);
            setIsCheckingAuth(false);
            fetchBlogData();
        }
    }, [isClient, router]);

    const fetchBlogData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiBaseUrl}/api/blogs/blogsdata/${blogId}`, {
                headers: { 'Authorization': apiKey },
            });
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            const data = await response.json();
            if (data.success) {
                setBlogData(data.data.sort((a, b) => a.order - b.order));
            } else {
                setBlogData([]);
                setError(data.message || 'Failed to fetch blog data');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDialog = (mode, data = null) => {
        setDialogMode(mode);
        setError("");
        if (mode === 'edit' && data) {
            setCurrentData({
                id: data.id,
                order: data.order,
                elementType: data.elementType,
                elementValue: data.elementValue || '',
                altText: data.altText || '',
                alignment: data.alignment || 'start',
                imageUrl: data.elementType === 'imageUrl' ? data.elementValue : '',
                bulletTitle: data.bulletTitle || '',
                bulletDescription: data.bulletDescription || '',
            });
        } else {
            setCurrentData({
                order: '', elementType: elementTypes[0],   // <-- use first item dynamically
                elementValue: '', altText: '', alignment: 'start', imageUrl: '', bulletTitle: '', bulletDescription: ''
            });
        }
        setImageFile(null);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentData({
            order: '',
            elementType: elementTypes[0],   // <-- same fix here
            elementValue: '',
            altText: '',
            alignment: 'start',
            imageUrl: '',
            bulletTitle: '',
            bulletDescription: ''
        });
        setImageFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageFile") {
            setImageFile(files[0]);
        } else {
            setCurrentData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!empId) {
            setError("Employee ID not found. Please login again.");
            return;
        }

        const { order, elementType, elementValue, altText, imageUrl } = currentData;
        if (!order || !elementType || (elementType !== 'imageUrl' && !elementValue.trim()) || (elementType === 'imageUrl' && !imageUrl.trim()) || (elementType === 'imageUrl' && !altText.trim())) {
            setError("All fields are mandatory.");
            return;
        }

        if (dialogMode === 'add' && elementType === 'imageUrl' && !imageFile) {
            setError("Image is mandatory for a new image element.");
            return;
        }

        setError(null);
        let finalElementValue = elementValue;

        if (elementType === 'imageUrl') {
            let imageUniquenessCheckNeeded = false;
            if (dialogMode === 'add' && imageUrl) {
                imageUniquenessCheckNeeded = true;
            }
            if (/\s/.test(imageUrl)) {
                setError('Image Slug cannot contain spaces. Please use hyphens (-) instead.');
                return;
            }
            if (imageFile) {
                const fileExtension = imageFile.name.split('.').pop();
                let nameToCheck = imageUrl;
                if (!nameToCheck.match(/\.(png|jpg|jpeg|webp)$/)) {
                    nameToCheck = `blogsdata/${imageUrl}-XtremeGenAI.${fileExtension}`;
                }

                if (dialogMode === 'edit' && currentData.imageUrl && currentData.imageUrl !== nameToCheck) {
                    imageUniquenessCheckNeeded = true;
                }

                if (imageUniquenessCheckNeeded) {
                    try {
                        const response = await axios.post(`${apiBaseUrl}/api/blogs/blogsdata/check-image-url`, { imageUrl: nameToCheck }, {
                            headers: {
                                'Authorization': apiKey,
                                'Content-Type': 'application/json',
                            },
                        });
                        if (response.data.exists) {
                            setError("Image URL already exists. Please choose a different name.");
                            return;
                        }
                    } catch (error) {
                        console.error("Error checking image URL:", error);
                        setError("Failed to verify image URL. Please try again.");
                        return;
                    }
                }
                finalElementValue = nameToCheck;
            }
        }

        if (currentData.elementType === 'imageUrl' && imageFile) {
            if (dialogMode === 'edit') {
                const originalElement = blogData.find(d => d.id === currentData.id);
                if (originalElement && originalElement.elementValue) {
                    try {
                        await deleteFileFromS3(originalElement.elementValue);
                    } catch (error) {
                        console.error("Error deleting old image:", error);
                        // setError("Failed to delete previous image from storage. Continuing with update.");
                    }
                }
            }

            setIsUploading(true);
            setIsLoading(true);
            try {
                await uploadFileToS3(imageFile, finalElementValue);
            } catch (s3Error) {
                console.error('S3 Upload Error:', s3Error);
                setError('Failed to upload image to storage. ' + s3Error.message);
                setIsUploading(false);
                setIsLoading(false);
                return;
            } finally {
                setIsUploading(false);
            }
        }

        setIsLoading(true);
        const isEditing = dialogMode === 'edit';

        const url = `${apiBaseUrl}/api/blogs/blogsdata`;
        const method = isEditing ? 'PUT' : 'POST';

        const body = isEditing ? {
            id: currentData.id,
            blogId,
            order: currentData.order,
            elementValue: finalElementValue,
            altText: currentData.altText,
            alignment: currentData.alignment,
            bulletTitle: currentData.bulletTitle,
            bulletDescription: currentData.bulletDescription,
        } : [{
            empId,
            blogId,
            order: currentData.order,
            elementType: currentData.elementType,
            elementValue: finalElementValue,
            altText: currentData.altText,
            alignment: currentData.alignment,
            bulletTitle: currentData.bulletTitle,
            bulletDescription: currentData.bulletDescription,
        }];


        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                // fetchBlogData();
                handleCloseDialog();
            } else {
                setError(data.message || (isEditing ? 'Failed to update blog data' : 'Failed to add blog data'));
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
            setIsUploading(false);
        }
    };

    const handleDelete = async (id, elementType, elementValue) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        setIsLoading(true);
        setError(null);

        try {
            if (elementType === 'imageUrl' && elementValue) {
                try {
                    await deleteFileFromS3(elementValue);
                    console.log(`Image with path ${elementValue} deleted from S3 successfully.`);
                } catch (s3Error) {
                    console.error(`Failed to delete image from S3:`, s3Error);
                    setError(`Failed to delete image from storage: ${s3Error.message}. Database record not deleted.`);
                    setIsLoading(false);
                    return;
                }
            }

            const response = await fetch(`${apiBaseUrl}/api/blogs/blogsdata`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();

            if (response.ok) {
                fetchBlogData();
            } else {
                setError(result.message || `DB deletion failed with status: ${response.status}`);
            }

        } catch (error) {
            console.error(`Error during delete blog data process for id: ${id}. Error:`, error);
            setError(`An unexpected error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };


    if (!isClient || isCheckingAuth) {
        return <p className="text-center text-lg p-8">Loading page...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Manage {isCar ? "Car" : "Blog"} Body for <span className="text-indigo-600">{slug}</span>
                </h1>
                <Link href={isCar ? "/dashboard/my-all-listing" : "/dashboard/manage-blogs"}>
                    <div className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-150">
                        {isCar ? "Back to Listings" : "Back to Blogs"}
                    </div>
                </Link>
            </header>

            <main>
                <button
                    onClick={() => handleOpenDialog('add')}
                    className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-150"
                >
                    Add New Element
                </button>

                {isDialogOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 text-gray-700">
                        <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                            <h2 className="text-xl font-semibold mb-4">
                                {dialogMode === 'add' ? 'Add New Element' : 'Update Element'}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">Order*</label>
                                        <input
                                            type="number"
                                            name="order"
                                            id="order"
                                            value={currentData.order}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                            placeholder="e.g., 1"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="elementType" className="block text-sm font-medium text-gray-700 mb-1">Element Type*</label>
                                        <select
                                            name="elementType"
                                            id="elementType"
                                            value={currentData.elementType}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                            required
                                            disabled={dialogMode === 'edit'}
                                        >
                                            {elementTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="alignment" className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                                        <select
                                            name="alignment"
                                            id="alignment"
                                            value={currentData.alignment}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                        >
                                            <option value="start">Start</option>
                                            <option value="center">Center</option>
                                            <option value="end">End</option>
                                        </select>
                                    </div>
                                    {currentData.elementType === 'imageUrl' ? (
                                        <div>
                                            <div className="mb-4">
                                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image Slug</label>
                                                <input
                                                    type="text"
                                                    name="imageUrl"
                                                    id="imageUrl"
                                                    value={currentData.imageUrl}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder="e.g., my-awesome-image"
                                                    disabled={dialogMode === 'edit' && imageFile === null && currentData.imageUrl}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                                                <input
                                                    type="file"
                                                    name="imageFile"
                                                    id="imageFile"
                                                    accept="image/*"
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-1">Alt Text*</label>
                                                <input
                                                    type="text"
                                                    name="altText"
                                                    id="altText"
                                                    value={currentData.altText}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder="e.g., A description of the image"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ) : currentData.elementType === 'bullets' ? (
                                        <div>
                                            <div>
                                                <label htmlFor="bulletTitle" className="block text-sm font-medium text-gray-700 mb-1">Bullet Title</label>
                                                <input
                                                    type="text"
                                                    name="bulletTitle"
                                                    id="bulletTitle"
                                                    value={currentData.bulletTitle}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder="Enter the title for the bullet points"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label htmlFor="bulletDescription" className="block text-sm font-medium text-gray-700 mb-1">Bullet Description</label>
                                                <textarea
                                                    name="bulletDescription"
                                                    id="bulletDescription"
                                                    value={currentData.bulletDescription}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder="Enter the description for the bullet points"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label htmlFor="elementValue" className="block text-sm font-medium text-gray-700 mb-1">Bullet Points (double-comma-separated-with-space eg:- ,,)</label>
                                                <textarea
                                                    name="elementValue"
                                                    id="elementValue"
                                                    value={currentData.elementValue}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder="e.g., point 1, point 2, point 3"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ) : currentData.elementType === 'link' ? (
                                        <div>
                                            <div>
                                                <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-1">Alt Text*</label>
                                                <input
                                                    type="text"
                                                    name="altText"
                                                    id="altText"
                                                    value={currentData.altText}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder="e.g., A description of the image"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="elementValue" className="block text-sm font-medium text-gray-700 mb-1">Value*</label>
                                                <textarea
                                                    name="elementValue"
                                                    id="elementValue"
                                                    value={currentData.elementValue}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                    placeholder={elementValueHints[currentData.elementType]}
                                                    required={currentData.elementType !== 'imageUrl'}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor="elementValue" className="block text-sm font-medium text-gray-700 mb-1">Value*</label>
                                            <textarea
                                                name="elementValue"
                                                id="elementValue"
                                                value={currentData.elementValue}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                                placeholder={elementValueHints[currentData.elementType]}
                                                required={currentData.elementType !== 'imageUrl'}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseDialog}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading || isUploading}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-60"
                                    >
                                        {isUploading ? 'Uploading...' : (isLoading ? 'Saving...' : 'Save')}
                                    </button>
                                </div>
                            </form>

                            {error && <p className="text-red-500 mb-3 pt-4 text-center">{error}</p>}
                        </div>
                    </div>
                )}

                <h2 className="text-xl font-semibold mb-6 text-gray-800">Existing {isCar ? "Car" : "Blog"} Elements</h2>
                {isLoading && blogData.length === 0 && <p className="text-center text-gray-600 py-4">Loading {isCar ? "car" : "blog"} elements...</p>}
                {!isLoading && error && blogData.length === 0 && <p className="text-red-600 bg-red-50 p-4 rounded-md shadow text-center">{error}</p>}

                {blogData.length > 0 ? (
                    <div className="space-y-6">
                        {blogData.map((data) => (
                            <div key={data.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    {data.elementType === 'imageUrl' && (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${data.elementValue}`}
                                            alt={data.altText || 'Blog Image'}
                                            className="w-full md:w-48 h-32 md:h-auto object-cover rounded-md border border-gray-200"
                                            onError={(e) => { e.target.onerror = null; }}
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Order:</span> {data.order}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Type:</span> {data.elementType}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Alignment:</span> {data.alignment}
                                        </p>
                                        {data.elementType === 'imageUrl' || data.elementType === 'link' && (
                                            <p className="text-sm text-gray-700 mt-1">
                                                <span className="font-medium">Alt Text:</span> {data.altText}
                                            </p>
                                        )}
                                        {data.elementType === 'bullets' && (
                                            <>
                                                {data.bulletTitle && (
                                                    <p className="text-sm text-gray-700 mt-1">
                                                        <span className="font-medium">Bullet Title:</span> {data.bulletTitle}
                                                    </p>
                                                )}
                                                {data.bulletDescription && (
                                                    <p className="text-sm text-gray-700 mt-1">
                                                        <span className="font-medium">Bullet Description:</span> {data.bulletDescription}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                        <p className="text-sm text-gray-700 mt-1 break-words">
                                            <span className="font-medium">Value:</span> {data.elementValue}
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row md:flex-col space-y-2 sm:space-y-0 sm:space-x-2 md:space-y-2 md:space-x-0 items-stretch md:items-end">
                                        <button
                                            onClick={() => handleOpenDialog('edit', data)}
                                            className="w-full sm:w-auto md:w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-150"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(data.id, data.elementType, data.elementValue)}
                                            disabled={isLoading}
                                            className="w-full sm:w-auto md:w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-150 disabled:opacity-60"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && !error && <p className="text-center text-gray-600 py-4 bg-white rounded-md shadow">No {isCar ? "car" : "blog"} elements found. Click "Add New Element" to create one.</p>
                )}
            </main>
        </div>
    );
}
