import { FaClock } from 'react-icons/fa';
import NavBar from '../HomePage/components/navBar';

const TutorDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <FaClock className="text-6xl text-blue-500 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Coming Soon</h1>
        <p className="text-gray-600 mt-2">We're working hard to bring you an amazing dashboard experience.</p>
      </div>
    </>
  );
};

export default TutorDashboard;
