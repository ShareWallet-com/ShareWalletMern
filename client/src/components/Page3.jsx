import React from 'react';

const InsightsCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#F6F8FA] p-6 rounded-3xl shadow-md max-w-6xl mx-auto my-10">
      
      
      <div className="w-full p-6 mb-6 bg-white shadow-sm rounded-2xl md:w-1/2 md:mb-0">
        <h3 className="text-sm text-gray-500">Total Savings</h3>
        <h1 className="text-3xl font-bold text-gray-800">$2,530.00</h1>

        <div className="relative flex items-end h-40 gap-2 my-4">
          {['1-7', '8-14', '15-21', '22-28', '29-31'].map((label, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-6 rounded-t-xl ${
                  i === 3 ? 'bg-green-300 h-32' : 'bg-gray-300 h-20'
                }`}
              ></div>
              <span className="mt-1 text-xs">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            <p className="text-sm text-gray-600">Weekly Avg $520</p>
          </div>
          <p className="text-xs text-gray-500">Set Goal</p>
        </div>
      </div>

      
      <div className="w-full px-4 md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-900">Master group savings with Insights</h2>

        <div className="mt-4">
          <h4 className="text-base font-medium text-gray-800">Smart Contribution Tracking</h4>
          <p className="mt-1 text-sm text-gray-600">
            ShareWallet automatically tags each member's contributions to help visualize where funds come from.
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-base font-medium text-gray-800">Budget Alerts</h4>
          <p className="mt-1 text-sm text-gray-600">
            Get notified when group spending crosses safe limits. Stay on track with monthly goals.
          </p>
        </div>

        <div className="mt-4">
          <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">EXPLORE MORE FEATURES →</a>
        </div>
      </div>
    </div>
  );
};

export default InsightsCard;
