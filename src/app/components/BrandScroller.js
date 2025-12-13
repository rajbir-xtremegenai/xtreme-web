'use client'
import React from 'react';
import Image from 'next/image';

const BrandScroller = () => {
    // ---------------------------------------------------------
    // CONFIGURATION
    // ---------------------------------------------------------
    // scale = Size on Desktop/Tablet
    // mobileScale = Size on Mobile (phones)
    // 1 = Default. 1.3 = 30% larger.

    // Adjusted mobileScale for larger logos to prevent them from being too big/meshed
    const clientsTop = [
        { name: "DRA Homes", logo: "/brands/DRAhomes.png", scale: 1, mobileScale: 1.2 },
        { name: "Brevistay", logo: "/brands/Brevistay.png", scale: 1, mobileScale: 1.1 },
        { name: "HexaHealth", logo: "/brands/HexaHealth.png", scale: 1.1, mobileScale: 1.0 }, // Reduced mobileScale
        { name: "ChoiceConnect", logo: "/brands/choiceconnect-logo.png", scale: 1, mobileScale: 1.0 }, // Reduced mobileScale
        { name: "Bajaj Capital", logo: "/brands/BajajCapital.png", scale: 1, mobileScale: 1.1 },
        { name: "Beshak", logo: "/brands/beshak-logo-final.png", scale: 1, mobileScale: 1.0 }, // Reduced mobileScale
        { name: "Dezy Dental", logo: "/brands/dezy-logo.png", scale: 1.2, mobileScale: 1.2 }, // Slightly reduced
        { name: "Novel Vista", logo: "/brands/novel-final-white.png", scale: 1, mobileScale: 1.0 }, // Reduced mobileScale
    ];

    const clientsBottom = [
        { name: "MarketmyHotel", logo: "/brands/MMH-Logo-Photoroom.png", scale: 1, mobileScale: 1.2 },
        { name: "Avaan Excess", logo: "/brands/avaan-excess-logo-final.png", scale: 1, mobileScale: 1.1 },
        { name: "Menteso", logo: "/brands/Menteso-Logo.svg", scale: 1.1, mobileScale: 1.0 }, // Reduced mobileScale
        { name: "Wanderon", logo: "/brands/wanderon-white-text.png", scale: 1, mobileScale: 1.2 },
        { name: "MY-HQ", logo: "/brands/my-hq-logo-final.png", scale: 1, mobileScale: 1.1 },
        { name: "Shunya", logo: "/brands/Shunya-logo-Photoroom.png", scale: 1.2, mobileScale: 1.1 }, // Reduced mobileScale
        { name: "Messold", logo: "/brands/messold-final.png", scale: 1, mobileScale: 1.2 },
    ];

    const BrandCard = ({ client }) => {
        // Set CSS variables for dynamic scaling
        const style = {
            '--desktop-scale': client.scale || 1,
            '--mobile-scale': client.mobileScale || (client.scale || 1), // Fallback to desktop scale if mobile not set
        };

        return (
            <div className="group relative flex items-center justify-center">
                <div className="w-full h-20 sm:h-24 md:h-28 lg:h-32 bg-gray-300/20 border border-gray-500/40 rounded-lg p-2 sm:p-4 flex items-center justify-center transition-all duration-300 hover:border-gray-400/60 hover:bg-gray-300/25 shadow-[0_0_10px_rgba(255,255,255,0.08),inset_0_0_10px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(255,255,255,0.12),inset_0_0_15px_rgba(255,255,255,0.03)]">
                    {/* 1. We apply the CSS variables to this wrapper.
                       2. We use tailwind arbitrary values `scale-[...]` to read those variables.
                    */}
                    <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 scale-[var(--mobile-scale)] md:scale-[var(--desktop-scale)]" style={style}>
                        <Image
                            src={client.logo}
                            alt={client.name}
                            fill
                            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 15vw"
                            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full relative bg-[var(--color-bg-dark)] py-12 md:py-16 px-4 md:px-8">
            <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 px-4">
                Trusted by leading brands across industries
            </h2>

            <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:gap-5">

                {/* Row 1 Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
                    {clientsTop.map((client, index) => (
                        <BrandCard key={`top-${index}`} client={client} />
                    ))}
                </div>

                {/* Row 2 Centered Flex */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
                    {clientsBottom.map((client, index) => (
                        <div key={`bottom-${index}`} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1.25rem)] lg:w-[calc(12.5%-1.25rem)]">
                            <BrandCard client={client} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandScroller;