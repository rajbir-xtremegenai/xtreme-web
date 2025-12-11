'use client';
import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [navOpen, setnavOpen] = useState(false);

  function openNav() {
    setnavOpen(true);
  }

  function closeNav() {
    setnavOpen(false);
  }

  return (
    <>
      <nav className="flex items-center justify-between py-5 px-[5%] w-full fixed top-0 left-0 z-50 bg-[#07071b] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 no-underline text-white font-[var(--font-outfit)]">
          <img src="/logo.svg" alt="Logo" className="w-[40px]" />
          <h2 className="text-xl font-bold">Xtreme Gen AI</h2>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm font-light">Home</Link>
          <Link href="/#features" className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm font-light">Features</Link>
          <Link href="/#usecase" className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm font-light">Use Cases</Link>
          <Link href="/#whyus" className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm font-light">Why Us</Link>
          <Link href="/#blogs" className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm font-light">Blogs</Link>
        </div>
        <div className="hidden md:block">
          <Link href='/contact' className="px-6 py-2 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white text-sm hover:bg-white hover:text-black transition-all">
            Contact Us
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={openNav} className="bg-transparent border-none cursor-pointer flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </nav>
      {navOpen && (
        <div className={`fixed top-0 right-0 w-[250px] h-full bg-[#07071b] z-[60] flex flex-col gap-6 p-8 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ${navOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-end">
             <button onClick={closeNav} className="bg-transparent border-none cursor-pointer text-white">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
             </button>
          </div>
          <Link href="/" className="text-white text-lg font-medium" onClick={closeNav}>Home</Link>
          <Link href="/#features" className="text-white text-lg font-medium" onClick={closeNav}>Features</Link>
          <Link href="/#usecase" className="text-white text-lg font-medium" onClick={closeNav}>Use Cases</Link>
          <Link href="/#whyus" className="text-white text-lg font-medium" onClick={closeNav}>Why Us</Link>
          <Link href="/#blogs" className="text-white text-lg font-medium" onClick={closeNav}>Blogs</Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
