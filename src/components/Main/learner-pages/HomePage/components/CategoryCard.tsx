import React from 'react';
import { IconType } from 'react-icons';
import {
  FaGraduationCap,
  FaLanguage,
  FaBriefcase,
  FaLaptopCode,
  FaRegEdit,
  FaMusic,
  FaCut,
  FaRunning,
  FaPaintBrush,
  FaUniversity
} from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Props {
  category: Category;
  onClick: () => void;
}

type CategoryName = 
  | 'Academic Studies'
  | 'Language Learning'
  | 'Professional Development'
  | 'Technology & Digital Skills'
  | 'Competitive Exam Prep'
  | 'Music & Performing Arts'
  | 'Beauty & Fashion Skills'
  | 'Sports & Fitness Training'
  | 'Creative Arts & Crafts'
  | 'University & Advanced Studies';

const getCategoryIcon = (categoryName: CategoryName): IconType => {
  const iconMap: Record<CategoryName, IconType> = {
    'Academic Studies': FaGraduationCap,
    'Language Learning': FaLanguage,
    'Professional Development': FaBriefcase,
    'Technology & Digital Skills': FaLaptopCode,
    'Competitive Exam Prep': FaRegEdit,
    'Music & Performing Arts': FaMusic,
    'Beauty & Fashion Skills': FaCut,
    'Sports & Fitness Training': FaRunning,
    'Creative Arts & Crafts': FaPaintBrush,
    'University & Advanced Studies': FaUniversity
  };

  return iconMap[categoryName] || FaGraduationCap;
};

export const CategoryCard: React.FC<Props> = ({ category, onClick }) => {
  const Icon = getCategoryIcon(category.name as CategoryName);

  return (
    <div
      className="w-full max-w-sm min-w-[270px] min-h-full md:min-w-[400px] flex flex-col justify-between gap-4 text-left bg-gray-100 border-2 border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <div className="group flex items-center gap-4">
        <div className="p-3 bg-teal-50 rounded-lg border-2 border-teal-100">
          <Icon className="w-8 h-8 text-blue-700 transition-colors group-hover:text-blue-700" />
        </div>
        <h3 className="text-xl text-black font-bold transition-colors">
          {category.name}
        </h3>
      </div>
      
      <div className="ml-2">
        <p className="text-gray-600 text-base leading-relaxed whitespace-normal break-words">
          {category.description}
        </p>
      </div>
      <button
      className="w-full rounded-lg  bg-black text-white hover:opacity-75 hover:transition  p-4"
      onClick={onClick}
      aria-label={`Browse ${category.name} tutors`}
      role="navigation"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        View Tutors
      </button>
    </div>
  );
};

export default CategoryCard;