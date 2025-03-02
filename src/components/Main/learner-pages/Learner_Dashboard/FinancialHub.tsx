import React from 'react';
import { SpendingPieChart, EarningsBarChart } from "./Dashboard_Components/Charts";
import { FaPaypal, FaCreditCard, FaMobileAlt } from 'react-icons/fa';

const FinancialHub: React.FC = () => {
  return (
    <div className="space-y-6 p-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">💰 Spending Analysis</h3>
          <SpendingPieChart />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">📈 Monthly Trends</h3>
          <EarningsBarChart />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add Payment Method
          </button>
        </div>
        {/* Payment methods list */}
        <ul className="space-y-4">
          <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <FaMobileAlt className="text-yellow-500" size={24} />
              <span>MTN MOMO Cameroon</span>
            </div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <FaPaypal className="text-blue-500" size={24} />
              <span>PayPal</span>
            </div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <FaCreditCard className="text-green-500" size={24} />
              <span>Credit Card</span>
            </div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          {/* Add more payment methods as needed */}
        </ul>
      </div>
    </div>
  );
};

export default FinancialHub;