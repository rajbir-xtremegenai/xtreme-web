import React from 'react'

const posts = [
  {
    href: 'https://www.linkedin.com/pulse/structured-output-ai-why-gpt-4-leads-way-xtreme-gen-ai-piuec/?trackingId=8K37pQcikWT4zNaCWtso3g%3D%3D',
    image: '/blog1.png',
    emoji: '✨',
    title: 'Structured Output In AI',
    description:
      'Comparison of ChatGPT, Gemini, LLaMA, and Claude for structured data outputs.',
  },
  {
    href: 'https://www.linkedin.com/pulse/power-voice-ai-transforming-business-operations-user-experience-cd5ic/?trackingId=1gNFBNKJAjFwRaHBFjes1w%3D%3D',
    image: '/blog2.png',
    emoji: '🎙️',
    title: 'Power of Voice AI',
    description:
      'Voice AI transforms businesses via multilingual communication & customer engagement.',
  },
  {
    href: 'https://www.linkedin.com/pulse/economic-reality-voice-ai-xtreme-gen-ai-1hzmc/?trackingId=bcO%2BL%2BRFWp06J1RQ1AaPyw%3D%3D',
    image: '/blog3.png',
    emoji: '💸',
    title: 'Economic Reality of Voice AI',
    description:
      'Voice AI revolutionizes customer interactions; strategic cost management ensures scalability and efficiency.',
  },
]

function Blogs() {
  return (
    <section className="mx-auto mt-4 w-11/12 max-w-6xl rounded-2xl px-5 py-10 text-white lg:w-full">
      {/* Header Pill */}
      <div className="flex justify-center mb-8">
        <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
          Blogs
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-white/20 bg-black/20 p-6 shadow-[inset_0_-60px_60px_-10px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-[1.02]"
          >
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-80 transition duration-300 group-hover:opacity-100"
            />
            <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-2xl shadow-[0_0_30px_10px_rgba(255,255,255,0.15)] backdrop-blur-md md:block">
              {post.emoji}
            </span>

            <div className="relative rounded-xl border border-black/30 bg-white/5 p-4 backdrop-blur-lg shadow-[0_0_30px_10px_rgba(0,0,0,0.25)]">
              <h4 className="flex items-center gap-3 text-lg font-semibold">
                {post.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  className="text-white"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </h4>
              <p className="mt-2 text-sm text-white/70">{post.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Blogs
