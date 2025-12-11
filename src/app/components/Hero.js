'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// The actual component that will be rendered client-side only
function HeroComponent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Function to get user's country based on timezone and other indicators
    const getUserCountry = () => {
      try {
        // Method 1: Check timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
          return 'IN';
        }

        // Method 2: Check locale
        const locale = navigator.language || navigator.languages[0];
        if (locale.includes('en-IN') || locale.includes('hi')) {
          return 'IN';
        }

        return 'US'; // Default
      } catch (error) {
        console.log('Error detecting country:', error);
        return 'US';
      }
    };

    const country = getUserCountry();

    switch (country) {
      case 'IN':
        setPhoneNumber('92280 34172');
        break;
      case 'US':
        setPhoneNumber('+12293511010');
        break;
      default:
        setPhoneNumber('+12293511010'); // Default to US for other countries
    }

    setIsLoaded(true);
  }, []);

  // Show loading state until client-side detection is complete
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 w-full">
        <h1 className="text-[50px] md:text-[80px] font-bold leading-[1.1] mb-5 font-[var(--font-outfit)] bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Call The<br />Future Now.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-[600px] mb-10 font-light">
          Empowering businesses to rapidly build & deploy AI agents
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-tr from-[var(--color-clr1)] to-[var(--color-clr2)] flex items-center justify-center shadow-[0_0_20px_rgba(173,74,234,0.5)] cursor-pointer hover:scale-110 transition-transform">
            <Link href='tel:'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
            </Link>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-6 py-2 rounded-full backdrop-blur-sm">
            <p className="text-white tracking-widest text-sm">Loading...</p>
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Call our demo A.I voice agent</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 w-full">
      <h1 className="text-[50px] md:text-[80px] font-bold leading-[1.1] mb-5 font-[var(--font-outfit)] bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Call The<br />Future Now.
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-[600px] mb-10 font-light">
        Empowering businesses to rapidly build & deploy AI agents
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-tr from-[var(--color-clr1)] to-[var(--color-clr2)] flex items-center justify-center shadow-[0_0_20px_rgba(173,74,234,0.5)] cursor-pointer hover:scale-110 transition-transform animate-pulse">
          <Link href={`tel:${phoneNumber}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
          </Link>
        </div>
        <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-6 py-2 rounded-full backdrop-blur-sm">
          <p className="text-white tracking-widest text-lg font-mono">{phoneNumber}</p>
        </div>
        <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Call our demo A.I voice agent</span>
      </div>
    </div>
  );
}

// Export the dynamically imported component with SSR disabled
const Hero = dynamic(() => Promise.resolve(HeroComponent), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center text-center px-4 w-full">
        <h1 className="text-[50px] md:text-[80px] font-bold leading-[1.1] mb-5 font-[var(--font-outfit)] bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Call The<br />Future Now.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-[600px] mb-10 font-light">
          Empowering businesses to rapidly build & deploy AI agents
        </p>
        <div className="flex flex-col items-center gap-4">
             <p className="text-white">Loading...</p>
             <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Call our demo A.I voice agent</span>
        </div>
    </div>
  )
});

export default Hero;
