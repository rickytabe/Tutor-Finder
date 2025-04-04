// components/Modals/AddPaymentMethodModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCreditCard, FaMobileAlt, FaPaypal } from 'react-icons/fa';
import { useState } from 'react';

interface PaymentMethodData {
  type: 'mobile' | 'card' | 'paypal';
  provider: string;
  accountDetails: string;
}

interface AddPaymentMethodModalProps {
  onClose: () => void;
  onAddMethod: (method: PaymentMethodData) => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ onClose, onAddMethod }) => {
  const [formData, setFormData] = useState<PaymentMethodData>({
    type: 'mobile',
    provider: '',
    accountDetails: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mobileProviders = ['MTN MOMO Cameroon', 'Orange Money', 'Express Union'];
  const cardProviders = ['Visa', 'MasterCard', 'American Express'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.provider) {
      newErrors.provider = 'Provider is required';
    }
    
    if (!formData.accountDetails) {
      newErrors.accountDetails = 'Account details are required';
    } else if (formData.type === 'mobile' && !/^6\d{8}$/.test(formData.accountDetails)) {
      newErrors.accountDetails = 'Invalid Cameroon mobile number (6xxxxxxxx)';
    } else if (formData.type === 'card' && !/^\d{16}$/.test(formData.accountDetails)) {
      newErrors.accountDetails = 'Invalid card number (16 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddMethod({
        ...formData,
        accountDetails: formData.type === 'card' 
          ? `•••• ${formData.accountDetails.slice(-4)}`
          : formData.accountDetails
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 50, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md relative"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Payment Method</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'mobile' })}
                    className={`p-4 rounded-xl flex flex-col items-center border-2 ${
                      formData.type === 'mobile' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <FaMobileAlt className="w-6 h-6 mb-2 text-blue-500" />
                    <span>Mobile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'card' })}
                    className={`p-4 rounded-xl flex flex-col items-center border-2 ${
                      formData.type === 'card' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <FaCreditCard className="w-6 h-6 mb-2 text-green-500" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'paypal' })}
                    className={`p-4 rounded-xl flex flex-col items-center border-2 ${
                      formData.type === 'paypal' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <FaPaypal className="w-6 h-6 mb-2 text-blue-500" />
                    <span>PayPal</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {formData.type === 'paypal' ? 'PayPal Email' : 'Provider'}
                </label>
                {formData.type === 'paypal' ? (
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className={`w-full p-3 rounded-lg border-2 ${
                      errors.accountDetails ? 'border-red-500' : 'border-gray-200'
                    }`}
                    value={formData.accountDetails}
                    onChange={(e) => setFormData({ ...formData, accountDetails: e.target.value })}
                  />
                ) : (
                  <select
                    className={`w-full p-3 rounded-lg border-2 ${
                      errors.provider ? 'border-red-500' : 'border-gray-200'
                    }`}
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  >
                    <option value="">Select Provider</option>
                    {(formData.type === 'mobile' ? mobileProviders : cardProviders).map((provider) => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                )}
                {errors.provider && <p className="text-red-500 text-sm mt-1">{errors.provider}</p>}
              </div>

              {formData.type !== 'paypal' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {formData.type === 'mobile' ? 'Phone Number' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      formData.type === 'mobile' 
                        ? '6XXXXXXXX' 
                        : '0000 0000 0000 0000'
                    }
                    className={`w-full p-3 rounded-lg border-2 ${
                      errors.accountDetails ? 'border-red-500' : 'border-gray-200'
                    }`}
                    value={formData.accountDetails}
                    onChange={(e) => setFormData({ ...formData, accountDetails: e.target.value })}
                  />
                  {errors.accountDetails && (
                    <p className="text-red-500 text-sm mt-1">{errors.accountDetails}</p>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Add Method
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddPaymentMethodModal;