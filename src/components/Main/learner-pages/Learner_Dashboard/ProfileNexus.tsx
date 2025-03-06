import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { User, Mail, Phone, MapPin, Settings, Bell, Clock, BookOpen } from 'react-feather';

const ProfileNexus: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone_number: '',
    whatsapp_number:"",
    location: '',
    profile_image: '',
    created_at: '',
    learning_style: 'Visual',
    notifications_enabled: true,
    timezone: 'UTC+0'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_Base_URL}/user`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        setProfile({
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          whatsapp_number:data.whatsapp_number,
          location: data.location,
          profile_image: data.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=teal&color=fff`,
          created_at: new Date(data.created_at).toLocaleDateString(),
          learning_style: data.learning_style || 'Visual',
          notifications_enabled: data.notifications_enabled,
          timezone: data.timezone || 'UTC+0'
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-lg mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <div className="text-gray-600 text-lg mb-4">Please sign in to view your profile</div>
          <a
            href="/auth/learner-login"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-32 bg-teal-600 relative">
          <div className="absolute -bottom-16 left-6">
            <img
              src={profile.profile_image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        
        <div className="pt-20 px-6 pb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <User className="mr-2" size={18} />
            <span>Member since {profile.created_at}</span>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 text-teal-600" size={20} />
            Personal Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="mr-3 text-gray-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="mr-3 text-gray-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{profile.phone_number || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 text-gray-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800">{profile.location || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2 text-teal-600" size={20} />
            Preferences
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-3 text-gray-500" size={18} />
                <span>Notifications</span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={profile.notifications_enabled}
                  readOnly
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3 text-gray-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Timezone</p>
                <p className="text-gray-800">{profile.timezone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-3 text-gray-500" size={18} />
              <div>
                <p className="text-sm text-gray-500">Learning Style</p>
                <p className="text-gray-800">{profile.learning_style}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="mt-6 bg-gradient-to-r from-teal-600 to-teal-500 p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-lg font-semibold mb-4">Learning Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm">Completed Courses</p>
          </div>
          <div>
            <p className="text-2xl font-bold">24h</p>
            <p className="text-sm">Learning Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold">A+</p>
            <p className="text-sm">Average Grade</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNexus;