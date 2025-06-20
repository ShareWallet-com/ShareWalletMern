import React from 'react'

function Page2() {
  return (
    <div className="p-4 relative flex items-center flex-col justify-center h-[100vh] gap-4 overflow-hidden bg-gradient-to-br from-[#4F47EA] via-[#6F7BF7] to-[#A3A8F9] backdrop-blur-md">
        <div className='flex flex-col items-start justify-center gap-4'>
            <h1 className='text-2xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-9xl'>Shared savings, <br />zero interest. Real freedom.</h1>
            <p className='text-2xl text-white' >Ready for seamless, secure, and shared savings anytime?</p>
        </div>
        <button className="h-16 px-8 bg-white text-[#4F47EA] text-xl font-semibold shadow-lg rounded-2xl transition duration-300 ease-in-out hover:bg-[#4F47EA] hover:text-white hover:shadow-2xl active:scale-95">
  Create Your Account
</button>

    </div>
  )
}

export default Page2