// src/components/Profile.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  whatsapp_number?: string;
  location?: string;
  user_type: string;
  profile_image?: string;
  created_at: string;
}

const ProfileNexus = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/auth/learner-login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );

  // Validate image URL
  const isValidImage = user.profile_image?.startsWith('http://') || user.profile_image?.startsWith('https://');
  const avatarUrl = isValidImage ? user.profile_image : 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg';

  // Format registration date
  const registrationDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
      <div className="w-full mx-auto bg-white overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 h-48">
          <div className="absolute -bottom-16 left-8">
            <div className="relative group">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <FiUser className="text-teal-600" />
              {user.name}
            </h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FiPhone className="text-teal-600 mr-4 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-800 font-medium">{user.phone_number || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FaWhatsapp className="text-green-600 mr-4 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">WhatsApp Number</p>
                  <p className="text-gray-800 font-medium">{user.whatsapp_number || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FiMapPin className="text-teal-600 mr-4 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800 font-medium">{user.location || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FiAward className="text-teal-600 mr-4 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="text-gray-800 font-medium capitalize">{user.user_type}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FiCalendar className="text-teal-600 mr-4 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-800 font-medium">{registrationDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileNexus;