'use client'
import React from 'react';
import Image from 'next/image';

const BrandScroller = () => {
    // First row brands (8 items)
    const clientsTop = [
        { name: "DRA Homes", logo: "/brands/DRAhomes.png", width: 150, height: 80 },
        { name: "Brevistay", logo: "/brands/Brevistay.png", width: 150, height: 80 },
        { name: "HexaHealth", logo: "/brands/HexaHealth.png", width: 150, height: 80 },
        { name: "ChoiceConnect", logo: "/brands/choiceconnect-logo.png", width: 150, height: 80 },
        { name: "Bajaj Capital", logo: "/brands/BajajCapital.png", width: 150, height: 80 },
        { name: "Beshak", logo: "/brands/beshak-logo-final.png", width: 150, height: 80 },
        { name: "Dezy Dental", logo: "/brands/dezy-logo.png", width: 150, height: 80 },
        { name: "Novel Vista", logo: "/brands/novel-final-white.png", width: 150, height: 80 },
    ];

    // Second row brands (7 items)
    const clientsBottom = [
        { name: "MarketmyHotel", logo: "/brands/MMH-Logo-Photoroom.png", width: 150, height: 80 },
        { name: "Avaan Excess", logo: "/brands/avaan-excess-logo-final.png", width: 150, height: 80 },
        { name: "Menteso", logo: "/brands/Menteso-Logo.svg", width: 150, height: 80 },
        { name: "Wanderon", logo: "/brands/wanderon-white-text.png", width: 150, height: 80 },
        { name: "MY-HQ", logo: "/brands/my-hq-logo-final.png", width: 150, height: 80 },
        { name: "Shunya", logo: "/brands/Shunya-logo-Photoroom.png", width: 150, height: 80 },
        { name: "Messold", logo: "/brands/messold-final.png", width: 150, height: 80 },
    ];

    return (
        <div className="w-full relative bg-[var(--color-bg-dark)] py-12 md:py-16 px-4 md:px-8">
            {/* Heading */}
            <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 px-4">
                Trusted by leading brands across industries
            </h2>

            {/* Brand Grid Container */}
            <div className="max-w-7xl mx-auto">
                {/* First row - 8 brands */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-5 mb-4 md:mb-6">
                    {clientsTop.map((client, index) => (
                        <div
                            key={`top-${index}`}
                            className="relative group"
                        >
                            <div className="
                                bg-gray-300/20 
                                border border-gray-500/40 
                                rounded-lg 
                                p-3 sm:p-4 md:p-5 lg:p-6 
                                h-20 sm:h-24 md:h-28 lg:h-32 
                                flex items-center justify-center
                                transition-all duration-300
                                hover:border-gray-400/60
                                hover:bg-gray-300/25
                                shadow-[0_0_10px_rgba(255,255,255,0.08),inset_0_0_10px_rgba(255,255,255,0.02)]
                                hover:shadow-[0_0_15px_rgba(255,255,255,0.12),inset_0_0_15px_rgba(255,255,255,0.03)]
                            ">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    width={client.width}
                                    height={client.height}
                                    className="
                                        max-w-[85%] 
                                        max-h-[70%] 
                                        object-contain 
                                        opacity-90 
                                        group-hover:opacity-100
                                        transition-opacity duration-300
                                    "
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Second row - 7 brands (aligned to start with first row) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-5">
                    {clientsBottom.map((client, index) => (
                        <div
                            key={`bottom-${index}`}
                            className="relative group"
                        >
                            <div className="
                                bg-gray-300/20 
                                border border-gray-500/40 
                                rounded-lg 
                                p-3 sm:p-4 md:p-5 lg:p-6 
                                h-20 sm:h-24 md:h-28 lg:h-32 
                                flex items-center justify-center
                                transition-all duration-300
                                hover:border-gray-400/60
                                hover:bg-gray-300/25
                                shadow-[0_0_10px_rgba(255,255,255,0.08),inset_0_0_10px_rgba(255,255,255,0.02)]
                                hover:shadow-[0_0_15px_rgba(255,255,255,0.12),inset_0_0_15px_rgba(255,255,255,0.03)]
                            ">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    width={client.width}
                                    height={client.height}
                                    className="
                                        max-w-[85%] 
                                        max-h-[70%] 
                                        object-contain 
                                        opacity-90 
                                        group-hover:opacity-100
                                        transition-opacity duration-300
                                    "
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandScroller;
