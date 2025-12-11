'use client'
import React, { useState } from 'react'
import Link from 'next/link'

function Navbar() {
  const [navOpen, setnavOpen] = useState(false)

  function openNav() {
    setnavOpen(true)
  }

  function closeNav() {
    setnavOpen(false)
  }

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 md:px-12 fixed w-full top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          <h2 className="text-white text-xl font-bold tracking-wide">Xtreme Gen AI</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</Link>
          <Link href="/#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</Link>
          <Link href="/#usecase" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Use Cases</Link>
          <Link href="/#whyus" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Why Us</Link>
          <Link href="/#blogs" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Blogs</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href='/contact' className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={openNav} className="text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {navOpen && (
        <div className={`fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${navOpen ? "opacity-100" : "opacity-0"}`}>
          <Link href="/" onClick={closeNav} className="text-white text-xl font-medium hover:text-purple-400">Home</Link>
          <Link href="/#features" onClick={closeNav} className="text-white text-xl font-medium hover:text-purple-400">Features</Link>
          <Link href="/#usecase" onClick={closeNav} className="text-white text-xl font-medium hover:text-purple-400">Use Cases</Link>
          <Link href="/#whyus" onClick={closeNav} className="text-white text-xl font-medium hover:text-purple-400">Why Us</Link>
          <Link href="/#blogs" onClick={closeNav} className="text-white text-xl font-medium hover:text-purple-400">Blogs</Link>

          <Link href='/contact' onClick={closeNav} className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-medium">
            Contact Us
          </Link>

          <button onClick={closeNav} className="absolute top-6 right-6 text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
              <path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar
