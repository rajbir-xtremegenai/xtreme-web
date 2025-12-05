import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for client-side navigation
import { brandsData, getBrandDisplayName } from '../lib/utils';


const AllBrands = ({ showAllButton }) => { // Accept brands as a prop
  if (!brandsData || brandsData.length === 0) {
    // Optional: render a message or null if no brands are provided
    return <p className="text-center text-gray-500">No brands to display.</p>;
  }

  return (
    // <div className="bg-white py-10 sm:py-16"> {/* Changed background to white and adjusted padding */}
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6 sm:mb-10"> {/* Adjusted margin bottom */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Premium Brands</h2> {/* Adjusted font size and weight */}
        {showAllButton &&
          <Link href="/cars">
            <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              Show All Brands
              <Image
                src="/ic_upper_arrow.svg"
                alt="View All"
                width={16}
                height={16}
                className="h-auto ml-2 h-4 w-4" />
            </div>
          </Link>
        }
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brandsData.map((brand) => {
          const brandNameForUrl = brand.key.toLowerCase().replace(/\s+/g, '-');
          const href = `/cars/${brandNameForUrl}`;

          return (
            <Link key={brand.key} href={href}>
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer group h-full">
                <span className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 ease-in-out text-center">
                  {brand.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
    // </div>
  );
};

export default AllBrands;
