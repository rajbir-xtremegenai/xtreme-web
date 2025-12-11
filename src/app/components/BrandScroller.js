import React from 'react'

function BrandScroller() {
  return (
    <div className="w-full py-[10px] relative overflow-hidden mx-auto rounded-[20px]">
      <div className="text-center mb-[40px]">
        <h2 className="text-[14px] font-[400] text-[#6e63ff] bg-[#ae00ff2b] px-[20px] py-[5px] rounded-[100px] w-max mx-auto mb-[5px] mt-[20px] uppercase">Trusted By</h2>
      </div>

      <div className="w-full overflow-hidden py-[30px] mb-0 relative">
        <div className="flex animate-scroll-left w-max hover:paused">
           {/* Duplicate items for infinite scroll effect */}
           {[...Array(2)].map((_, i) => (
             <div key={i} className="flex items-center">
                <span className="text-white text-2xl mx-10">Brand 1</span>
                <span className="text-white text-2xl mx-10">Brand 2</span>
                <span className="text-white text-2xl mx-10">Brand 3</span>
                <span className="text-white text-2xl mx-10">Brand 4</span>
                <span className="text-white text-2xl mx-10">Brand 5</span>
                <span className="text-white text-2xl mx-10">Brand 6</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}

export default BrandScroller
