import React from 'react';

const Usecase = () => {
  const useCases = [
    {
      icon: "📞",
      title: "Lead Qualification",
      desc: "Engage prospects, ask the right questions and qualify them automatically — saving your team valuable time."
    },
    {
      icon: "📅",
      title: "Appointment Booking",
      desc: "Schedule demos and meetings through natural conversations, seamlessly syncing with your calendar."
    },
    {
      icon: "🗣️",
      title: "Feedback Collection",
      desc: "Collect actionable feedback via voice-based surveys and understand your customers better."
    },
    {
      icon: "🤝",
      title: "Customer Support",
      desc: "Resolve common queries and issues around the clock without human intervention."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-24 mb-24">
       <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-12">Some of Our Use Cases</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, index) => (
            <div key={index} className="bg-[#17172e] border border-[#2b2b40] rounded-2xl p-8 flex flex-col items-start hover:border-[#ad4aea] transition-colors duration-300">
               <div className="text-5xl mb-6">{item.icon}</div>
               <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
               <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
       </div>
    </div>
  );
};

export default Usecase;
