import React from 'react';

function Page3() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-12 px-6 py-16 min-h-screen bg-gradient-to-br from-[#F4F5FF] via-[#E8E9FF] to-[#DCDDFE]">

      {/* LEFT: How it Works */}
<div className="flex flex-col items-start w-full gap-8 md:w-1/2">
  <h1 className="text-4xl font-extrabold text-[#4F47EA]">How it works</h1>
  <p className="text-base text-gray-600">
    Sha<span className="text-[#4F47EA] font-semibold">₹</span>e.Wallet helps groups build financial support systems together.
  </p>

  {/* Group Formation - Hover Expand */}
  <div className="group relative bg-white border-l-8 border-[#4F47EA] rounded-3xl shadow-md transition-shadow duration-300 hover:shadow-xl overflow-hidden max-h-[90px] hover:max-h-[300px] transition-all duration-500 ease-in-out w-full">
  <div className="group overflow-hidden transition-all duration-500 ease-in-out w-full max-w-2xl h-[100px] hover:h-[220px] p-6">
    <h2 className="text-xl font-bold text-[#4F47EA] mb-2">Group Formation</h2>
    <p className="text-gray-700 transition-opacity duration-500 delay-100 opacity-0 group-hover:opacity-100 ">
      Users form groups with family, friends, or colleagues for saving and supporting each other in emergencies.
    </p>
  </div>
</div>


  {/* Monthly Contributions */}
   <div className="group relative bg-white border-l-8 border-[#4F47EA] rounded-3xl shadow-md transition-shadow duration-300 hover:shadow-xl overflow-hidden max-h-[90px] hover:max-h-[300px] transition-all duration-500 ease-in-out w-full">
  <div className="group overflow-hidden transition-all duration-500 ease-in-out w-full max-w-2xl h-[100px] hover:h-[220px] p-6">
    <h2 className="text-xl font-bold text-[#4F47EA] mb-2">Monthly Contributions</h2>
    <p className="text-gray-700 transition-opacity duration-500 delay-100 opacity-0 group-hover:opacity-100 ">
      Each member contributes a fixed amount monthly to the group fund, helping to build a collective savings pool.
    </p>
  </div>
</div>

  {/* Emergency Fund Access */}
   <div className="group relative bg-white border-l-8 border-[#4F47EA] rounded-3xl shadow-md transition-shadow duration-300 hover:shadow-xl overflow-hidden max-h-[90px] hover:max-h-[300px] transition-all duration-500 ease-in-out w-full">
  <div className="group overflow-hidden transition-all duration-500 ease-in-out w-full max-w-2xl h-[100px] hover:h-[220px] p-6">
    <h2 className="text-xl font-bold text-[#4F47EA] mb-2">Emergency Fund Access</h2>
    <p className="text-gray-700 transition-opacity duration-500 delay-100 opacity-0 group-hover:opacity-100 ">
      In case of an emergency, a group member can request funds from the collective savings. All members must approve the request for the funds to be released.
    </p>
  </div>
</div>
</div>


      {/* RIGHT: Why Share Wallet */}
      <div className="flex flex-col items-start w-full gap-8 md:w-1/2">
        <h1 className="text-3xl font-extrabold text-black">Why Sha<span className="text-[#4F47EA]">₹</span>e.Wallet?</h1>

        {[
          ['Community First', 'Designed to empower groups with trust-based financial support.'],
          ['Transparency', 'Every transaction and approval is visible to all members.'],
          ['Security', 'Built with secure protocols to ensure your money is safe.'],
          ['Flexibility', 'Ideal for friends, families, or co-workers — anyone you trust.'],
          ['Smart Alerts', 'Instant notifications for contributions, requests, and approvals.'],
        ].map(([title, desc], index) => (
          <div
            key={index}
            className="w-full px-6 py-4 transition bg-white shadow-md rounded-3xl hover:shadow-xl"
          >
            <p>
              <span className="font-semibold text-gray-800">• {title}:</span>{' '}
              <span className="text-gray-600">{desc}</span>
            </p>
          </div>
        ))}

        <p className="mt-4 text-lg font-semibold text-black">
          Sha<span className="text-[#4F47EA]">₹</span>e.Wallet simplifies group saving while<br />
          strengthening bonds through financial cooperation.
        </p>
      </div>
    </div>
  );
}

export default Page3;
