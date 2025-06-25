import React, { useState, useEffect } from 'react';

function Page2() {
  const [amount, setAmount] = useState(5000);
  const [transactionFee, setTransactionFee] = useState(40);
  const [groupReceives, setGroupReceives] = useState(4960);
  const [groupBalance, setGroupBalance] = useState(23560); // Assume current balance = 18600

  useEffect(() => {
    const fee = Math.round(amount * 0.008); // 0.8% fee
    const receives = amount - fee;
    setTransactionFee(fee);
    setGroupReceives(receives);
    setGroupBalance(10000 + receives); // base balance + new contribution
  }, [amount]);

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setAmount(val);
  };

  return (
    <div className='flex flex-col md:flex-row items-center gap-6 justify-evenly bg-gradient-to-br from-gray-100 via-[#f0f0ff] to-[#e5e6ff] animate-[gradientMove_8s_ease-in-out_infinite] bg-[length:200%_200%] min-h-screen p-4'>

      {/* LEFT CARD */}
      <div className='bg-[#d6d6d6] w-full md:w-[30vw] h-auto md:h-[70vh] text-center rounded-xl flex flex-col items-center gap-4 justify-center p-4'>
        <h1 className='text-2xl font-medium md:text-3xl'>Quick and easy</h1>
        <p className='text-base text-gray-800 md:text-lg'>
          Your journey is seamless, safe and secure. <br /> No need to register or download apps.
        </p>
        <img
          className='object-contain h-40 rounded-xl md:h-60'
          src="https://img.freepik.com/premium-vector/xabarcode_195186-2214.jpg?semt=ais_items_boosted&w=740"
          alt="QR Code"
        />
        <p className='p-2 text-sm bg-white rounded-full w-fit'>★ ★ ★ ★ ★ 4.8 rating 1,850+ reviews</p>
      </div>

      {/* RIGHT CARD */}
      <div className='flex items-center justify-center bg-[#8681EF] w-full md:w-[30vw] h-auto md:h-[70vh] text-white rounded-xl flex flex-col justify-between p-4 md:p-6 gap-4'>
        <div className='flex flex-col items-center justify-center w-full gap-4'>
          <h2 className='text-xl font-semibold text-center md:text-2xl'>Send to Group Fund</h2>

          <div className='p-4 text-black bg-white rounded-lg w-full max-w-[380px]'>
            <div className='flex items-center justify-between mb-2 text-lg md:text-2xl'>
              <span>You send exactly</span>
              <input
                type="number"
                value={amount}
                onChange={handleInputChange}
                className="w-24 px-2 py-1 text-right bg-gray-100 rounded"
              />
              <span className='ml-2'>₹</span>
            </div>

            <div className='flex items-center justify-between mb-2 text-sm md:text-base'>
              <span>Group receives</span>
              <span className="font-semibold">₹ {groupReceives}</span>
            </div>

            <hr className='my-2' />

            <div className='text-sm text-gray-700 md:text-base'>
              <p className='flex justify-between'>
                <span>Transaction fee</span>
                <span>₹ {transactionFee}</span>
              </p>
              <p className='flex justify-between'>
                <span>Total contribution</span>
                <span>₹ {amount}</span>
              </p>
              <p className='flex justify-between'>
                <span>Group balance after</span>
                <span>₹ {groupBalance}</span>
              </p>
            </div>
          </div>

          <p className='text-sm text-center text-white/90'>
            Zero-interest borrowing. Trusted by 1,000+ groups.
          </p>
        </div>

        <button
          onClick={() => alert(`₹${groupReceives} sent to group!`)}
          className='bg-white text-[#8681EF] font-semibold py-2 px-6 rounded-full text-base hover:bg-gray-100 transition-all duration-200'>
          Calculate
        </button>
      </div>
    </div>
  )
}

export default Page2;
