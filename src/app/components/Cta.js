import React from 'react'
import Link from 'next/link'

function Cta() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Pill */}
      <div className="flex justify-center mb-8">
        <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
          Get Started
        </h2>
      </div>

      <div className="w-full max-w-6xl rounded-[28px] border border-white/5 bg-[#2b2b33]/70 px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-12 lg:px-16">
        <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[42px]">
          Your AI Journey,{' '}
          <span className="bg-gradient-to-r from-[#cf4aea] to-[#3300ff] bg-clip-text text-transparent">
            Supercharged.
          </span>
        </h1>
        <p className="mt-4 text-base font-light text-gray-300 sm:text-lg">
          Ready to Converse with Tomorrow? Xtreme Gen AI is Here.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#cf4aea] via-[#a800ca] to-[#6f00ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6f00ff40] transition hover:translate-y-[-1px] hover:shadow-[#6f00ff60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f00ff]"
        >
          Contact Us &amp; Get Started
        </Link>
      </div>
    </section>
  )
}

export default Cta
