import { motion } from 'framer-motion';
import {FiDollarSign, FiCalendar, FiTag } from 'react-icons/fi';
import { Category } from '../../../shared/types';
import  Gig  from '../../types/gigs';
import { useState, useEffect } from 'react';

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface FiltersProps {
  filters: Gig.Filters;
  setFilters: (filters: Gig.Filters) => void;
  categories: Category[];
}

const Filters = ({ filters, setFilters, categories }: FiltersProps) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setPriceRange(prev => ({
      ...prev,
      [type]: numericValue.slice(0, 7) // Limit to 7 digits
    }));
  };

  useEffect(() => {
    if (priceRange.min && priceRange.max) {
      setFilters({ ...filters, price: `${priceRange.min}-${priceRange.max}` });
    } else {
      const { price, ...rest } = filters;
      setFilters(rest);
    }
  }, [priceRange]);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={filterVariants}
      className="bg-gray-50 p-6 rounded-lg space-y-6 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <motion.div variants={filterVariants} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FiTag className="w-5 h-5 text-indigo-600" />
            Category
          </label>
          <motion.select
            value={filters.category_id?.toString() || ''}
            onChange={(e) => setFilters({
              ...filters,
              category_id: e.target.value ? Number(e.target.value) : undefined
            })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm appearance-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </motion.select>
        </motion.div>

        {/* Budget Period Filter */}
        <motion.div variants={filterVariants} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FiCalendar className="w-5 h-5 text-indigo-600" />
            Budget Period
          </label>
          <motion.select
            value={filters.budget_period || ''}
            onChange={(e) => setFilters({
              ...filters,
              budget_period: e.target.value || undefined
            })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm appearance-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="">Any Period</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </motion.select>
        </motion.div>

        {/* Price Range Filter */}
        <motion.div variants={filterVariants} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FiDollarSign className="w-5 h-5 text-indigo-600" />
            Price Range (XAF)
          </label>
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
            <input
              type="text"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Filters;