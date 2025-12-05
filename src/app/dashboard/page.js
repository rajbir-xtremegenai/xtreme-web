"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indicate component has mounted and window is available
  }, []);

  useEffect(() => {
    if (!isClient) {
      return; // Don't do anything until client-side
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.replace('/login'); // Use replace to avoid adding to history stack
    } else {
      setIsCheckingAuth(false); // User is logged in, proceed to render page
    }
  }, [router, isClient]);

  // Show loading state while checking auth or if not yet client-side
  if (!isClient || isCheckingAuth) {
    // If not logged in (and redirect is in progress), isCheckingAuth might remain true
    // or we rely on router.replace() to take over.
    // This ensures we don't render the main UI until auth is confirmed.
    if (isClient && !localStorage.getItem('authToken')) {
        // This state helps prevent flashing the main UI while redirecting
        return <p>Redirecting to login...</p>; 
    }
    return <p>Loading...</p>; // Or a more sophisticated loading spinner
  }

  // Main content of the home page (only rendered if logged in)
  const features = [
    'My Profile',
    'Manage Home Banners', // Added new feature
    'Manage Blogs'
  ];

  const handleFeatureClick = (featureName) => {
    switch (featureName) {
      case 'My Profile':
        router.push('/dashboard/profile');
        break;
      case 'Manage Home Banners':
        router.push('/dashboard/manage-banners');
        break;
      case 'Manage Blogs':
        router.push('/dashboard/manage-blogs');
        break;
      default:
        console.log(`Navigation for ${featureName} not implemented yet.`);
    }
  };

  const handleLogout = () => {
    // Ensure this code runs only in the client-side
    // No need for window check here as isClient guard ensures it
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    router.replace('/login'); // Use replace for logout as well
  };

  // Main content is returned below, guarded by the loading/auth checks

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8"> {/* Added responsive padding */}
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800"> {/* Responsive text size */}
          Welcome to the Dashboard!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-150" // Adjusted hover, added focus ring & transition
        >
          Logout
        </button>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted sm grid */}
          {features.map((feature) => (
            <div
              key={feature}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" // Added focus ring & transition-all
              tabIndex={0} // Make it focusable
              onClick={() => handleFeatureClick(feature)}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center"> {/* Responsive text size */}
                {feature}
              </h2>
              {/* Placeholder for potential icons or brief descriptions later */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
