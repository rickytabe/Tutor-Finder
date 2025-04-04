// src/components/Main/tutor-pages/HomePage/components/GigCard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiUser, FiSend } from 'react-icons/fi';
import Gig from '../../types/gigs';

interface GigCardProps {
  gig: Gig.GigData;
  onApplyClick: () => void;
}

const GigCard = ({ gig, onApplyClick }: GigCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplying, _setIsApplying] = useState(false);

  const applicationCount = gig.applications?.length || 0;

  const truncatedDescription = gig.description.length > 100 && !isExpanded 
    ? `${gig.description.substring(0, 100)}...` 
    : gig.description;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Content Section */}
        <div className="flex-1 space-y-4"> 
          <div className="flex justify-between items-start">
            <motion.div whileHover={{ scale: 1.05 }}>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium flex items-center gap-1">
                {gig.category?.name || 'General'}
                <span className="ml-1 bg-indigo-200 text-indigo-800 px-2 rounded-full">
                  {applicationCount}
                </span>
              </span>
            </motion.div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                XAF{(gig?.budget ?? 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                / {gig.budget_period}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <FiUser className="flex-shrink-0" />
              <span className="text-sm">{gig.learner.name}</span>
            </div>
            
            {gig.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <FiMapPin className="flex-shrink-0" />
                <span className="text-sm">{gig.location}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-gray-600">
              <FiClock className="flex-shrink-0" />
              <span className="text-sm">
                Posted {new Date(gig.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            {truncatedDescription}
            {gig.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-blue-600 hover:underline"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </div>

        {/* Fixed Bottom Button */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <motion.button
            onClick={onApplyClick}
            disabled={isApplying}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <FiSend className="w-5 h-5" />
            {isApplying ? 'Applying...' : 'Apply Now'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GigCard;