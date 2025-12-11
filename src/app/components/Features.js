'use client';
import React from 'react';
import { Languages, Hourglass, AppWindow, Signal } from 'lucide-react';

const Features = () => {
  const features = [
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
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Pill */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#1e1035] text-[#9747FF] px-6 py-2 rounded-full text-sm tracking-widest font-medium border border-[#3c2a5a] uppercase">
            Features
          </div>
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
