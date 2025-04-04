// src/components/Main/tutor-pages/HomePage/components/AuthModal.tsx
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Authentication Required</h3>
          <p className="text-gray-600">
            You need to be logged in to apply for gigs.
          </p>
          <div className="flex gap-4 mt-6">
            <Link
              to="/auth/tutor-login"
              className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth/tutor-registration"
              className="flex-1 text-center border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;