'use client';
import React, { useState, useEffect } from 'react';
import {
  Webhook,
  PhoneCall,
  Settings2,
  UserCheck,
  Languages,
  Cpu,
  LayoutDashboard,
  ClipboardList,
  Mic,
  FileAudio
} from 'lucide-react';

const Features = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const features = [
    { title: "API calling", icon: Webhook },
    { title: "Bulk calling", icon: PhoneCall },
    { title: "Customised campaigns", icon: Settings2 },
    { title: "Human transfer", icon: UserCheck },
    { title: "Multilingual", icon: Languages },
    { title: "Flexible model selection", icon: Cpu },
    { title: "Dashboard", icon: LayoutDashboard },
    { title: "Disposition & summary", icon: ClipboardList },
    { title: "Call recording", icon: Mic },
    { title: "Transcription", icon: FileAudio },
  ];

  return (
    <div className="w-full relative z-10 py-12 md:py-20 font-[family-name:var(--font-lexend)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Pill */}
        <div className="flex justify-center mb-10 md:mb-16">
          <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
            Product Features
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6 w-full mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-row items-center gap-4 p-4 rounded-xl
                         border-[1px] border-dashed border-[#6b6b7a] 
                         bg-[#0b0b11]/40 transition-colors duration-300 
                         hover:border-[#9747FF]/60 hover:bg-[#0b0b11]/60"
              >
                {/* Icon Circle */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full
                                bg-gradient-to-b from-[#9747FF] to-[#6f00ff] 
                                flex items-center justify-center 
                                shadow-[0_10px_30px_rgba(103,16,255,0.12)] ring-1 ring-white/5">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className="text-white text-[15px] md:text-[16px] font-semibold"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {feature.title}
                  </h3>
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
