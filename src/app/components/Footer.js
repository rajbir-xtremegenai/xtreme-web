import Link from 'next/link';
import SocialFollow from './SocialFollow';
import { brandsData, carTypes } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6 sm:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            {/* <li><Link href="/about" className="hover:text-gray-400">About Us</Link></li> */}
            <li><Link href="/blogs" className="hover:text-gray-400">Blogs</Link></li>
            {/* <li><Link href="#" className="hover:text-gray-400">FAQs</Link></li> */}
            <li><Link href="/terms" className="hover:text-gray-400">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-gray-400">Privacy</Link></li>
            {/* <li><Link href="/contact" className="hover:text-gray-400">Contact Us</Link></li> */}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Top Brands</h3>
          <ul className="space-y-2">
            {brandsData.slice(0, 5).map((brand) => (
              <li key={brand.key}>
                <Link href={`/cars/${brand.key}`} className="hover:text-gray-400">
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Vehicles Type</h3>
          <ul className="space-y-2">
            {carTypes.slice(0, 5).map((car) => (
              <li key={car.key}>
                <Link href={`/type/${car.key}`} className="hover:text-gray-400">
                  {car.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SocialFollow textColor="text-white" />
      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Xtreme Gen AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
