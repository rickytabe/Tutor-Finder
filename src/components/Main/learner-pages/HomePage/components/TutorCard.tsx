import { motion } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaCheck,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { Tutor } from "../../../shared/types";

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  // Extract profile details
  const TutorProfile: {
    experience: string;
    languages?: string[];
  } = {
    experience: tutor.tutorProfile?.experience.toString() || "5",
    languages: tutor.tutorProfile?.languages,
  };
  const categories =
    tutor.categories?.map((c) => c.name).join(" | ") || "General Tutoring";
  const firstLanguage = TutorProfile.languages?.[0] || "English";

  // Animation variants
  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: { y: -10 },
  };

  const isValidImage =
    tutor.profile_image?.startsWith("http://") ||
    tutor.profile_image?.startsWith("https://");
  const avatarUrl = isValidImage
    ? tutor.profile_image
    : "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="relative bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Availability Badge */}
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className={`absolute top-4 right-4 px-3 py-1   rounded-full text-sm flex items-center gap-2 ${
          tutor.available || true
            ? "bg-green-900/30 text-green-400"
            : "bg-red-900/30 text-red-400"
        }`}
      >
        {tutor.available || true ? (
          <FaCheck className="w-4 h-4" />
        ) : (
          <FaClock className="w-4 h-4" />
        )}
        <span>
          {tutor.available || true ? "Available Now" : "Fully Booked"}
        </span>
      </motion.div>

      {/* Tutor Profile Section - Fixed Layout */}
      <div className="flex items-start mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="min-w-[5rem] w-20 h-20 rounded-full bg-blue-900/50 overflow-hidden relative flex-shrink-0"
        >
          <img
            src={avatarUrl}
            alt={tutor.name}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src =
                "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";
            }}
          />
          <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full" />
        </motion.div>

        {/* Text Content with Fixed Width */}
        <div className="ml-4 mt-4 min-w-0 flex-1">
          <h3 className="text-2xl font-bold text-white truncate mb-2">
            {tutor.name}
          </h3>{" "}
          {/* Added mb-2 for spacing */}
          <p className="text-blue-400 flex items-center gap-2 mt-1">
            <FaChalkboardTeacher className="text-lg flex-shrink-0" />
            <span className="truncate line-clamp-2">{categories}</span>
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-2"
        >
          <FaStar className="text-yellow-400" />
          {firstLanguage}
        </motion.span>
        {tutor.rating >= 4.5 && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-2"
          >
            <FaStar className="text-yellow-400" />
            Top Rated
          </motion.span>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-3 text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.2 }}
              className={`${
                i < Math.floor(tutor.rating) ? "text-blue-400" : "text-gray-600"
              }`}
            >
              <FaStar className="w-5 h-5" />
            </motion.span>
          ))}
          <span className="ml-2">({tutor.rating}/5)</span>
        </div>
        <p className="flex items-center gap-2">
          <FaGraduationCap className="text-blue-400" />
          {TutorProfile.experience || "5+"} years experience
        </p>
        <p className="flex items-center gap-2">
          <FaUsers className="text-blue-400" />
          {tutor.studentsTaught || 100}+ Students
        </p>
      </div>

      {/* Price & Action */}
      <motion.div className="flex items-center justify-between mt-6">
        <div>
          <p className="text-gray-400 text-sm">Starting from</p>
          <p className="text-2xl font-bold text-white">
            CFA {tutor.price || 1000}
            <span className="text-gray-400 text-lg ml-1">/ hour</span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
            tutor.available || true
              ? "bg-blue-700 text-white hover:shadow-lg"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!tutor.available}
        >
          {tutor.available || true ? (
            <>
              Book Now
              <FiArrowRight className="text-lg" />
            </>
          ) : (
            "Unavailable"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TutorCard;
