import React from 'react'

function HeadImg() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full min-h-screen -z-10 shadow-[inset_0_0_30px_rgb(0,0,0)] bg-black/50">
        <video id="video-background" className="w-full min-h-screen object-cover object-center relative z-[1] pointer-events-none opacity-60" autoPlay muted loop playsInline>
          <source src="/vidBg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}

export default HeadImg
