import React from 'react'

function Usecase() {
  const useCasesTop = [
    {
      img: "/customer-support.jpg",
      title: "Customer Support",
      desc: "Resolves queries and issues without human help."
    },
    {
      img: "/assistant.jpg",
      title: "Lead Qualification",
      desc: "Qualifies leads by engaging prospects & gathering information."
    },
    {
      img: "/contentCreation.jpg",
      title: "Content Creation",
      desc: "Saves time and effort for content creators efficiently."
    }
  ];

  const useCasesBottom = [
    {
      img: "/friends.jpg",
      title: "Feedback Collection",
      desc: "Collecting customer feedback through voice-based surveys."
    },
    {
      img: "/data-entry.jpg",
      title: "Sales Call Assist",
      desc: "Assists sales teams during calls with suggestions & data analysis."
    }
  ];

  return (
    <div className="w-[80%] mx-auto mt-[50px] flex flex-col items-center p-5 rounded-[20px] bg-transparent max-[1200px]:w-full">
      {/* Header Pill */}
      <div className="flex justify-center mb-4">
        <h2 className="text-center py-1.5 px-5 bg-[rgba(174,0,255,0.17)] text-[rgb(110,99,255)] text-sm font-normal uppercase rounded-full mx-auto mb-1.5 mt-5 block w-max">
          Use Case
        </h2>
      </div>
      <p className="text-[26px] mb-[30px] max-[600px]:text-center max-[600px]:mt-[5px] max-[600px]:text-base">Real-World Impact.</p>
      <div className="w-[80%] mx-auto flex flex-col gap-5 max-[900px]:w-full">
        <div className="grid gap-5 relative grid-cols-3 max-[600px]:grid-cols-1">
          {useCasesTop.map((item, index) => (
            <div key={index} className="w-full h-[300px] max-[600px]:h-[200px] relative overflow-hidden px-5 rounded-[20px] bg-transparent flex flex-col justify-end shadow-[inset_0px_-90px_50px_rgba(0,0,0,0.849)] group">
              <img src={item.img} alt="" className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-white text-left text-base leading-none [text-shadow:0px_0px_10px_rgba(0,0,0,0.5)] px-2.5 py-[5px] bg-[#ad4aea] rounded-full w-max">{item.title}</span>
              <p className="text-sm font-light text-white leading-none mt-2.5 [text-shadow:1px_1px_10px_rgba(0,0,0,0.796)] self-baseline max-[600px]:text-left max-[600px]:text-base max-[600px]:leading-none max-[600px]:min-h-[40px]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-5 relative grid-cols-[7fr_5fr] max-[600px]:grid-cols-1">
          {useCasesBottom.map((item, index) => (
            <div key={index} className="w-full h-[250px] max-[600px]:h-[200px] relative overflow-hidden px-5 rounded-[20px] bg-transparent flex flex-col justify-end shadow-[inset_0px_-90px_50px_rgba(0,0,0,0.849)] group">
              <img src={item.img} alt="" className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-white text-left text-base leading-none [text-shadow:0px_0px_10px_rgba(0,0,0,0.5)] px-2.5 py-[5px] bg-[#ad4aea] rounded-full w-max">{item.title}</span>
              <p className="text-sm font-light text-white leading-none mt-2.5 [text-shadow:1px_1px_10px_rgba(0,0,0,0.796)] self-baseline max-[600px]:text-left max-[600px]:text-base max-[600px]:leading-none max-[600px]:min-h-[40px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Usecase
