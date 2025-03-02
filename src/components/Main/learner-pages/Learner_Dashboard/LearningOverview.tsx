// components/Main/learner-pages/Learner_Dashboard/LearningOverview.tsx
import ProgressBar from './Dashboard_Components/ProgressBar';
import LearnerHomePage from './homePage';

const LearningOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <LearnerHomePage />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
          <ProgressBar course="Mathematics" progress={65} />
          <ProgressBar course="Physics" progress={42} />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              5-Day Streak
            </span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              Top 10% Learner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningOverview;