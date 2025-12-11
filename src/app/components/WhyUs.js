import React from 'react';

// Custom component for the numbered icon, now slightly larger to match the visual weight
const NumberedIcon = ({ number }) => {
  // Increased size to w-12 h-12 (48px) and text size to 'xl' (20px) 
  // to better match the prominence in the example image.
  return (
    <div
      className="
        w-12 h-12 p-2 
        rounded-full 
        flex items-center justify-center 
        text-white text-xl font-bold 
        bg-gradient-to-tr from-[#C24AEA] via-[#5B00CA] to-[#6F00FF]
      "
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white"
      >
        {number}
      </div>


    </div>
  );
};

// Updated Card Component to match the specific text styles
const WhyUsCard = ({ number, title, description }) => {
  return (
    <div
      className="
        p-6 md:p-4
        bg-black/20 
        rounded-xl 
        border-1 border-dashed border-white/40    /* <-- Updated */
        shadow-xl shadow-black/30
        min-h-[160px] flex flex-col items-start
      "
    >
      <NumberedIcon number={number} />
      <div className="mt-4">
        <h3 className="text-white text-md font-extrabold mb-2 leading-tight">
          {title}
        </h3>

        <p className="text-white/70 text-sm font-light">
          {description}
        </p>
      </div>
    </div>
  );
};


function WhyUs() {
  const features = [
    {
      number: 1,
      title: 'Human-Like Voice',
      description: 'Delivers natural-sounding interactions across multiple languages.',
    },
    {
      number: 2,
      title: 'Interruption Handling',
      description: 'Manages pauses and adjusts responses in real time.',
    },
    {
      number: 3,
      title: 'Custom Training',
      description: 'Tailored AI agents to fit your business needs.',
    },
    {
      number: 4,
      title: 'Low Latency',
      description: 'Provides fast, seamless replies for better engagement.',
    },
  ];

  return (
    // Outer container with dark background and padding
    <section className="py-20 bg-black min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Centered "WHY US?" header with custom styling */}
        <div className="text-center mb-16">
          <span
            className="
              text-xs uppercase tracking-widest font-medium 
              text-purple-400 
              px-6 py-2 
              rounded-full 
              bg-purple-900/40 
              shadow-lg shadow-purple-900/50
              inline-block
            "
          >
            Why Us?
          </span>
        </div>

        {/* 4-Column Grid for the feature cards */}
        <div
          className="
            grid 
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
            gap-8 lg:gap-6 xl:gap-8
          "
        >
          {features.map((feature) => (
            <WhyUsCard
              key={feature.number}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;