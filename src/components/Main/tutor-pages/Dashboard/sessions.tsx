import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiClock, 
  FiZap,
  FiAlertTriangle,
  FiInfo
} from 'react-icons/fi';
import React from 'react';

interface Proposal {
  id: string;
  studentName: string;
  course: string;
  proposedDate: string;
  status: 'pending' | 'accepted' | 'denied' | 'cancelled';
  studentAvatar: string;
  proposedRate: number;
  message: string;
}

const TutorProposalsDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'accepted' | 'denied' | 'cancelled'>('all');
  const [searchQuery, _setSearchQuery] = useState('');

  // Mock data
  const proposals: Proposal[] = [
    {
      id: '1',
      studentName: 'Denis',
      course: 'Advanced Calculus',
      proposedDate: '2024-03-20',
      status: 'accepted',
      studentAvatar: '',
      proposedRate: 75,
      message: 'Need help with multivariable calculus concepts before final exams'
    },
    {
      id: '2',
      studentName: 'Mike Ngu',
      course: 'Organic Chemistry',
      proposedDate: '2024-03-22',
      status: 'pending',
      studentAvatar: 'https://example.com/avatar2.jpg',
      proposedRate: 65,
      message: 'Weekly tutoring sessions for reaction mechanisms'
    },
    {
      id: '3',
      studentName: 'Mbu Martin',
      course: 'Python Programming',
      proposedDate: '2024-03-18',
      status: 'denied',
      studentAvatar: 'https://example.com/avatar3.jpg',
      proposedRate: 80,
      message: 'Beginner Python course guidance'
    }
  ];

  const filteredProposals = proposals.filter(proposal => {
    const matchesStatus = selectedTab === 'all' || proposal.status === selectedTab;
    const matchesSearch = proposal.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusStyles = (status: Proposal['status']) => {
    switch (status) {
      case 'accepted':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: FiCheckCircle };
      case 'denied':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: FiXCircle };
      case 'cancelled':
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: FiAlertTriangle };
      default:
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FiClock };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-black  mb-2">
              Session Proposals
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your tutoring requests and appointments
            </p>
          </div>
          
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'pending', 'accepted', 'denied', 'cancelled'] as const).map((tab) => {
            const isActive = tab === selectedTab;
            const { bg, text } = getStatusStyles(tab === 'all' ? 'pending' : tab);
            
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                  isActive 
                    ? `${bg} ${text}`
                    : 'text-gray-600 dark:text-black hover:bg-gray-100 '
                }`}
              >
                {tab === 'all' ? (
                  <>
                    <FiZap className="flex-shrink-0" />
                    All
                  </>
                ) : (
                  <>
                    {React.createElement(getStatusStyles(tab).icon, { className: 'flex-shrink-0' })}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Proposals Grid */}
        {filteredProposals.length === 0 ? (
          <div className="text-center py-20">
            <FiInfo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No proposals found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedTab === 'all' 
                ? "You don't have any proposals yet"
                : `No ${selectedTab} proposals found`}
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredProposals.map((proposal) => {
                const { bg, text, icon: StatusIcon } = getStatusStyles(proposal.status);
                
                return (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white border-2 border-gray-400 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={proposal.studentAvatar}
                            alt={proposal.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 ">
                              {proposal.studentName}
                            </h3>
                            <p className="text-sm text-gray-600 ">
                              {proposal.course}
                            </p>
                          </div>
                        </div>
                        <span className={`${bg} ${text} px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                          <StatusIcon className="w-4 h-4" />
                          {proposal.status}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-900">Proposed Rate:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            ${proposal.proposedRate}/hr
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-900 ">Proposed Date:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(proposal.proposedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Message Preview */}
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {proposal.message}
                        </p>
                      </div>

                      {/* Actions */}
                      {proposal.status === 'pending' && (
                        <div className="mt-6 flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Accept
                          </button>
                          <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TutorProposalsDashboard;