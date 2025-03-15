// src/pages/TutorHomePage.tsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TutorInfo {
  name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  user_type: string;
  location: string;
  profile_image: string;
  subjects: string;
  experience: string;
  hourly_rate: string;
  qualifications: string;
}

interface Gig {
  id: string;
  title: string;
  description: string;
  subject: string;
  budget: number;
  duration: string;
  posted: string;
}

const mockEarningsData = [
  { month: 'Jan', earnings: 4000 },
  { month: 'Feb', earnings: 3000 },
  // ... rest of the mock data
];

const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Mathematics Tutoring Needed',
    description: 'Need help with advanced calculus concepts',
    subject: 'Mathematics',
    budget: 500,
    duration: '2 months',
    posted: '3 days ago'
  },
  {
    id: '2',
    title: 'English Literature Coaching',
    description: 'Assistance with Shakespearean literature analysis',
    subject: 'English',
    budget: 400,
    duration: '1 month',
    posted: '1 week ago'
  },
];

const TutorHomePage: React.FC = () => {
  const [tutorInfo, setTutorInfo] = useState<TutorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTutorData = () => {
      try {
        const storedData = localStorage.getItem('user');
        const defaultTutor: TutorInfo = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone_number: '+1234567890',
          whatsapp_number: '+1234567890',
          user_type: 'tutor',
          location: 'New York, USA',
          profile_image: '',
          subjects: 'Mathematics, Physics',
          experience: '5',
          hourly_rate: '50',
          qualifications: 'M.Sc in Mathematics'
        };

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTutorInfo({ ...defaultTutor, ...parsedData });
        } else {
          setTutorInfo(defaultTutor);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading tutor data:', error);
        setError('Failed to load tutor information');
        setLoading(false);
      }
    };

    loadTutorData();
  }, []);

  const handleGigApply = (gigId: string) => {
    console.log(`Applying for gig ${gigId}`);
    alert(`Successfully applied for gig ${gigId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-green-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!tutorInfo) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-red-500">No tutor information found.</div>
      </div>
    );
    }
    // Validate image URL
  const isValidImage =
    tutorInfo.profile_image?.startsWith("http://") ||
    tutorInfo.profile_image?.startsWith("https://");
  const avatarUrl = isValidImage
    ? tutorInfo.profile_image
    : "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {tutorInfo.name.split(' ')[0]}!
          </h1>
             <div className="relative group">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-105"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";
              }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <InfoItem label="Name" value={tutorInfo.name} />
              <InfoItem label="Email" value={tutorInfo.email} />
              <InfoItem label="Phone" value={tutorInfo.phone_number} />
              <InfoItem label="WhatsApp" value={tutorInfo.whatsapp_number} />
              <InfoItem label="Location" value={tutorInfo.location} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Details</h2>
              <InfoItem label="Hourly Rate" value={`$${tutorInfo.hourly_rate}/hr`} />
              <InfoItem label="Experience" value={`${tutorInfo.experience} years`} />
              <InfoItem label="Qualifications" value={tutorInfo.qualifications} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Earnings Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Overview</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockEarningsData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gigs Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Gigs</h2>
              <div className="space-y-4">
                {mockGigs.map(gig => (
                  <div key={gig.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{gig.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{gig.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {gig.subject}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                            Budget: ${gig.budget}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleGigApply(gig.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Apply Now
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {gig.posted} • {gig.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="mb-4 last:mb-0">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-gray-900">{value || 'Not provided'}</dd>
  </div>
);

export default TutorHomePage;