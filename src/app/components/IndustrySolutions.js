import React from 'react';

const IndustrySolutions = () => {
  const solutions = [
    {
      title: "Education",
      desc: "Automate student queries, onboarding and course guidance."
    },
    {
      title: "Travel",
      desc: "Assist travellers with bookings, itinerary changes and support."
    },
    {
      title: "Healthcare",
      desc: "Streamline appointment scheduling and patient follow-ups."
    },
    {
      title: "Insurance",
      desc: "Handle policy enquiries, claims initiation and renewals."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-24 mb-24">
       <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-6">Industry-Agnostic Solutions</h2>
       <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
         Our voice AI is built to serve any industry. Here are a few examples — and we’re already partnering with many more.
       </p>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, index) => (
            <div key={index} className="bg-[#17172e] border border-[#2b2b40] rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#ad4aea] transition-colors duration-300">
               <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
               <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
       </div>
    </div>
  );
};

export default IndustrySolutions;
