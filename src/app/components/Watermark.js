import React from 'react'
import Link from 'next/link'

function Watermark() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1 py-1 px-2 rounded-full border border-white/30 bg-black/60 backdrop-blur-md text-white text-xs opacity-80 hover:opacity-100 transition-opacity">
      <Link href="https://theanshumansingh.com" target="_blank" className="flex items-center gap-1 font-bold no-underline text-white">
        <button className="bg-transparent border-0 flex items-center justify-center text-white text-xs gap-1 cursor-pointer p-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Anshuman
        </button>
      </Link>
    </div>
  )
}

export default Watermark
