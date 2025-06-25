import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faShieldHalved, faMobile, faClock, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

function Page4() {
  return (
    <div className='bg-[#ffffff] min-h-screen flex items-center justify-center px-4 py-6'>
      <div className='w-full max-w-[1200px] bg-[#4F47EA] rounded-3xl p-4 md:p-8 flex items-center justify-center flex-col gap-5'>
        {/* Heading */}
        <div className='flex items-center justify-center px-2 text-2xl text-center text-white md:text-4xl'>
          <h1>Start your journey to <br className='hidden sm:block' /> collaborative financial freedom</h1>
        </div>

        {/* Top Two Cards */}
        <div className='flex flex-col items-center justify-center w-full gap-6 md:flex-row md:gap-14'>
          <div className='w-full md:w-[30vw] h-auto md:h-[30vh] bg-[#f2f2f2] rounded-2xl p-4 flex flex-col gap-8 md:gap-16'>
            <div className='flex flex-col items-start justify-center gap-4 md:gap-8'>
              <div>
                <FontAwesomeIcon icon={faUserGroup} style={{ color: "#4F47EA", fontSize: '1.8rem' }} />
              </div>
              <div>
                <p className='text-lg md:text-xl'>Group-Based Saving</p>
                <p className='text-sm md:text-base'>
                  Build and manage savings with your trusted circle.ether it's friends, family, or community members .
                </p>
              </div>
            </div>
          </div>

          <div className='w-full md:w-[30vw] h-auto md:h-[30vh] bg-[#f2f2f2] rounded-2xl p-4 flex flex-col gap-8 md:gap-16'>
            <div className='flex flex-col items-start justify-center gap-4 md:gap-8'>
              <div>
                <FontAwesomeIcon icon={faShieldHalved} style={{ color: "#4F47EA", fontSize: '1.8rem' }} />
              </div>
              <div>
                <p className='text-lg md:text-xl'>Secure and Transparent</p>
                <p className='text-sm md:text-base'>Financial trust, built-in.Every transaction is tracked.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Three Cards */}
        <div className='flex flex-col items-center justify-center w-full gap-6 md:flex-row md:gap-8'>
          <div className='w-full md:w-[20vw] h-auto md:h-[30vh] bg-[#f2f2f2] rounded-2xl p-4 flex flex-col gap-8 md:gap-16'>
            <div className='flex flex-col items-start justify-center gap-4 md:gap-8'>
              <FontAwesomeIcon icon={faMobile} style={{ color: "#4F47EA", fontSize: '1.8rem' }} />
              <div>
                <p className='text-lg md:text-xl'>Access Anywhere</p>
                <p className='text-sm md:text-base'>Multi-device support across web and mobile.</p>
              </div>
            </div>
          </div>

          <div className='w-full md:w-[20vw] h-auto md:h-[30vh] bg-[#f2f2f2] rounded-2xl p-4 flex flex-col gap-8 md:gap-16'>
            <div className='flex flex-col items-start justify-center gap-4 md:gap-8'>
              <FontAwesomeIcon icon={faClock} style={{ color: "#4F47EA", fontSize: '1.8rem' }} />
              <div>
                <p className='text-lg md:text-xl'>Real-time Collaboration</p>
                <p className='text-sm md:text-base'>Stay updated without switching apps.</p>
              </div>
            </div>
          </div>

          <div className='w-full md:w-[20vw] h-auto md:h-[30vh] bg-[#f2f2f2] rounded-2xl p-4 flex flex-col gap-8 md:gap-16'>
            <div className='flex flex-col items-start justify-center gap-4 md:gap-8'>
              <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: "#4F47EA", fontSize: '1.8rem' }} />
              <div>
                <p className='text-lg md:text-xl'>Zero-Interest Borrowing</p>
                <p className='text-sm md:text-base'>Take what you need, pay only what you owe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Description */}
        <p className='px-2 text-sm text-center text-white md:text-lg'>
          ShareWallet follows modern open finance principles to empower shared savings and lending. <br className='hidden sm:block' />
          Our mission: Make financial security a collective achievement.
        </p>
      </div>
    </div>
  )
}

export default Page4;
