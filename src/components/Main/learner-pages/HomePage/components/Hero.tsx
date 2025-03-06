// components/Hero.tsx
import React from "react";
import { SearchFilters } from "../../types";
import Icon from "./icons";
import Squares from '../../../../styled-components/Squares.jsx'

interface HeroProps {
  filters: SearchFilters;
  onSearch: (newFilters: SearchFilters) => void;
}
const SquaresComponent = Squares as React.FC<{
  speed?: number;
  squareSize?: number;
  direction?: string;
  borderColor?: string;
  hoverFillColor?: string;
}>;

const Hero: React.FC<HeroProps> = ({ filters, onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch({ ...filters, searchTerm: e.target.value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="relative bg-black shadow-xl pt-40 flex items-center  justify-center">
      <div className="absolute inset-0 z-0">
        <SquaresComponent
          speed={0.15}
          squareSize={50}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.15)"
          hoverFillColor="#222"
        />
      </div>

      <div className="container mx-auto px-4 py-6 z-10">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">
            Learn with expert tutors
          </h2>
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="bg-white rounded-lg shadow-xl flex items-center">
              <input
                type="text"
                placeholder="🔍 Search tutors by name, subject, or specialty..."
                className="flex-1 p-4 text-lg focus:outline-none rounded-l-lg"
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
              <div className="flex items-center pr-2">
                {filters.searchTerm && (
                  <button
                    type="button"
                    onClick={() => onSearch({ ...filters, searchTerm: "" })}
                    className="text-gray-500 hover:text-blue-600 p-2"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="hidden  bg-blue-600 text-white px-8 py-4 md:flex items-center  space-y-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Icon name="search" size={20} className="text-white " />
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center space-x-4 mt-4">
            <span className="text-white text-sm">Popular: </span>
            {["Math", "Programming", "English", "Music"].map((subject) => (
              <button
                key={subject}
                className="text-white text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => onSearch({ ...filters, searchTerm: subject })}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;