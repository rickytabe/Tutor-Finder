import { useSearchParams } from 'react-router-dom';
import TutorCard from './TutorCard';
import { useSearchTutors } from '../hooks/useSearchHooks';
import { fetchCategories, fetchTutors } from '../api/tutors';
import { useEffect, useState } from 'react';
import { Tutor } from '../../types';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { filteredTutors } = useSearchTutors(searchQuery);
  const [_tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isCategorySearch = searchQuery.startsWith('category:"');
  const categoryName = isCategorySearch 
    ? searchQuery.replace('category:"', '').replace('"', '')
    : null;
  
  useEffect(() => {
      const loadData = async () => {
        try {
          // Fetch both tutors and categories
          const [tutorsData] = await Promise.all([
            fetchTutors({
              searchTerm: '',
              locationType: 'all',
              priceRange: [0, 100],
              minRating: 0,
              availability: [],
              tutorType: 'all'
            }),
            fetchCategories()
          ]);
  
          setTutors(tutorsData);
          setLoading(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
          setLoading(false);
        }
      };
  
      loadData();
  }, []);
  
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isCategorySearch 
          ? `${categoryName} Tutors`
          : `Search Results for "${searchQuery}"`}
      </h1>
      
      {filteredTutors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tutors found {isCategorySearch ? 'in this category' : 'matching your search'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor}  />
          ))}
        </div>
      )}
    </div>
  );
};

 export default SearchPage;

