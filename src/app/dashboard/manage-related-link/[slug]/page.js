"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function ManageRelatedLinksPage() {
    const router = useRouter();
    const { slug } = useParams();
    const carId = slug;
    const [isClient, setIsClient] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [empId, setEmpId] = useState(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

    const [relatedLinks, setRelatedLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
    const [currentLink, setCurrentLink] = useState({ title: '', link: '' });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const authToken = localStorage.getItem('authToken');
        const storedEmpId = localStorage.getItem('empId');

        if (!authToken || !storedEmpId) {
            router.replace('/dashboard/login');
        } else {
            setEmpId(storedEmpId);
            setIsCheckingAuth(false);
            fetchRelatedLinks();
        }
    }, [isClient, router]);

    const fetchRelatedLinks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiBaseUrl}/api/related-links/car/${carId}`, {
                headers: { 'Authorization': apiKey },
            });
            const data = await response.json();
            if (data.success) {
                setRelatedLinks(data.data);
            } else {
                setRelatedLinks([]);
                setError(data.message || 'Failed to fetch related links');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDialog = (mode, link = null) => {
        setDialogMode(mode);
        setError("");
        if (mode === 'edit' && link) {
            setCurrentLink({
                id: link.id,
                title: link.title,
                link: link.link,
            });
        } else {
            setCurrentLink({ title: '', link: '' });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentLink({ title: '', link: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentLink(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!empId) {
            setError("Employee ID not found. Please login again.");
            return;
        }

        const { title, link } = currentLink;
        if (!title.trim() || !link.trim()) {
            setError("All fields are mandatory.");
            return;
        }

        setError(null);
        setIsLoading(true);
        const isEditing = dialogMode === 'edit';

        const url = isEditing ? `${apiBaseUrl}/api/related-links/${currentLink.id}` : `${apiBaseUrl}/api/related-links`;
        const method = isEditing ? 'PUT' : 'POST';

        const body = {
            carId,
            blogId: 0, // blogId is not relevant here, but the model requires it. Sending 0.
            empId,
            title,
            link,
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                fetchRelatedLinks();
                handleCloseDialog();
            } else {
                setError(data.message || (isEditing ? 'Failed to update related link' : 'Failed to add related link'));
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this link?')) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiBaseUrl}/api/related-links/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                },
            });

            const result = await response.json();

            if (response.ok) {
                fetchRelatedLinks();
            } else {
                setError(result.message || `DB deletion failed with status: ${response.status}`);
            }

        } catch (error) {
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
                    Manage Related Links for Car ID: <span className="text-indigo-600">{carId}</span>
                </h1>
                <Link href="/my-all-listing">
                    <div className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-150">
                        Back to Listings
                    </div>
                </Link>
            </header>

            <main>
                <button
                    onClick={() => handleOpenDialog('add')}
                    className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-150"
                >
                    Add New Link
                </button>

                {isDialogOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 text-gray-700">
                        <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                            <h2 className="text-xl font-semibold mb-4">
                                {dialogMode === 'add' ? 'Add New Link' : 'Update Link'}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={currentLink.title}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                            placeholder="e.g., Official Website"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Link*</label>
                                        <input
                                            type="text"
                                            name="link"
                                            id="link"
                                            value={currentLink.link}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                            placeholder="e.g., https://example.com"
                                            required
                                        />
                                    </div>
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
                                        disabled={isLoading}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-60"
                                    >
                                        {isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>

                            {error && <p className="text-red-500 mb-3 pt-4 text-center">{error}</p>}
                        </div>
                    </div>
                )}

                <h2 className="text-xl font-semibold mb-6 text-gray-800">Existing Related Links</h2>
                {isLoading && relatedLinks.length === 0 && <p className="text-center text-gray-600 py-4">Loading related links...</p>}
                {!isLoading && error && relatedLinks.length === 0 && <p className="text-red-600 bg-red-50 p-4 rounded-md shadow text-center">{error}</p>}

                {relatedLinks.length > 0 ? (
                    <div className="space-y-6">
                        {relatedLinks.map((link) => (
                            <div key={link.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Title:</span> {link.title}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1 break-words">
                                            <span className="font-medium">Link:</span> <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.link}</a>
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row md:flex-col space-y-2 sm:space-y-0 sm:space-x-2 md:space-y-2 md:space-x-0 items-stretch md:items-end">
                                        <button
                                            onClick={() => handleOpenDialog('edit', link)}
                                            className="w-full sm:w-auto md:w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-150"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link.id)}
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
                    !isLoading && !error && <p className="text-center text-gray-600 py-4 bg-white rounded-md shadow">No related links found. Click "Add New Link" to create one.</p>
                )}
            </main>
        </div>
    );
}
