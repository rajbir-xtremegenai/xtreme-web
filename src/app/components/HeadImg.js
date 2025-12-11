import React from 'react'

function HeadImg() {
  return (
    <div
      className="
        absolute top-0 left-0 w-full
        opacity-50 bg-black
        shadow-[inset_0px_0px_30px_rgba(0,0,0,1)]
        z-[-1]
      "
    >
      <video
        id="video-background"
        autoPlay
        muted
        loop
        className="
          w-full min-h-screen
          object-cover object-center
          relative z-[1]
          pointer-events-none
        "
      >
        <source src="/vidBg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default HeadImg
