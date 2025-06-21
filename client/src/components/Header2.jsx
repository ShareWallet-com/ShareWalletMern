import React from 'react'
import LocomotiveScroll from 'locomotive-scroll';

function Header2() {
  return (
    <div className='relative flex items-center flex-col justify-center bg-gradient-to-br from-gray-100 via-    [#f0f0ff] to-[#e5e6ff] 
            animate-[gradientMove_8s_ease-in-out_infinite] bg-[length:200%_200%] h-[95vh] gap-4 px-4 overflow-hidden'>





        <div className='flex flex-col items-center justify-center gap-8 text-center'>
  <h1 className="text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl xl:text-8xl">
  Experience the Power of <br />
  <span className="inline-flex items-center justify-center text-[#4f47eaa8]">
    Community
  </span>{' '}
  Banking
</h1>
  <p className='text-sm sm:text-base'>
    Save together, borrow interest-free, and grow your shared wealth—all in one wallet.
  </p>
</div>

        <div className="flex flex-row items-center justify-center w-full gap-4 px-4 sm:flex-row">
          <button className="w-full px-6 py-2 text-sm border-2 shadow-lg bg-[#4E46EA] text-white sm:w-auto rounded-xl sm:text-base">
            GET STARTED
          </button>
        </div>

    </div>
  )
}

export default Header2