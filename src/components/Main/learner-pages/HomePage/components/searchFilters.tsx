// components/SearchFilters.tsx
import React, { useState } from "react";
import { SearchFilters } from "../../../shared/types";
import Icon from "./icons";

interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: SearchFilters) => void;
}

const SearchFilter: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleChange = (field: keyof SearchFilters, value: any) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const toggleAvailability = (option: string) => {
    handleChange(
      "availability",
      filters.availability.includes(option)
        ? filters.availability.filter((a) => a !== option)
        : [...filters.availability, option]
    );
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-white rounded-xl shadow-xl p-4 space-y-4 border border-gray-100">
        {/* Location Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => handleChange("locationType", "all")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${
              filters.locationType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Icon name="globe" size={16} />
            All
          </button>
          <button
            onClick={() => handleChange("locationType", "online")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${
              filters.locationType === "online"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Icon name="monitor" size={16} />
            Online
          </button>
          <button
            onClick={() => handleChange("locationType", "onsite")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${
              filters.locationType === "onsite"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Icon name="mappin" size={16} />
            On-site
          </button>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <span className="text-sm">More Filters</span>
          <Icon
            name={showAdvancedFilters ? "chevronup" : "chevrondown"}
            size={16}
          />
        </button>

        {/* Collapsible Filters */}
        {showAdvancedFilters && (
          <div className="pt-4 space-y-4 border-t border-gray-100">
            {/* Price Range */}
            {/* Price and Rating in Horizontal Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>

                <div className="relative pt-4">
                  {/* Slider Track */}
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    {/* Active Range */}
                    <div
                      className="absolute h-2 bg-blue-600 rounded-full"
                      style={{
                        left: `${(filters.priceRange[0] / 100) * 100}%`,
                        right: `${100 - (filters.priceRange[1] / 100) * 100}%`,
                      }}
                    ></div>

                    {/* Markers */}
                    <div className="absolute flex justify-between w-full -top-1">
                      {[0, 25, 50, 75, 100].map((mark) => (
                        <div
                          key={mark}
                          className="w-px h-4 bg-gray-300 relative"
                          style={{ left: `${0}%` }}
                        >
                          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded ">
                            ${mark}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Thumbs */}
                    <input
                      type="range"
                      min="0"
                      max={filters.priceRange[1]}
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handleChange("priceRange", [
                          Number(e.target.value),
                          filters.priceRange[1],
                        ])
                      }
                      className="absolute w-full h-2 appearance-none opacity-0 z-20"
                    />
                    <input
                      type="range"
                      min={filters.priceRange[0]}
                      max="100"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleChange("priceRange", [
                          filters.priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      className="absolute w-full h-2 appearance-none opacity-0 z-20"
                    />

                    {/* Custom Thumbs */}
                    <div
                      className="absolute w-6 h-6 bg-blue-600 rounded-full shadow -top-2 -ml-3 cursor-pointer"
                      style={{ left: `${filters.priceRange[0]}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        ${filters.priceRange[0]}
                      </div>
                    </div>
                    <div
                      className="absolute w-6 h-6 bg-blue-600 rounded-full shadow -top-2 -ml-3 cursor-pointer"
                      style={{ left: `${filters.priceRange[1]}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        ${filters.priceRange[1]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Icon name="star" size={16} />
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    handleChange("minRating", Number(e.target.value))
                  }
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.0}>4.0+ Stars</option>
                  <option value={3.5}>3.5+ Stars</option>
                  <option value={3.0}>3.0+ Stars</option>
                </select>
              </div>
            </div>
            {/* Availability Filter */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center gap-1">
                <Icon name="clock" size={16} />
                Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Now", "Today", "Weekends", "Flexible"].map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleAvailability(option)}
                    className={`p-1.5 text-xs rounded-lg flex items-center gap-1 ${
                      filters.availability.includes(option)
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option === "Now" && <Icon name="clock" size={12} />}
                    {option === "Today" && <Icon name="sun" size={12} />}
                    {option === "Weekends" && (
                      <Icon name="calendar" size={12} />
                    )}
                    {option === "Flexible" && <Icon name="refresh" size={12} />}
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Tutor Type Filter */}
            <div className="space-y-2">
              <label className=" text-sm text-gray-600 flex items-center gap-1">
                <Icon name="graduationcap" size={16} />
                Tutor Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleChange("tutorType", "all")}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    filters.tutorType === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleChange("tutorType", "professional")}
                  className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 ${
                    filters.tutorType === "professional"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Icon name="briefcase" size={12} />
                  Pros
                </button>
                <button
                  onClick={() => handleChange("tutorType", "student")}
                  className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 ${
                    filters.tutorType === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Icon name="graduationcap" size={12} />
                  Students
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
