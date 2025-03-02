import React from "react";
import TutorCard from "./TutorCard";
import { FeaturedSection as FeaturedSectionType } from "../../types";

interface FeaturedSectionProps {
  section: FeaturedSectionType;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ section }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {section.tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
