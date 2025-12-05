'use client';
import Image from 'next/image';
import Link from 'next/link';
import { event } from '../lib/gtag';

// http://localhost:3000/cars/audi/SUV-audi-Q5
const CarCard = ({ car, isDark = false, priority = false }) => {
  const {
    make,
    slug,
    imageUrl,
    title,
    year,
    subDescription,
    price,
    miles,
    fuelType,
    transmission,
  } = car;

  const handleCarCardClick = () => {
    event({
      action: 'car_card_clicked',
      params: {
        car_title: title,
      },
    });
  };

  const themeClasses = isDark
    ? 'bg-[#050B20] text-white'
    : 'bg-white text-gray-800';

  const h2Class = isDark ? 'text-white' : 'text-gray-800';
  const pClass = isDark ? 'text-white' : 'text-gray-800';
  const spanClass = isDark ? 'text-white' : 'text-gray-800';
  // const priceClass = isDark ? 'text-white' : 'text-gray-800';
  // const viewDetailsLinkClass = isDark ? 'text-blue-400' : 'text-blue-600';

  // Filter out undefined or null values for conditional rendering
  const details = [
    miles && { icon: '/ic_meter.svg', alt: 'Mileage Icon', value: miles },
    fuelType && { icon: '/ic_petrol_pump.svg', alt: 'Fuel Type Icon', value: fuelType },
    transmission && { icon: '/ic_engine.svg', alt: 'Transmission Icon', value: transmission },
  ].filter(Boolean); // Remove falsy values

  return (
    <Link href={`/cars/${make}/${slug}`} passHref>
      <div onClick={handleCarCardClick} className={`max-w-sm rounded-md shadow-2xl overflow-hidden hover:-translate-y-1 ${isDark ? 'bg-[#050B20]' : 'bg-white'}`}>
        {imageUrl && (
          <div className="relative h-56">
            <Image
              className="w-full object-cover"
              src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${imageUrl}`}
              alt={`${title || 'Car'} ${year || ''}`}
              fill
              sizes="(max-width: 384px) 100vw, 384px"
              priority={priority}
            />
          </div>
        )}
        <div className={`p-5 ${themeClasses}`}>
          {(title || year) && (
            <h2 className={`font-semibold text-lg mb-2 ${h2Class}`}>
              {title} {year && `- ${year}`}
            </h2>
          )}
          {subDescription && (
            <p className={`text-sm mb-4 ${pClass}`}>{subDescription}</p>
          )}
          {details.length > 0 && <hr className={`my-4 ${isDark ? 'border-gray-700' : ''}`} />}

          {details.length > 0 && (
            <div className={`flex justify-around items-center text-center text-sm mb-4 ${spanClass}`}>
              {details.map((detail, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={detail.icon}
                    alt={detail.alt}
                    width={20}
                    height={20}
                    className={`mb-1 ${isDark ? 'filter invert' : ''}`}
                  />
                  <span>{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
export default CarCard;