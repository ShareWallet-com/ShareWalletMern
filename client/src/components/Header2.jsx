import React from 'react'

function Header2() {
  return (
    <div className='relative flex items-center flex-col justify-center bg-gradient-to-br from-gray-100 via-          [#f0f0ff] to-[#e5e6ff] 
            animate-[gradientMove_8s_ease-in-out_infinite] bg-[length:200%_200%] h-[95vh] gap-4 overflow-hidden'>





        <div className='flex flex-col items-center justify-center gap-4 text-center'>
  <h1 className='text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
    Experience the Power of <span className='text-[#4F47EA]'>Community</span> Banking
  </h1>
  <p className='text-sm sm:text-base'>
    Save together, borrow interest-free, and grow your shared wealth—all in one wallet.
  </p>
</div>

        <div className="flex flex-row items-center justify-center w-full gap-4 px-4 sm:flex-row">
          <button className="w-full px-6 py-2 text-sm text-white bg-black border-2 sm:w-auto rounded-xl sm:text-base">
            Join Now
          </button>
          <button className="w-full px-6 py-2 text-sm text-black bg-white border-2 shadow-lg sm:w-auto rounded-xl sm:text-base">
            Start a Group
          </button>
        </div>

    </div>
  )
}

export default Header2