import React from 'react'

function HeadImg() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        id="video-background"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/vidBg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to darken video slightly for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  )
}

export default HeadImg
