'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  const [navOpen, setnavOpen] = useState(false)

  function openNav() {
    setnavOpen(true)
  }

  function closeNav() {
    setnavOpen(false)
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Use Cases', href: '/#usecase' },
    { name: 'Why Us', href: '/#whyus' },
    { name: 'Blogs', href: '/#blogs' },
  ]

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 w-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 no-underline">
          {/* Using simple img tag as per original code, or could use Next Image */}
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Xtreme Gen AI
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href='/contact'
            className="px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={openNav} className="p-2 text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
          navOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeNav}
          className="absolute top-6 right-6 p-2 text-white hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={closeNav}
            className="text-2xl font-light text-white hover:text-blue-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <Link
          href='/contact'
          onClick={closeNav}
          className="mt-4 px-8 py-3 rounded-full bg-white text-black font-medium text-lg hover:scale-105 transition-transform"
        >
          Contact Us
        </Link>
      </div>
    </>
  )
}

export default Navbar
