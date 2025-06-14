import React from 'react'

function Header2() {
  return (
    <div className='relative flex items-center flex-col justify-center bg-gray-100 h-[90vh] gap-4 overflow-hidden'>
        {/* <div className="absolute -top-[70%]  left-1/2 transform -translate-x-1/2 w-[50vw] h-[50vw] bg-[#4F47EA] rounded-full blur-2xl opacity-20 animate-pulse"></div> */}


        <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-[3vw] font-bold'>
                Experience the Power of <span className='text-[#4F47EA]'>Community</span>  Banking
            </h1>
            <p className='text-[1vw]'>Save together, borrow interest-free, and grow your shared wealth—all in one wallet.</p>
        </div>
        <div className='flex items-center justify-center gap-4'>
            <button className=' flex items-center justify-center px-2 py-2 border-2 w-[10vw] bg-[#000000] text-white rounded-xl'>Join Now</button>
            <button className='px-2 py-2 border-2 w-[10vw] bg-[#ffffff] text-black rounded-xl shadow-lg'>Start a Group</button>

        </div>
    </div>
  )
}

export default Header2