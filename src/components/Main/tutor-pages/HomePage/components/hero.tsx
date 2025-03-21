// components/Hero.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Squares from '../../../../styled-components/Squares.jsx'
import Icon from "../../../learner-pages/HomePage/components/icons.js";

const SquaresComponent = Squares as React.FC<{
  speed?: number;
  squareSize?: number;
  direction?: string;
  borderColor?: string;
  hoverFillColor?: string;
}>;

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const popularSearches = ["Mathematics", "Physics", "English", "Programming"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handlePopularSearch = (subject: string) => {
    navigate(`/search?q=${encodeURIComponent(subject)}`);
  };

  return (
    <div className="relative bg-black shadow-xl pt-32 pb-24 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <SquaresComponent
          speed={0.15}
          squareSize={50}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.15)"
          hoverFillColor="#222"
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mt-20 mb-6 leading-tight
            bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Inspire the Next
            <br />
            <span className="text-white/90">Generation</span>
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search gigs by category..."
                className="flex-1 px-6 py-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="search" size={20} />
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-white/90 text-sm">Popular searches:</span>
            {popularSearches.map((subject) => (
              <button
                key={subject}
                onClick={() => handlePopularSearch(subject)}
                className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-sm"
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