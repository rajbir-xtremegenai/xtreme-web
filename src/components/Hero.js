"use client"
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

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

    // Helper for rendering content to avoid code duplication
    const renderContent = (phoneDisplay) => (
        <div className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-20">
            <div className="max-w-4xl z-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white mb-6">
                    Call The<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Future Now.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 font-light">
                    Empowering businesses to rapidly build & deploy AI agents
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <Link
                            href={`tel:${phoneDisplay.replace(/\s/g, '')}`}
                            className="relative flex items-center gap-4 bg-black rounded-full pl-4 pr-8 py-3 leading-none divide-x divide-gray-600 border border-gray-800 hover:bg-gray-900 transition-colors"
                        >
                            <span className="flex items-center justify-center p-2 bg-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-black">
                                    <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                                </svg>
                            </span>
                            <span className="pl-4 text-xl font-mono text-gray-200 group-hover:text-white transition-colors">
                                {phoneDisplay}
                            </span>
                        </Link>
                    </div>

                    <span className="text-sm font-medium tracking-widest text-blue-400 uppercase animate-pulse">
                        Call our demo A.I voice agent
                    </span>
                </div>
            </div>
        </div>
    );

    // Show loading state until client-side detection is complete
    if (!isLoaded) {
        return renderContent("Loading...");
    }

    return renderContent(phoneNumber);
}

// Export the dynamically imported component with SSR disabled
const Hero = dynamic(() => Promise.resolve(HeroComponent), {
    ssr: false,
    loading: () => (
        <div className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-20">
            <div className="max-w-4xl z-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white mb-6">
                    Call The<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Future Now.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 font-light">
                    Empowering businesses to rapidly build & deploy AI agents
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="group relative">
                        <div className="bg-gray-800 rounded-full w-64 h-16 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Hero
