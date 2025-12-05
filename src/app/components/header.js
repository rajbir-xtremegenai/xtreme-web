"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar'; // Import the new Sidebar component
import { carTypes, brandsData } from '../lib/utils';
const navLinks = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'type',
    label: 'Type',
    dropdown: true,
    items: carTypes.map(car => ({
      id: car.key,
      label: car.name,
      href: `/type/${car.key}`
    })),
  },
  {
    id: 'make',
    label: 'Make',
    dropdown: true,
    items: brandsData.map(brand => ({
      id: brand.key,
      label: brand.name,
      href: `/cars/${brand.key}`
    })),
  },
  { id: 'blogs', label: 'Blogs', href: '/blogs' },
  // { id: 'about', label: 'About', href: '/about' },
  // { id: 'contact', label: 'Contact', href: '/contact' },
];


const HeaderBar = () => {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (type, e) => {
    if (e) e.stopPropagation();
    if (type === 'type') {
      setShowTypeDropdown(!showTypeDropdown);
      setShowMakeDropdown(false);
    } else if (type === 'make') {
      setShowMakeDropdown(!showMakeDropdown);
      setShowTypeDropdown(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Close dropdowns if click is outside
      // This part might need refinement if it closes dropdowns too aggressively
      // For now, let's assume clicks on dropdown buttons themselves stop propagation
      if (!event.target.closest('.dropdown-button-desktop') && !event.target.closest('.sidebar-dropdown-button')) {
        setShowTypeDropdown(false);
        setShowMakeDropdown(false);
      }
    };

    document.body.addEventListener('click', handleDocumentClick);
    return () => document.body.removeEventListener('click', handleDocumentClick);
  }, []);

  const closeAllMenus = () => {
    setShowTypeDropdown(false);
    setShowMakeDropdown(false);
    setIsMobileMenuOpen(false); // This will also trigger closeMenu in Sidebar via prop
  };

  const toggleMobileMenu = (e) => {
    if (e) e.stopPropagation();
    const newOpenState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newOpenState);
    // If opening the menu, ensure dropdowns are closed initially
    if (newOpenState) {
      setShowTypeDropdown(false);
      setShowMakeDropdown(false);
    }
  };

  return (
    <>
      <header className="shadow-md py-4 main-container bg-white">
        <div className="crelative z-30 flex items-center justify-between text-black">
          <div className="flex items-center">
            {/* Site Logo/Title */}
            <Link href="/" className="flex items-center ml-4">
              <Image src="/carsinusalogo.png" alt="Logo" width={160} height={50} className='h-auto' priority />
            </Link>
          </div>

          <nav className="mt-4 md:mt-0">
            <div className="hidden md:flex md:items-center">
              <ul className="flex list-none gap-8 items-center">
                {navLinks.map((link) => (
                  <li key={link.id} className="relative">
                    {link.dropdown ? (
                      <>
                        <button
                          className="dropdown-button-desktop flex items-center"
                          onClick={(e) => toggleDropdown(link.id, e)}
                        >
                          {link.label} <Image src="/ic_down_arrow.svg" alt="Dropdown arrow" width={12} height={12} className="ml-1" />
                        </button>
                        {((link.id === 'type' && showTypeDropdown) || (link.id === 'make' && showMakeDropdown)) && (
                          <ul className="absolute top-full z-50 mt-2 w-36 rounded-md border border-gray-200 bg-white text-gray-900 shadow-lg">
                            {link.items.map((item) => (
                              <li key={item.id}>
                                <Link
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  href={item.href}
                                  onClick={() => { // Close dropdowns on link click
                                    setShowTypeDropdown(false);
                                    setShowMakeDropdown(false);
                                  }}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <Sidebar
        isOpen={isMobileMenuOpen}
        closeMenu={closeAllMenus} // Pass closeAllMenus which also closes dropdowns
        navLinks={navLinks}
        showTypeDropdown={showTypeDropdown}
        setShowTypeDropdown={setShowTypeDropdown}
        showMakeDropdown={showMakeDropdown}
        setShowMakeDropdown={setShowMakeDropdown}
      />
    </>
  );
};

export default HeaderBar;
