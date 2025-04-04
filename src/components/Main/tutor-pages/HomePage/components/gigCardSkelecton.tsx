// src/components/Main/tutor-pages/HomePage/components/GigCardSkeleton.tsx
import { motion } from 'framer-motion';

const GigCardSkeleton = () => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-shimmer" />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="space-y-1">
            <div className="h-6 w-20 bg-gray-200 rounded-lg" />
            <div className="h-4 w-16 bg-gray-200 rounded-lg" />
          </div>
        </div>

        <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative z-10" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-32 bg-gray-200 rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-40 bg-gray-200 rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <div className="h-4 w-full bg-gray-200 rounded-lg" />
          <div className="h-4 w-5/6 bg-gray-200 rounded-lg" />
          <div className="h-4 w-2/3 bg-gray-200 rounded-lg" />
        </div>

        <div className="h-12 w-full bg-gray-200 rounded-lg relative z-10" />
      </div>
    </motion.div>
  );
};

export default GigCardSkeleton;