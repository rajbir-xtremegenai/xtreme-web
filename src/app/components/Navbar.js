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
      <nav className="min-w-[90%] md:min-w-[80%] w-max mx-auto mt-[10px] md:mt-[20px] flex items-center justify-between px-[30px] py-[15px] bg-[rgba(87,87,87,0.19)] backdrop-blur-[20px] rounded-[10px] border border-white/10 shadow-[0_0_20px_1px_rgba(179,0,255,0)] fixed left-1/2 -translate-x-1/2 z-50">
        <Link href="/" className="flex items-center gap-[10px] no-underline scale-110 md:scale-100">
          <img src="/logo.svg" alt="Logo" className="w-[40px] bg-white p-[5px] rounded-[10px] h-auto" />
          <h2 className="text-[20px] font-[500] text-white">Xtreme Gen AI</h2>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-[10px]">
          <Link href="/" className="no-underline text-white font-[200] text-[14px] px-[8px] py-[5px] bg-[rgba(128,128,128,0.23)] rounded-[5px] hover:font-[400] transition-all duration-200">Home</Link>
          <Link href="/#features" className="no-underline text-white font-[200] text-[14px] px-[8px] py-[5px] bg-[rgba(128,128,128,0.23)] rounded-[5px] hover:font-[400] transition-all duration-200">Features</Link>
          <Link href="/#usecase" className="no-underline text-white font-[200] text-[14px] px-[8px] py-[5px] bg-[rgba(128,128,128,0.23)] rounded-[5px] hover:font-[400] transition-all duration-200">Use Cases</Link>
          <Link href="/#whyus" className="no-underline text-white font-[200] text-[14px] px-[8px] py-[5px] bg-[rgba(128,128,128,0.23)] rounded-[5px] hover:font-[400] transition-all duration-200">Why Us</Link>
          <Link href="/#blogs" className="no-underline text-white font-[200] text-[14px] px-[8px] py-[5px] bg-[rgba(128,128,128,0.23)] rounded-[5px] hover:font-[400] transition-all duration-200">Blogs</Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block px-[10px]">
          <Link href='/contact' className="text-white bg-gradient-to-r from-[#a54aea] to-[#5d00ff] px-[20px] py-[8px] no-underline rounded-[10px] shadow-[0_0_10px_1px_rgba(255,255,255,0.09)] hover:shadow-[0_0_20px_1px_rgba(255,255,255,0.2)]">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={openNav} className="bg-transparent border-0 flex items-center z-10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed w-full h-screen top-0 m-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[20px] z-[60] transition-all duration-500 ease-in-out ${navOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <button onClick={closeNav} className="absolute top-[20px] right-[20px] bg-transparent border-0 z-10 cursor-pointer">
           <svg className="w-[30px] h-auto" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
             <path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
           </svg>
        </button>

        <Link href="/" onClick={closeNav} className="no-underline text-white text-[20px] text-left my-[10px]">Home</Link>
        <Link href="/#features" onClick={closeNav} className="no-underline text-white text-[20px] text-left my-[10px]">Features</Link>
        <Link href="/#usecase" onClick={closeNav} className="no-underline text-white text-[20px] text-left my-[10px]">Use Cases</Link>
        <Link href="/#whyus" onClick={closeNav} className="no-underline text-white text-[20px] text-left my-[10px]">Why Us</Link>
        <Link href="/#blogs" onClick={closeNav} className="no-underline text-white text-[20px] text-left my-[10px]">Blogs</Link>
      </div>
    </>
  )
}

export default Navbar
