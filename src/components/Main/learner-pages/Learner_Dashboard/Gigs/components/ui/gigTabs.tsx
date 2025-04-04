// components/GigTabs.tsx
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface GigTabsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  applicationCount?: number;
}

export const GigTabs = ({ 
  selectedTab, 
  onTabChange,
  applicationCount = 0
}: GigTabsProps) => {
  const tabs: Tab[] = [
    { id: 'all', label: 'All Gigs' },
    { id: 'pending', label: 'Pending' },
    { id: 'open', label: 'Open' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
    { 
      id: 'applications', 
      label: 'Interested Tutors',
      count: applicationCount
    },
  ];

  return (
    <motion.div className="flex flex-wrap gap-2 mb-8" layout>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium relative flex items-center gap-2 ${
            selectedTab === tab.id
              ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {tab.count}
            </span>
          )}
          {selectedTab === tab.id && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full -z-10"
              layoutId="activeTab"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};