// components/TutorCard.tsx
import React from "react";
import { Tutor, TutorProfile } from "../../types";

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  // Extract profile details from tutorProfile
  const profile: Partial<TutorProfile> = tutor.tutorProfile || {};
  const categories = tutor.categories?.map((category) => category.name).join(" | ") || "General Tutoring";
  const firstLanguage = profile.languages?.[0] || "English";

  return (
    <div className="bg-white rounded-xl  border-2 border-black shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative">
        {/* Profile Image Section */}
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          <img
            src={tutor.profile_image}
            alt={tutor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {firstLanguage}
          </div>
        </div>

        {/* Avatar Badge */}
        <div className="absolute -bottom-6 left-4">
          <img
            src={tutor.profile_image}
            alt={tutor.name}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Tutor Information */}
      <div className="pt-8 px-4 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{tutor.name}</h3>
            <p className="text-gray-600 text-sm">{categories}</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{tutor.rating}</span>
            <span className="text-gray-400">({tutor.reviews})</span>
          </div>
        </div>

        {/* Price and Action Section */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold">CFA {tutor.price}</span>
            <span className="text-gray-500 text-sm">/ hour</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Book Now
          </button>
        </div>

        {/* Location Badge */}
        {tutor.location && (
          <div className="mt-2">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {tutor.location === "online" ? "Online" : tutor.location}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorCard;