"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empId: employeeId, password: password }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem('userData', JSON.stringify(responseData.data));
        localStorage.setItem('authToken', responseData.token);
        localStorage.setItem('empId', employeeId); // Store empId
        if (responseData.mainCategories) {
          localStorage.setItem('mainCategories', JSON.stringify(responseData.mainCategories));
        }
        if (responseData.subCategories) {
          localStorage.setItem('subCategories', JSON.stringify(responseData.subCategories));
        }
        router.push('/dashboard');
      } else {
        setError(responseData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4"> {/* Added p-4 and changed bg to bg-gray-50 */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"> {/* Added rounded-lg for consistency */}
        <div className="flex justify-center mb-10"> {/* Increased logo margin-bottom */}
          <Image src="/logo.svg" alt="Car Dashboard Logo" width={100} height={100} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              className="border text-black p-2 rounded w-full focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              placeholder="Enter your Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border text-black p-2 rounded w-full focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150" // Adjusted hover, added transition
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
