import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaypal, FaCreditCard, FaMobileAlt, FaPlus, FaCoins, FaWallet } from 'react-icons/fa';
import  AddPaymentMethodModal  from './components/AddPaymentMethod';

const FinancialHub: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'mobile', provider: 'MTN MOMO Cameroon', icon: FaMobileAlt, color: 'text-yellow-500' },
    { id: 2, type: 'paypal', provider: 'PayPal', icon: FaPaypal, color: 'text-blue-500' },
    { id: 3, type: 'card', provider: 'Visa •••• 4512', icon: FaCreditCard, color: 'text-green-500' },
  ]);

  const stats = [
    { title: "Available Balance", value: "XAF 1,230,000", icon: FaWallet, color: "bg-green-100" },
    { title: "Pending Payouts", value: "XAF 750,000", icon: FaCoins, color: "bg-yellow-100" },
    { title: "Total Spent", value: "XAF 7,000", icon: FaCoins, color: "bg-red-100" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Function to handle adding new payment method
  interface PaymentMethod {
    type: 'mobile' | 'card' | 'paypal';
    provider: string;
    accountDetails?: string;
  }

  const handleAddMethod = (newMethod: PaymentMethod) => {
    const methodId = paymentMethods.length + 1;
    const iconMap = {
      mobile: FaMobileAlt,
      card: FaCreditCard,
      paypal: FaPaypal
    };
    
    setPaymentMethods(prev => [
      ...prev,
      {
        id: methodId,
        type: newMethod.type,
        provider: newMethod.type === 'card' 
          ? `${newMethod.provider} •••• ${newMethod.accountDetails?.slice(-4) || ''}`
          : newMethod.provider,
        icon: iconMap[newMethod.type],
        color: newMethod.type === 'mobile' 
          ? 'text-yellow-500' 
          : newMethod.type === 'card' 
            ? 'text-green-500' 
            : 'text-blue-500'
      }
    ]);
  };
 
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="m-4 space-y-8 bg-gray-50"
     >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>


      {/* Payment Methods Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-xl font-semibold mb-4 sm:mb-0 flex items-center gap-2">
            <FaCreditCard className="text-purple-500" /> Payment Methods
          </h3>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add New Method
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <method.icon className={`${method.color} w-6 h-6`} />
                <span className="font-medium">{method.provider}</span>
              </div>
              <button className="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg transition-colors">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* Recent Transactions Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FaWallet className="text-yellow-500" /> Recent Transactions
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <FaCoins className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Tutoring Session</p>
                  <p className="text-sm text-gray-500">15 Jan 2024 • 3:45 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-500">+ XAF 25,000</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          ))}
          <div className="text-center py-6 text-gray-500">
            No recent transactions found
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <AddPaymentMethodModal
            onClose={() => setIsModalOpen(false)}
            onAddMethod={handleAddMethod}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FinancialHub;