"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function ManageFaqsPage() {
    const router = useRouter();
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('blogId');
    const isCar = blogId?.startsWith('car');
    const [isClient, setIsClient] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [empId, setEmpId] = useState(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [currentFaq, setCurrentFaq] = useState({ ques: '', ans: '', order: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editFaqId, setEditFaqId] = useState(null);

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
            fetchFaqs();
        }
    }, [isClient, router, slug]);

    const fetchFaqs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiBaseUrl}/api/faqs/fetch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
                body: JSON.stringify({ blogId }),
            });
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            const data = await response.json();
            if (data.success) {
                setFaqs(data.data.sort((a, b) => a.order - b.order));
                setError(null);
            } else {
                setFaqs([]);
                setError(data.message || 'No FAQs found.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentFaq(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!empId) {
            setError("Employee ID not found. Please login again.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const url = isEditing ? `${apiBaseUrl}/api/faqs/update` : `${apiBaseUrl}/api/faqs`;
        const body = isEditing ? {
            id: editFaqId,
            ques: currentFaq.ques,
            ans: currentFaq.ans,
            order: parseInt(currentFaq.order, 10),
        } : {
            empId,
            blogId,
            ques: currentFaq.ques,
            ans: currentFaq.ans,
            order: parseInt(currentFaq.order, 10),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                fetchFaqs();
                setShowAddForm(false);
                setCurrentFaq({ ques: '', ans: '', order: '' });
                setIsEditing(false);
                setEditFaqId(null);
            } else {
                setError(data.message || (isEditing ? 'Failed to update FAQ' : 'Failed to add FAQ'));
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (faq) => {
        setShowAddForm(true);
        setIsEditing(true);
        setEditFaqId(faq.id);
        setCurrentFaq({
            ques: faq.ques,
            ans: faq.ans,
            order: faq.order,
        });
        setError(null);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiBaseUrl}/api/faqs/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();

            if (response.ok) {
                fetchFaqs();
            } else {
                setError(result.message || `DB deletion failed with status: ${response.status}`);
            }

        } catch (error) {
            setError(`An unexpected error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAddForm = () => {
        if (showAddForm) {
            setIsEditing(false);
            setEditFaqId(null);
            setCurrentFaq({ ques: '', ans: '', order: '' });
        }
        setShowAddForm(!showAddForm);
        setError(null);
    }

    if (!isClient || isCheckingAuth) {
        return <p className="text-center text-lg p-8">Loading page...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Manage FAQs for <span className="text-indigo-600">{slug}</span>
                </h1>
                <Link href={isCar ? "/dashboard/my-all-listing" : "/dashboard/manage-blogs"}>
                    <div className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-150">
                        {isCar ? "Back to Listings" : "Back to Blogs"}
                    </div>
                </Link>
            </header>

            <main>
                <button
                    onClick={toggleAddForm}
                    className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-150"
                >
                    {showAddForm ? (isEditing ? 'Cancel Edit' : 'Cancel Add') : 'Add New FAQ'}
                </button>

                {showAddForm && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">{isEditing ? 'Update FAQ' : 'Add New FAQ'}</h2>
                        {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4 border border-red-300">{error}</p>}
                        <div className="mb-4">
                            <label htmlFor="ques" className="block text-sm font-medium text-gray-700 mb-1">Question*</label>
                            <input
                                type="text"
                                name="ques"
                                id="ques"
                                value={currentFaq.ques}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                placeholder="Enter the question"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ans" className="block text-sm font-medium text-gray-700 mb-1">Answer*</label>
                            <textarea
                                name="ans"
                                id="ans"
                                value={currentFaq.ans}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                placeholder="Enter the answer"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">Order*</label>
                            <input
                                type="number"
                                name="order"
                                id="order"
                                value={currentFaq.order}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                placeholder="Enter the display order"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-150 disabled:opacity-60"
                        >
                            {isLoading ? 'Saving...' : (isEditing ? 'Update FAQ' : 'Save New FAQ')}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={toggleAddForm}
                                className="mt-3 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2.5 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-150"
                            >
                                Cancel Edit & Close Form
                            </button>
                        )}
                    </form>
                )}

                <h2 className="text-xl font-semibold mb-6 text-gray-800">Existing FAQs</h2>
                {isLoading && faqs.length === 0 && <p className="text-center text-gray-600 py-4">Loading FAQs...</p>}
                {!isLoading && error && faqs.length === 0 && <p className="text-red-600 bg-red-50 p-4 rounded-md shadow text-center">{error}</p>}

                {faqs.length > 0 ? (
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Question:</span> {faq.ques}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1 break-words">
                                            <span className="font-medium">Answer:</span> {faq.ans}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-medium">Order:</span> {faq.order}
                                        </p>
                                        <div className="text-xs text-gray-500 mt-2">
                                            <p>Created: {new Date(faq.createdAt).toLocaleString()}</p>
                                            <p>Updated: {new Date(faq.updatedAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row md:flex-col space-y-2 sm:space-y-0 sm:space-x-2 md:space-y-2 md:space-x-0 items-stretch md:items-end">
                                        <button
                                            onClick={() => handleEdit(faq)}
                                            className="w-full sm:w-auto md:w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-150"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq.id)}
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
                    !isLoading && !error && <p className="text-center text-gray-600 py-4 bg-white rounded-md shadow">No FAQs found. Click "Add New FAQ" to create one.</p>
                )}
            </main>
        </div>
    );
}
