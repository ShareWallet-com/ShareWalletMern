import React from 'react';

function Header2() {
  return (
    <div className='relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-[#f0f0ff] to-[#e5e6ff] animate-[gradientMove_8s_ease-in-out_infinite] bg-[length:200%_200%] min-h-screen gap-6 px-4 py-10 overflow-hidden'>

      {/* Heading and Subtext */}
      <div className='flex flex-col items-center justify-center gap-6 text-center'>
        <h1 className="text-2xl font-medium leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
          Experience the Power of <br />
          <span className="inline-flex items-center justify-center text-[#4f47eaa8]">
            Community
          </span>{' '}
          Banking
        </h1>
        <p className='max-w-xl text-sm text-gray-700 sm:text-base'>
          Save together, borrow interest-free, and grow your shared wealth—all in one wallet.
        </p>
      </div>

      {/* Button */}
      <div className="flex flex-col items-center justify-center w-full gap-4 px-4 sm:flex-row">
        <button className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base border-2 shadow-lg bg-[#4E46EA] text-white rounded-xl">
          GET STARTED
        </button>
      </div>

    </div>
  )
}

export default Header2;
