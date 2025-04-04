// components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Squares from "../../../../styled-components/Squares.jsx";

const SquaresComponent = Squares as React.FC<{
  speed?: number;
  squareSize?: number;
  direction?: string;
  borderColor?: string;
  hoverFillColor?: string;
}>;

interface HeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
}

const Hero: React.FC<HeroProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  const popularSearches = ["Mathematics", "Physics", "English", "Programming"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <motion.div
      className="relative bg-black shadow-xl pt-32 pb-24 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
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
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mt-20 mb-6 leading-tight
            bg-gradient-to-r from-indigo-400 to-blue-600 bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            variants={itemVariants}
          >
            Share Your Knowledge
            <br />
            <span className="text-white/90">Empower Learners</span>
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            className="mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
             
              <input
                type="text"
                placeholder="Find tutoring opportunities..."
                className="flex-1 px-6 py-4 text-lg rounded-lg bg-white/5 backdrop-blur-sm 
                         border border-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-300
                         text-white placeholder-white/60"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
               />
             
              <button
                type="submit"
                className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg 
                         hover:bg-blue-900 transition-colors flex items-center justify-center gap-2
                         hover:shadow-lg hover:shadow-indigo-500/20"
              >
                <FiSearch className="w-5 h-5" />
                Search
              </button>
            </div>
          </motion.form>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
          >
            <motion.span
              className="text-white/90 text-sm"
              variants={itemVariants}
            >
              Popular categories:
            </motion.span>
            {popularSearches.map((subject) => (
              <motion.button
                key={subject}
                onClick={() => onSearchChange(subject)}
                className="px-4 py-2 bg-white/10 text-white  rounded-full hover:bg-white/20 
                         transition-colors text-sm backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {subject}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
