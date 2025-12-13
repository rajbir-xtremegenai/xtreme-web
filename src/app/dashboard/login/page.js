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
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-white flex flex-col justify-center items-center p-4 selection:bg-[var(--color-clr1)] selection:text-white">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image src="/logo.svg" alt="Car Dashboard Logo" width={100} height={100} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              className="bg-white/5 border border-white/10 text-white placeholder-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-[var(--color-clr1)] focus:border-[var(--color-clr1)] outline-none transition-colors"
              placeholder="Enter your Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-white/5 border border-white/10 text-white placeholder-gray-400 p-2 rounded w-full focus:ring-2 focus:ring-[var(--color-clr1)] focus:border-[var(--color-clr1)] outline-none transition-colors"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[var(--color-clr1)] hover:bg-[var(--color-clr2)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-clr1)] focus:ring-opacity-50 transition-colors duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
