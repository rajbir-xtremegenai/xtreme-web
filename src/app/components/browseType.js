// src/components/browseType.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { carTypes } from '../lib/utils';

const BrowseType = ({ showAllButton }) => {
  return (
    <div className="container py-4">
      {/* <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 "> */}
      {/* <h2 className="text-2xl font-bold mb-5 text-gray-800">Browse by Type</h2> */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Browse by Type</h2>
        {showAllButton && <Link href="/type">
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
        }
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
        {carTypes.map((type) => (
          <Link key={type.name} href={`/type/${type.key}`} passHref>
            <div className="flex flex-col shadow-md items-center justify-center p-4 rounded-2xl bg-white transition-shadow duration-200 ease-in-out transform hover:-translate-y-1 border border-[#E9E9E9]">
              <div className="relative w-24 h-16 mb-2"> {/* Adjusted icon container for better aspect ratio control */}
                <Image
                  src={type.icon}
                  alt={type.name}
                  width={24}
                  height={0}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">{type.name}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default BrowseType;
