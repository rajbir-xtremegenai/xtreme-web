'use client';
import React, { useState, useEffect } from 'react'; // <--- Import useState and useEffect
import { Languages, Hourglass, AppWindow, Signal } from 'lucide-react';

const Features = () => {
  const [isMounted, setIsMounted] = useState(false); // <--- 1. Define state

  useEffect(() => {
    setIsMounted(true); // <--- 2. Set state to true on client mount
  }, []);

  // 3. Conditional rendering: Render null or a basic placeholder until mounted
  // Since the entire component is rendered, this might be overkill, 
  // but it's the safest way to ensure client-only rendering if the 
  // mismatch is deep within the component's dependencies.
  if (!isMounted) {
    // You can return a simple placeholder to reserve space if needed, 
    // or just null if you don't mind the layout shift.
    // For now, let's return null to see if it fixes the issue.
    return null;
  }

  const features = [
    // ... (rest of your features array)
    {
      title: "Language Neutral",
      description: "Communicates effortlessly in multiple languages.",
      icon: Languages,
    },
    {
      title: "24/7 Availability",
      description: "Ensures uninterrupted service at all times.",
      icon: Hourglass,
    },
    {
      title: "CRM Integration",
      description: "Syncs real-time with your CRM for seamless operations.",
      icon: AppWindow,
    },
    {
      title: "Scalable Traffic Management",
      description: "Adapts instantly to handle fluctuations in demand.",
      icon: Signal,
    },
  ];

  return (
    <div className="w-full relative z-10 py-12 md:py-20 font-[family-name:var(--font-lexend)]">
      {/* ... (rest of your component JSX remains unchanged) ... */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Pill */}
        <div className="flex justify-center mb-16">
          <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
            Product Features
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] md:w-[80%] mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-row items-start gap-5 p-5 md:p-6 rounded-2xl 
                         border-[1px] border-dashed border-[#6b6b7a] 
                         bg-[#0b0b11]/40 transition-colors duration-300 
                         hover:border-[#9747FF]/60 min-h-[110px] md:min-h-[130px]"
              >
                {/* Icon Circle */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full 
                                bg-gradient-to-b from-[#9747FF] to-[#6f00ff] 
                                flex items-center justify-center 
                                shadow-[0_10px_30px_rgba(103,16,255,0.12)] ring-1 ring-white/5">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className="text-white text-[15px] md:text-[17px] font-semibold mb-1.5"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-[12.5px] md:text-[14px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;