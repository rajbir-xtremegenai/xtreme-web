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

    const Content = ({ phone, loading = false }) => (
        <div className="w-full flex flex-col items-center justify-center pt-12 md:pt-[50px] top-[12vh] md:top-[20vh] relative z-10 px-4">
            <h1 className="text-[40px] md:text-[60px] xl:text-[90px] font-[900] leading-[1] md:leading-[0.9] uppercase text-center font-[family-name:var(--font-outfit)] mt-5 md:mt-0 max-w-[80%] xl:max-w-none min-h-[90px] xl:min-h-0">
                Call The<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-clr1)] to-[var(--color-clr2)]">Future Now.</span>
            </h1>
            <p className='text-[16px] md:text-[20px] font-[200] w-[90%] md:w-[50%] xl:w-[30%] mx-auto mt-2.5 md:mt-5 text-center text-white/65 leading-[1]'>Empowering businesses to rapidly build & deploy AI agents</p>

            <div className="mt-10 md:mt-0">
                <div className="flex items-center justify-center p-[20px] md:p-[30px] w-[80px] md:w-[120px] h-auto bg-white/10 backdrop-blur-[10px] rounded-full border-2 border-white/50 shadow-[0_0_30px_5px_rgba(255,255,255,0.38)] mx-auto my-[40px] md:my-[80px]">
                    <Link href={loading ? 'tel:' : `tel:${phone}`} className="flex items-center justify-center w-full h-full">
                        <svg className="w-[50px] md:w-[60px] h-auto animate-ring-vibration" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                        </svg>
                    </Link>
                </div>

                <div className="flex flex-col items-center gap-[30px] bg-gradient-to-tr from-[#cf4aea] to-[#3300ff] px-[20px] rounded-[100px] backdrop-blur-[10px] border border-white/20 mb-[20px]">
                    <div className="flex items-center justify-center">
                         <p className="text-[22px] md:text-[28px] p-[10px] min-w-[120px] text-white font-[700] text-shadow-strong">{loading ? 'Loading...' : phone}</p>
                    </div>
                </div>

                <div className="text-[14px] text-center px-[20px] py-[5px] mx-auto my-[20px] bg-white/5 backdrop-blur-[10px] rounded-[5px] opacity-80 text-white">
                    Call our demo A.I voice agent
                </div>
            </div>
        </div>
    );

    // Show loading state until client-side detection is complete
    if (!isLoaded) {
        return <Content phone="" loading={true} />;
    }

    return <Content phone={phoneNumber} />;
}

// Loading Component for Dynamic Import
const LoadingComponent = () => (
    <div className="w-full flex flex-col items-center justify-center pt-12 md:pt-[50px] top-[12vh] md:top-[20vh] relative z-10 px-4">
        <h1 className="text-[40px] md:text-[60px] xl:text-[90px] font-[900] leading-[1] md:leading-[0.9] uppercase text-center font-[family-name:var(--font-outfit)] mt-5 md:mt-0 max-w-[80%] xl:max-w-none min-h-[90px] xl:min-h-0">
            Call The<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-clr1)] to-[var(--color-clr2)]">Future Now.</span>
        </h1>
        <p className='text-[16px] md:text-[20px] font-[200] w-[90%] md:w-[50%] xl:w-[30%] mx-auto mt-2.5 md:mt-5 text-center text-white/65 leading-[1]'>Empowering businesses to rapidly build & deploy AI agents</p>

        <div className="mt-10 md:mt-0">
            <div className="flex items-center justify-center p-[20px] md:p-[30px] w-[80px] md:w-[120px] h-auto bg-white/10 backdrop-blur-[10px] rounded-full border-2 border-white/50 shadow-[0_0_30px_5px_rgba(255,255,255,0.38)] mx-auto my-[40px] md:my-[80px]">
                <Link href='tel:' className="flex items-center justify-center w-full h-full">
                    <svg className="w-[50px] md:w-[60px] h-auto animate-ring-vibration" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                        <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                    </svg>
                </Link>
            </div>

            <div className="flex flex-col items-center gap-[30px] bg-gradient-to-tr from-[#cf4aea] to-[#3300ff] px-[20px] rounded-[100px] backdrop-blur-[10px] border border-white/20 mb-[20px]">
                <div className="flex items-center justify-center">
                     <p className="text-[22px] md:text-[28px] p-[10px] min-w-[120px] text-white font-[700] text-shadow-strong">Loading...</p>
                </div>
            </div>

            <div className="text-[14px] text-center px-[20px] py-[5px] mx-auto my-[20px] bg-white/5 backdrop-blur-[10px] rounded-[5px] opacity-80 text-white">
                Call our demo A.I voice agent
            </div>
        </div>
    </div>
);

// Export the dynamically imported component with SSR disabled
const Hero = dynamic(() => Promise.resolve(HeroComponent), {
    ssr: false,
    loading: () => <LoadingComponent />
});

export default Hero
