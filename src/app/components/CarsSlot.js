import CarCard from './CarCard';
import Image from 'next/image';
import { getBrandDisplayName } from '../lib/utils';


const CarsSlot = ({ title, carsData, isDarkTheme, lgGridCols = 4, link }) => {
  // Ensure carsData is an array and default to an empty array if not
  const validCarsData = Array.isArray(carsData) ? carsData : [];

  // Dynamically construct the grid class
  const gridColsClass = `lg:grid-cols-${lgGridCols}`;

  return (
    // <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">{getBrandDisplayName(title)}</h3>
        {link && (
          <a href={link} className="flex items-center text-lg font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            View All
            <Image
              src="/ic_upper_arrow.svg"
              alt="View All"
              width={16}
              height={16}
              className="h-auto ml-2 h-4 w-4" />
          </a>
        )}
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-8`}>
        {validCarsData.map((car, index) => (
          <CarCard
            key={car.carId}
            car={car}
            isDark={isDarkTheme}
            priority={index < lgGridCols}
          />
        ))}
      </div>
    </div>
  );
};

export default CarsSlot;
