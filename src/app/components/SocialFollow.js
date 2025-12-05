import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/carsinusa_',
    icon: '/follow_instagram.svg',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@CarsInUSAofficial',
    icon: '/follow_youtube.svg',
  },
  {
    name: 'X',
    url: 'https://x.com/CarsInUSA_',
    icon: '/follow_x.svg',
  },
];

const SocialFollow = ({ textColor = "text-gray-900" }) => {
  return (
    <div className="pt-8">
      <h2 className={`text-2xl font-bold text-center ${textColor} mb-6`}>
        🚗 Join the Ride! 🚗
      </h2>
      <div className="flex justify-center items-center gap-6">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
            aria-label={`Follow us on ${social.name}`}
          >
            <Image
              src={social.icon}
              alt={`${social.name} icon`}
              width={28}
              height={28}
              className="w-7 h-7"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialFollow;
