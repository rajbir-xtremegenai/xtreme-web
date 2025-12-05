"use client";
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react'; // For the close button

const Sidebar = ({
  isOpen,
  closeMenu,
  navLinks,
  showTypeDropdown,
  setShowTypeDropdown,
  showMakeDropdown,
  setShowMakeDropdown,
}) => {
  if (!isOpen) return null;

  const handleDropdownToggle = (type, e) => {
    e.stopPropagation(); // Prevent event bubbling that might close the sidebar
    if (type === 'type') {
      setShowTypeDropdown(!showTypeDropdown);
      setShowMakeDropdown(false); // Close other dropdown
    } else if (type === 'make') {
      setShowMakeDropdown(!showMakeDropdown);
      setShowTypeDropdown(false); // Close other dropdown
    }
  };

  const handleLinkClick = () => {
    closeMenu(); // Close sidebar on link click; closeMenu (closeAllMenus) also handles dropdowns
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        onClick={closeMenu} // Close sidebar when overlay is clicked
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm transform bg-white p-5 text-black shadow-lg transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside sidebar from closing it via overlay click
      >
        <div className="flex justify-end">
          <button onClick={closeMenu} className="text-black focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <ul className="mt-8 flex flex-col space-y-4 text-base">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    className="sidebar-dropdown-button flex w-full items-center justify-between" // Added sidebar-dropdown-button class
                    onClick={(e) => handleDropdownToggle(link.id, e)}
                  >
                    {link.label}
                    <Image
                      src="/ic_down_arrow.svg"
                      alt="Dropdown arrow"
                      width={12}
                      height={12}
                      className={`transform transition-transform duration-200 ${
                        (link.id === 'type' && showTypeDropdown) || (link.id === 'make' && showMakeDropdown) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {((link.id === 'type' && showTypeDropdown) || (link.id === 'make' && showMakeDropdown)) && (
                    <ul className="z-50 mt-2 w-full rounded-md border border-gray-200 bg-gray-100 text-black shadow-lg">
                      {link.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            className="block px-4 py-2 hover:bg-gray-700"
                            href={item.href}
                            onClick={handleLinkClick}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link href={link.href} onClick={handleLinkClick}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
