
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface ApplicationModalProps {
  gigId: number;
  onClose: () => void;
  onSubmit: (proposal: string) => Promise<void>;
}

const ApplicationModal = ({onClose, onSubmit }: ApplicationModalProps) => {
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (proposal.length < 50) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(proposal);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl w-full max-w-lg p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-4">Apply to Gig</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Proposal Message (min 50 characters)
            </label>
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              minLength={50}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {proposal.length}/50 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || proposal.length < 50}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationModal;