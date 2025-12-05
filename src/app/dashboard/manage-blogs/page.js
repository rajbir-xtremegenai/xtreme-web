"use client";
// path of this page
// src/app/manage-blogs/page.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteFileFromS3, uploadFileToS3 } from '../utils/s3Upload';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function ManageBlogsPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for the unified dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentBlog, setCurrentBlog] = useState({
    slug: '',
    imageUrl: '',
    altText: '',
    author: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    active: false
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState('');
  const [seoDescriptionLength, setSeoDescriptionLength] = useState(0);
  const [seoTitleLength, setSeoTitleLength] = useState(0);

  const [empId, setEmpId] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

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
      fetchBlogs();
    }
  }, [isClient, router]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/blogs/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
        body: JSON.stringify({ empId: localStorage.getItem('empId') }),
      });
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        setBlogs([]);
        setError(data.message || 'Failed to fetch blogs');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (mode, blog = null) => {
    setDialogMode(mode);
    setApiError('');
    if (mode === 'edit' && blog) {
      setCurrentBlog({
        slug: blog.slug,
        imageUrl: blog.imageUrl || '',
        altText: blog.altText || '',
        author: blog.author || '',
        seoTitle: blog.seoTitle || '',
        seoDescription: blog.seoDescription || '',
        seoKeywords: blog.seoKeywords || '',
        active: blog.active || false
      });
      setSeoTitleLength(blog.seoTitle?.length || 0);
      setSeoDescriptionLength(blog.seoDescription?.length || 0);
    } else {
      setCurrentBlog({
        slug: '',
        imageUrl: '',
        altText: '',
        author: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        active: false
      });
      setSeoTitleLength(0);
      setSeoDescriptionLength(0);
    }
    setNewImageFile(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentBlog({
      slug: '',
      imageUrl: '',
      altText: '',
      author: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      active: false
    });
    setNewImageFile(null);
    setApiError('');
    setSeoTitleLength(0);
    setSeoDescriptionLength(0);
  };

  const handleSave = async () => {
    setApiError('');
    const { slug, imageUrl, altText, author } = currentBlog;

    if (!slug.trim() || !imageUrl.trim() || !altText.trim() || !author.trim()) {
      setApiError("All fields marked with * are mandatory.");
      return;
    }

    if (/\s/.test(imageUrl)) {
      setApiError('Image Slug cannot contain spaces. Please use hyphens (-) instead.');
      return;
    }

    if (seoTitleLength > 60) {
      setApiError("SEO Title cannot exceed 60 characters.");
      return;
    }
    if (seoDescriptionLength > 150) {
      setApiError("SEO Description cannot exceed 150 characters.");
      return;
    }

    // if (dialogMode === 'add') {
    // if (dialogMode === 'add' && !newImageFile) {
      // setApiError("Image file is mandatory for a new blog.");
      // return;
    // }

    const authToken = localStorage.getItem('authToken');
    if (!authToken || !empId) {
      setApiError("Authentication failed. Please log in again.");
      return;
    }

    setIsSaving(true);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      let finalImageUrl = imageUrl;

      if (newImageFile) {
        const fileExtension = newImageFile.name.split('.').pop();
        const nameToCheck = `blogs/${imageUrl}-CarsInUSA.${fileExtension}`;

        const checkResponse = await fetch(`${apiBaseUrl}/api/blogs/check-image-url`, {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: nameToCheck }),
        });
        const checkResult = await checkResponse.json();
        // print response status code

        if (checkResponse.status === 404 || checkResponse.status === 401 || checkResult.exists) {
          setApiError(checkResult.message);
          setIsSaving(false);
          return;
        }

        if (dialogMode === 'edit') {
          const originalBlog = blogs.find(b => b.slug === currentBlog.slug);
          if (originalBlog && originalBlog.imageUrl) {
            try {
              // await deleteFileFromS3(originalBlog.imageUrl);
            } catch (error) {
              console.error("Failed to delete old image from S3, continuing with upload...", error);
            }
          }
        }

        let imagePath = imageUrl;
        if (!imageUrl.match(/\.(png|jpg|jpeg|webp)$/)) {
          imagePath = 'blogs/' + imageUrl + "-CarsInUSA";
        }
        // finalImageUrl = await uploadFileToS3(newImageFile, imagePath);
      }

      const payload = {
        ...currentBlog,
        imageUrl: finalImageUrl,
        slug: slug.toLowerCase(),
        empId: dialogMode === 'add' ? empId : undefined,
        title: currentBlog.seoTitle,
        description: currentBlog.seoDescription,
      };

      const url = dialogMode === 'add' ? `${apiBaseUrl}/api/blogs` : `${apiBaseUrl}/api/blogs/update`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        handleCloseDialog();
        await fetchBlogs();
      } else {
        setApiError(result.message || "An error occurred while saving the blog.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      setApiError(`An unexpected error occurred: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/blogs/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Blog data deleted successfully, now delete the image
        if (imageUrl) {
          try {
            // await deleteFileFromS3(imageUrl);
            console.log('Image deleted from S3 successfully.');
          } catch (s3Error) {
            console.error(`Failed to delete blog image from S3:`, s3Error);
            // Even if image deletion fails, we proceed to fetch blogs as the main record is deleted.
            // You might want to log this for manual cleanup.
            setError(`Blog data deleted, but failed to delete image from storage: ${s3Error.message}.`);
          }
        }
        fetchBlogs(); // Refresh the list of blogs
      } else {
        // Blog data deletion failed
        setError(result.message || `DB deletion failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error during delete blog process for id: ${id}. Error:`, error);
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Blogs</h1>
        <Link href="/dashboard">
          <div className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Back to Dashboard</div>
        </Link>
      </header>

      <main>
        <button
          onClick={() => handleOpenDialog('add')}
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create a new Post
        </button>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 text-gray-700">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-6 text-gray-700">
                {dialogMode === 'add' ? 'Create a new Blog Post' : 'Update Blog Post'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug*</label>
                  <input
                    type="text"
                    value={currentBlog.slug}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    placeholder="e.g., my-first-post"
                    required
                    disabled={dialogMode === 'edit'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Name (imageUrl)*</label>
                  <input
                    type="text"
                    value={currentBlog.imageUrl}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, imageUrl: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    placeholder="e.g., unique-image-name"
                    disabled={dialogMode === 'edit' && !newImageFile}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImageFile(e.target.files[0])}
                    className="mt-1 block w-full text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text*</label>
                <input
                  type="text"
                  value={currentBlog.altText}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, altText: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="e.g., A descriptive text for the blog image"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
                <input
                  type="text"
                  value={currentBlog.author}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, author: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={currentBlog.seoTitle}
                    onChange={(e) => {
                      setCurrentBlog({ ...currentBlog, seoTitle: e.target.value });
                      setSeoTitleLength(e.target.value.length);
                    }}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                  />
                  <p className={`text-sm ${seoTitleLength > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                      {seoTitleLength}/60
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
                  <input
                    type="text"
                    value={currentBlog.seoKeywords}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, seoKeywords: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    placeholder="e.g., keyword1,keyword2"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  value={currentBlog.seoDescription}
                  onChange={(e) => {
                    setCurrentBlog({ ...currentBlog, seoDescription: e.target.value });
                    setSeoDescriptionLength(e.target.value.length);
                  }}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                />
                <p className={`text-sm ${seoDescriptionLength > 150 ? 'text-red-500' : 'text-gray-500'}`}>
                    {seoDescriptionLength}/150
                </p>
              </div>
              {/* // active checkbox */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="active"
                  checked={currentBlog.active}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, active: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={handleCloseDialog} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
                <button onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded-lg" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
              {apiError && <p className="text-red-500 bg-red-100 mt-4 p-3 rounded mb-4">{apiError}</p>}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-6 text-gray-800">Existing Blogs</h2>
        {isLoading && blogs.length === 0 && <p>Loading blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {blogs.length > 0 ? (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.slug} className="bg-white p-5 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  {blog.imageUrl && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${blog.imageUrl}`}
                      alt={blog.altText || blog.title}
                      className="w-full md:w-48 h-32 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-indigo-600">{blog.seoTitle}</h3>
                    <p className="text-sm text-gray-600">{blog.seoDescription}</p>
                    <p className="text-sm text-gray-600">Slug: {blog.slug}</p>
                    <p className="text-sm text-gray-600">Author: {blog.author}</p>
                    <p className="text-sm text-gray-600">{blog.active ? 'Active' : 'Inactive'}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(blog.createdAt).toLocaleDateString()} | Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button onClick={() => handleOpenDialog('edit', blog)} className="bg-yellow-500 text-white py-2 px-4 rounded">Update</button>
                    <button onClick={() => handleDelete(blog.id, blog.imageUrl)} className="bg-red-500 text-white py-2 px-4 rounded" disabled={isLoading}>Delete</button>
                    <Link href={`/dashboard/manage-blogdata/${blog.slug}?blogId=blog${blog.id}`}><div className="bg-blue-500 text-white py-2 px-4 rounded text-center">Manage Body</div></Link>
                    <Link href={`/dashboard/faq/${blog.slug}?blogId=blog${blog.id}`}><div className="bg-teal-500 text-white py-2 px-4 rounded text-center">Manage FAQs</div></Link>
                    <Link href={`/preview/blog/${blog.slug}`} target="_blank"><div className="bg-green-500 text-white py-2 px-4 rounded text-center">Preview</div></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && !error && <p>No blogs found.</p>
        )}
      </main>
    </div>
  );
}
