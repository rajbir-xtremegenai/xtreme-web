"use client"
import React, { useState } from 'react';
import CarCard from './CarCard'; // Assuming ListingCard is in the same directory
import Image from 'next/image';
import Link from 'next/link';


const AllVehicles = ({ recentCars, featuredCars, popularCars }) => {
  const [activeTab, setActiveTab] = useState('Recent Cars');

  const sections = [
    { title: 'Recent Cars', listings: recentCars },
    { title: 'Featured Cars', listings: featuredCars },
    { title: 'Popular Cars', listings: popularCars },
  ];

  const activeSection = sections.find(section => section.title === activeTab);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Explore All Vehicles</h2>
        <Link href="/cars">
          <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            View All
            <Image
              src="/ic_upper_arrow.svg"
              alt="View All"
              width={16}
              height={16}
              className="h-auto ml-2 h-4 w-4" />
          </div>
        </Link>
      </div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {sections.map((section) => (
            <button
              key={section.title}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === section.title
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setActiveTab(section.title)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {activeSection && activeSection.listings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeSection.listings.map(listing => (
            <CarCard key={listing.carId} car={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVehicles;
