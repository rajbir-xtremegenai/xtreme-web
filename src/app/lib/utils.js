import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @param {...import('clsx').ClassValue} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/dummyListings.js
// export const dummyListings = Array.from({ length: 15 }).map((_, index) => ({
//   id: index + 1,
//   imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
//   title: `Generic SUV Model ${index + 1}`,
//   year: '2023',
//   subDescription: 'Spacious and versatile SUV for all terrains.',
//   price: `$${Math.floor(30000 + index * 1000)}`, // Deterministic price
//   miles: `${25 + index * 5} Miles`, // Deterministic mileage
//   fuelType: 'Petrol',
//   transmission: 'Automatic',
// }));

// brandsData array
// This array can be used to dynamically generate brand logos and names
// in components like AllBrands.js or CarsPage.js.

export const carTypes = [
  { key: 'suv', name: 'SUV', icon: '/ic_suv.png' },
  { key: 'sedan', name: 'Sedan', icon: '/ic_sedan.png' },
  { key: 'hatchback', name: 'Hatchback', icon: '/ic_hatchback.png' },
  // { key: 'coupe', name: 'Coupe', icon: '/ic_coupe.png' },
  // { key: 'convertible', name: 'Convertible', icon: '/ic_convertible.png' },
  { key: 'pickup-truck', name: 'Pickup Truck', icon: '/ic_pickup_truck.png' },
  // { key: 'minivan', name: 'Minivan', icon: '/ic_minivan.png' },
  // { key: 'wagon', name: 'Wagon', icon: '/ic_wagon.png' },
];

export function getCarTypeDisplayName(carTypeKey) {
  console.log('getCarTypeDisplayName called with:', carTypeKey);
  if (!carTypeKey) return carTypeKey; // Return as is if falsy
  const lowerCaseKey = carTypeKey.toLowerCase();
  const carType = carTypes.find(car => car.key === lowerCaseKey || car.name.toLowerCase() === lowerCaseKey);
  return carType ? carType.name : carTypeKey; // Fallback to original key if not found
}

export const brandsData = [
  // { key: 'audi', name: 'Audi', logo: '/ic_audi.svg' },
  // toyota
  { key: 'toyota', name: 'Toyota', logo: '/ic_toyota.svg' },
  // { key: 'honda', name: 'Honda', logo: '/ic_honda.svg' },
  { key: 'bmw', name: 'BMW', logo: '/ic_bmw.svg' },
  { key: 'chevrolet', name: 'Chevrolet', logo: '/ic_chevrolet.svg' },
  { key: 'ford', name: 'Ford', logo: '/ic_ford.svg' },
  { key: 'nissan', name: 'Nissan', logo: '/ic_nissan.svg' },
  // { key: 'mercedes-benz', name: 'Mercedes Benz', logo: '/ic_benz.svg' },
  // { key: 'peugeot', name: 'Peugeot', logo: '/ic_peugeot.svg' },
  // { key: 'volkswagen', name: 'Volkswagen', logo: '/ic_volkswagen.svg' },
];

export function getBrandDisplayName(brandName) {
  console.log('getBrandDisplayName called with:', brandName);
  if (!brandName) return brandName; // Return as is if falsy
  const lowerCaseBrand = brandName.toLowerCase();
  const brand = brandsData.find(b => b.key === lowerCaseBrand || b.name.toLowerCase() === lowerCaseBrand);
  return brand ? brand.name : brandName; // Fallback to original name if not found
}

export function parseValueWithUnit(str) {
  if (!str || typeof str !== 'string') {
    return null;
  }

  // Remove commas from numbers
  const cleanedStr = str.replace(/,/g, '');

  // Regex to find the first number (integer or float) and the rest as the unit
  const match = cleanedStr.match(/^(\d*\.?\d+)\s*(.*)$/);

  if (match) {
    const value = parseFloat(match[1]);
    const unit = match[2].trim();
    return { value, unit };
  }

  return null;
}
