import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store/store';
import { getUserDoc } from '../../../../firebase/firebaseServices';
import { Learner, Tutor } from '../../../../types/users';
import { setUser, setLoading } from '../../../../store/reducers/AuthSlice';
import { auth } from '../../../../firebase/firebaseConfig';
import { persistStore } from 'redux-persist';
import store from '../../../../store/store';

const ProfileNexus: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    language: 'English',
    notification: true,
    timezone: 'UTC+0',
    profilePic: '',
    preferredLearningStyle: '',
    location: '',
  });
  const [isRehydrated, setIsRehydrated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const userProfile = await getUserDoc(user.uid) as Learner | Tutor | undefined;
        if (userProfile) {
          setProfile({
            fullName: 'displayName' in (userProfile as Learner | Tutor) ? (userProfile as Learner).displayName : '',
            email: userProfile.email || '',
            language: 'language' in userProfile ? userProfile.language : 'English',
            notification: 'notification' in userProfile ? Boolean(userProfile.notification) : true,
            timezone: 'timezone' in userProfile ? userProfile.timezone : 'UTC+0',
            profilePic: 'profilePic' in userProfile ? userProfile.profilePic : 'https://i.pravatar.cc/150?img=57',
            preferredLearningStyle: 'preferredLearningStyle' in userProfile ? userProfile.preferredLearningStyle : 'Visual',
            location: 'location' in userProfile && userProfile.location ? userProfile.location : 'Not specified',
          });
        }
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const serializableUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        dispatch(setUser(serializableUser));
      }
      dispatch(setLoading(false));
    });

    const unsubscribePersist = persistStore(store).subscribe(() => {
      setIsRehydrated(true);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePersist();
    };
  }, [dispatch]);

  const handleChange = (field: keyof typeof profile, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  if (!isRehydrated || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            You are not signed in yet.
          </div>
          <a
            href="/auth/learner-login"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Go to Learner Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-10">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">👤 Personal Information</h3>
        <form className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={profile.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">⚙️ Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Notification Emails</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={profile.notification}
                onChange={(e) => handleChange('notification', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div>
            <label className="block text-sm mb-1">Timezone</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={profile.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
            >
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC+1">CET (UTC+1)</option>
              <option value="UTC-5">EST (UTC-5)</option>
              {/* Add more timezones as needed */}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Preferred Learning Style</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={profile.preferredLearningStyle}
              onChange={(e) => handleChange('preferredLearningStyle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNexus;