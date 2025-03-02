import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../HomePage/components/nav_bar';

const Community: React.FC = () => {
    return (
    <div >
        <NavBar />
       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Community is Coming Soon!</h1>
        <p className="text-lg mb-8">
          We're working hard to bring you an amazing community experience. Stay tuned!
        </p>
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1,
          }}
        >
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </motion.div>
      </motion.div>
       </div>
    </div>
  );
};

export default Community;