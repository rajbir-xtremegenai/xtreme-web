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

    const PhoneIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
        </svg>
    );

    // Common structure for both loading and loaded states
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-6">
                Call The<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Future Now.</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-300 max-w-2xl mb-12'>
                Empowering businesses to rapidly build & deploy AI agents
            </p>

            <div className="flex flex-col items-center gap-6">
                {/* Main Call Button Container */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-full pl-3 pr-6 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-shadow">
                        <Link href={isLoaded ? `tel:${phoneNumber}` : 'tel:'}>
                            <PhoneIcon />
                        </Link>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-white text-xl md:text-2xl font-semibold tracking-wide">
                            {isLoaded ? phoneNumber : 'Loading...'}
                        </p>
                    </div>
                </div>

                <span className='text-xs md:text-sm text-gray-400 uppercase tracking-widest px-4 py-1 rounded-full border border-white/10 bg-black/40'>
                    Call our demo A.I voice agent
                </span>
            </div>
        </div>
    );
}

// Export the dynamically imported component with SSR disabled
const Hero = dynamic(() => Promise.resolve(HeroComponent), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-6">
                Call The<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Future Now.</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-300 max-w-2xl mb-12'>
                Empowering businesses to rapidly build & deploy AI agents
            </p>
            <div className="flex flex-col items-center gap-6">
                 <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-full pl-3 pr-6">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                        <Link href='tel:'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-white text-xl md:text-2xl font-semibold tracking-wide">Loading...</p>
                    </div>
                </div>
                 <span className='text-xs md:text-sm text-gray-400 uppercase tracking-widest px-4 py-1 rounded-full border border-white/10 bg-black/40'>
                    Call our demo A.I voice agent
                </span>
            </div>
        </div>
    )
});

export default Hero
