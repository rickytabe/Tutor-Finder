import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMail, FiBook, FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LogoutUser } from "../../../Auth/shared/AuthServices";
import { toast } from "react-toastify";
import { DeleteConfirmation } from "../../shared/deleteConfirmation";

type TutorProfile = {
  bio: string;
  years_of_experience: number;
  verification_status: "pending" | "verified" | "rejected";
  availability_status: "available" | "busy" | "away";
  subjects_taught: string[];
  teaching_method: string;
  hourly_rate?: number;
};

interface Tutor {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  location?: string;
  profile_image?: string;
  created_at: string;
  tutor_profile: TutorProfile;
}

const TutorProfileNexus = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [isLogingout, setIsLogingout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize with default tutor profile
  const defaultProfile: TutorProfile = {
    bio: "I am a ",
    years_of_experience: 4,
    verification_status: "pending",
    availability_status: "available",
    subjects_taught: ['Physics', 'Chemistry'],
    teaching_method: ""
  };

  useEffect(() => {
    const storedTutor = localStorage.getItem("tutor");
    if (!storedTutor) {
      navigate("/auth/tutor-login");
      return;
    }

    const rawData = JSON.parse(storedTutor);
    const tutorData: Tutor = {
      ...rawData,
      tutor_profile: {
        ...defaultProfile,
        ...rawData.tutor_profile // Override with stored data
      }
    };

    setTutor(tutorData);
  }, [navigate]);

  const handleLogout = async () => {
    setIsLogingout(true);
    const success = await LogoutUser();
    setIsLogingout(false);
    
    if (success) {
      toast.success("Logout successful");
      setTimeout(() => navigate("/auth/tutor-login"), 1500);
    } else {
      toast.error("Logout failed");
    }
  };

  if (!tutor) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-12 w-12 border-t-2 border-b-2 border-indigo-600 rounded-full"
      />
    </div>
  );

  const avatarUrl = tutor.profile_image || "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-indigo-700 pt-8 pb-24 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative -mb-16 w-32 h-32 bg-white rounded-full shadow-xl border-4 border-white">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <FaChalkboardTeacher className="text-indigo-600 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-900">{tutor.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              tutor.tutor_profile.verification_status === 'verified' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {tutor.tutor_profile.verification_status}
            </span>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FiBook className="text-indigo-600" />
                <h3 className="font-semibold">Subjects Taught</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.tutor_profile.subjects_taught.map((subject, index) => (
                  <span key={index} className="px-3 py-1 bg-white rounded-full text-sm">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FiClock className="text-indigo-600" />
                <h3 className="font-semibold">Experience</h3>
              </div>
              <p>{tutor.tutor_profile.years_of_experience} years</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FiMapPin className="text-indigo-600" />
              Contact Information
            </h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FiMail className="text-gray-500" />
                {tutor.email}
              </p>
              {tutor.phone_number && (
                <p className="flex items-center gap-2">
                  <FiPhone className="text-gray-500" />
                  {tutor.phone_number}
                </p>
              )}
              {tutor.location && (
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-gray-500" />
                  {tutor.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmation
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onConfirm={handleLogout}
              isDeleting={isLogingout}
              info="Are you sure you want to logout?"
              buttonInfo="Logout"
              title="Confirm Logout"
              buttonInfo2='' />
    </motion.div>
  );
};

export default TutorProfileNexus;