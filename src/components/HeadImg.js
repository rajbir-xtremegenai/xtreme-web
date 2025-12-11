import React from 'react'

function HeadImg() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden mix-blend-overlay opacity-40">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/vidBg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
    </div>
  )
}

export default HeadImg
