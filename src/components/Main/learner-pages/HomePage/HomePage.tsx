// pages/LearnerHomePage.tsx
import React, { useState } from "react";
import Footer from "../HomePage/components/footer";
import SearchFilter from "../HomePage/components/searchFilters";
import TutorCard from "../HomePage/components/TutorCard";
import {
  mockTutors,
  filterTutors,
  featuredSections,
} from "../HomePage/api/tutors";
import { SearchFilters as SearchFiltersType } from "../types";
import NavBar from "./components/nav_bar";
import Hero from "./components/Hero";

const HomePage2: React.FC = () => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    searchTerm: "",
    locationType: "all",
    priceRange: [0, 100],
    minRating: 4.0,
    availability: [],
    tutorType: "all",
  });

  const filteredTutors = filterTutors(mockTutors, filters);
  const showFeaturedSections =
    filters.searchTerm === "" &&
    filters.locationType === "all" &&
    filters.priceRange[0] === 0 &&
    filters.priceRange[1] === 100 &&
    filters.minRating === 4.0 &&
    filters.availability.length === 0 &&
    filters.tutorType === "all";

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-r from-blue-600 to-purple-600  ">
      <NavBar />
      <Hero filters={filters} onSearch={setFilters} />
      <div className='bg-red' >
        <SearchFilter filters={filters} onFilterChange={setFilters} />
        <div className="container mx-auto px-4 py-8">
          {showFeaturedSections ? (
            <div className="space-y-12">
              {featuredSections.map((section) => (
                <div
                  key={section.title}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-gray-600 mt-2">{section.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockTutors
                      .filter((tutor) => section.tutorIds.includes(tutor.id))
                      .map((tutor) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-8">
                Found {filteredTutors.length} tutors matching your criteria
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage2;
