// components/ApplicationsList.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Application {
  id: number;
  proposal_message: string;
  status: string;
  tutor: {
    id: number;
    name: string;
  };
  gig: {
    id: number;
    title: string;
  };
}

const ApplicationsList = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_Base_URL}/tutor/applications`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const data = await response.json();
        setApplications(data.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-4"
    >
      {applications.map((application) => (
        <motion.div
          key={application.id}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          whileHover={{ y: -2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {application.tutor.name}
              </h3>
              <p className="text-gray-600">{application.gig.title}</p>
              <p className="text-sm text-gray-500 mt-2">
                {application.proposal_message}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              application.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {application.status}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ApplicationsList