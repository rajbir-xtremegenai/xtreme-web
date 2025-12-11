'use client'
import React, { useEffect, useState } from 'react';

const BrandScroller = () => {
    // First row brands
    const clientsTop = [
        { name: "DRA Homes", logo: "/brands/DRAhomes.png" },
        { name: "Brevistay", logo: "/brands/Brevistay.png" },
        { name: "HexaHealth", logo: "/brands/HexaHealth.png" },
        { name: "ChoiceConnect", logo: "/brands/choiceconnect-logo.png" },
        { name: "Bajaj Capital", logo: "/brands/BajajCapital.png" },
        { name: "Beshak", logo: "/brands/beshak-logo-final.png" },
        { name: "Dezy Dental", logo: "/brands/dezy-logo.png" },
        { name: "Novel Vista", logo: "/brands/novel-final-white.png" },
        { name: "MarketmyHotel", logo: "/brands/MMH-Logo-Photoroom.png" },
        { name: "Avaan Excess", logo: "/brands/avaan-excess-logo-final.png" },
        { name: "Menteso", logo: "/brands/Menteso-Logo.svg" },
        { name: "Wanderon", logo: "/brands/wanderon-white-text.png" },
        { name: "Hikeedu", logo: "/brands/hike-edu-logo.png" },
    ];

    // Second row brands
    const clientsBottom = [
        { name: "MY-HQ", logo: "/brands/my-hq-logo-final.png" },
        { name: "Shunya", logo: "/brands/Shunya-logo-Photoroom.png" },
        { name: "Messold", logo: "/brands/messold-final.png" },
        { name: "30Sundays", logo: "/brands/30sundays.png" },
        { name: "Insurance Samadhan", logo: "/brands/InsuranceSamadhan.png" },
        { name: "ValuEnable", logo: "/brands/ValuEnable.png" },
        { name: "Qdesq", logo: "/brands/Qdesq.png" },
        { name: "Vasupujya", logo: "/brands/vasupujya.png" },
        { name: "ForeignAdmits", logo: "/brands/foreignadmits-logo.png" },
        { name: "iThrive Academy", logo: "/brands/ithrive-Academy.png" },
    ];

    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * (clientsTop.length + clientsBottom.length));
                setActiveIndex(randomIndex);
                setTimeout(() => setActiveIndex(null), 1500);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isHovered, clientsTop.length, clientsBottom.length]);

    const getAnimationDuration = (speedClass) => {
        if (speedClass === "speed-fast") return "20s";
        return "35s"; // default speed-slow
    };

    const renderLogos = (clients, reverse = false, speedClass = "") => {
        const duration = getAnimationDuration(speedClass);
        const animationName = reverse ? 'scroll-right' : 'scroll-left';

        return (
            <div
                className={`flex items-center w-fit hover:[animation-play-state:paused]`}
                style={{ animation: `${animationName} ${duration} linear infinite` }}
            >
                {/* Original Set */}
                {clients.map((client, index) => (
                    <div
                        key={`logo-1-${reverse ? 'r' : ''}-${index}`}
                        className={`
                            flex flex-col items-center p-[15px] transition-all duration-500 relative group/logo
                            mx-[15px] min-w-[80px]
                            min-[480px]:mx-[20px] min-[480px]:min-w-[100px]
                            md:mx-[40px] md:min-w-[120px]
                            ${activeIndex === index ? 'highlight' : ''}
                        `}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <div className="relative w-[200px] h-auto flex items-center justify-center overflow-hidden">
                            <img
                                src={client.logo}
                                alt={client.name}
                                className={`
                                    max-w-full max-h-full object-contain relative z-[2] filter-none
                                    group-hover/logo:brightness-100 group-hover/logo:grayscale-0
                                    ${activeIndex === index ? 'brightness-100 grayscale-0' : ''}
                                `}
                            />
                            <div className={`
                                absolute rounded-full transition-all duration-500 ease-in-out
                                bg-[radial-gradient(circle,rgba(151,71,255,0.6)_0%,transparent_70%)]
                                w-0 h-0 opacity-0
                                group-hover/logo:opacity-80
                                group-hover/logo:w-[85px] group-hover/logo:h-[85px]
                                min-[480px]:group-hover/logo:w-[100px] min-[480px]:group-hover/logo:h-[100px]
                                md:group-hover/logo:w-[120px] md:group-hover/logo:h-[120px]
                                ${activeIndex === index ? 'opacity-80 w-[85px] h-[85px] min-[480px]:w-[100px] min-[480px]:h-[100px] md:w-[120px] md:h-[120px]' : ''}
                            `}></div>
                        </div>
                        <span className={`
                            mt-[15px] text-[0.85rem] text-transparent transition-all duration-400 text-center
                            group-hover/logo:text-[#9747FF]
                            ${activeIndex === index ? 'text-[#9747FF]' : ''}
                        `}>{client.name}</span>
                    </div>
                ))}
                {/* Duplicate Set for Infinite Scroll */}
                {clients.map((client, index) => (
                    <div
                        key={`logo-2-${reverse ? 'r' : ''}-${index}`}
                        className={`
                            flex flex-col items-center p-[15px] transition-all duration-500 relative group/logo
                            mx-[15px] min-w-[80px]
                            min-[480px]:mx-[20px] min-[480px]:min-w-[100px]
                            md:mx-[40px] md:min-w-[120px]
                        `}
                    >
                        <div className="relative w-[200px] h-auto flex items-center justify-center overflow-hidden">
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="max-w-full max-h-full object-contain relative z-[2] filter-none"
                            />
                            {/* Glow effect only needed on interactive elements or if we want the duplicate to interact too.
                                The original code didn't put onMouseEnter on the duplicate set,
                                so duplicates are just visual fillers in the original code.
                                I will keep them simple as per original code structure.
                            */}
                             <div className="absolute rounded-full transition-all duration-500 ease-in-out bg-[radial-gradient(circle,rgba(151,71,255,0.6)_0%,transparent_70%)] w-0 h-0 opacity-0 group-hover/logo:opacity-80 group-hover/logo:w-[85px] group-hover/logo:h-[85px] min-[480px]:group-hover/logo:w-[100px] min-[480px]:group-hover/logo:h-[100px] md:group-hover/logo:w-[120px] md:group-hover/logo:h-[120px]"></div>
                        </div>
                        <span className="mt-[15px] text-[0.85rem] text-transparent transition-all duration-400 text-center group-hover/logo:text-[#9747FF]">
                            {client.name}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full py-2.5 relative overflow-hidden mx-auto rounded-[20px] brand-scroller-container">
            <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
                Trusted By 50+ Brands
            </h2>

            {/* First row - Right to Left */}
            <div
                className="relative w-full overflow-hidden py-[30px] mb-0 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {renderLogos(clientsTop, false, "speed-slow")}
            </div>

            {/* Second row - Left to Right */}
            <div
                className="relative w-full overflow-hidden py-[30px] mb-0 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {renderLogos(clientsBottom, true, "speed-slow")}
            </div>
        </div>
    );
};

export default BrandScroller;
