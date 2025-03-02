// components/TutorCard.tsx
import React from "react";
import { Tutor } from "../../types";

interface TutorCardProps {
  tutor: Tutor;
}

const getYouTubeEmbedUrl = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=${videoId}`
    : null;
};

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const isYouTubeVideo =
    tutor.videoPreview?.includes("youtube.com") ||
    tutor.videoPreview?.includes("youtu.be");
  const embedUrl = tutor.videoPreview
    ? getYouTubeEmbedUrl(tutor.videoPreview)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          {tutor.videoPreview ? (
            isYouTubeVideo ? (
              embedUrl && (
                <iframe
                  className="w-full h-full object-cover"
                  src={embedUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <video
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
                poster={tutor.avatar}
              >
                <source src={tutor.videoPreview} type="video/mp4" />
              </video>
            )
          ) : (
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {tutor.language}
          </div>
        </div>

        <div className="absolute -bottom-6 left-4">
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        </div>
      </div>

      <div className="pt-8 px-4 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{tutor.name}</h3>
            <p className="text-gray-600 text-sm">{tutor.subject}</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{tutor.rating}</span>
            <span className="text-gray-400">({tutor.reviews})</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold">${tutor.price}</span>
            <span className="text-gray-500 text-sm">/ hour</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Book Now
          </button>
        </div>

        {tutor.badge && (
          <div className="mt-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {tutor.badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorCard;
