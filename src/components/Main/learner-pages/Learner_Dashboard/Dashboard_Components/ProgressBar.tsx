// components/Main/learner-pages/Learner_Dashboard/DashboardComponents/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  course: string;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ course, progress }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm">{course}</span>
      <span className="text-sm">{progress}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full">
      <div 
        className="h-2 bg-blue-600 rounded-full transition-all duration-300" 
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;