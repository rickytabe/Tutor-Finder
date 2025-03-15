import { useEffect, useState } from 'react';
import { fetchTutors } from '../api/tutors';
import { Tutor } from '../../types';

export const useSearchTutors = (searchQuery: string) => {
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchTutors = async () => {
      try {
        setLoading(true);
        
        // Get cached tutors or fetch new ones
        const storedTutors = localStorage.getItem('tutors');
        let tutors: Tutor[] = storedTutors ? JSON.parse(storedTutors) : [];
        
        // Fetch fresh data if no cached tutors
        if (!storedTutors) {
          tutors = await fetchTutors({
            searchTerm: searchQuery,
            locationType: "all",
            priceRange: [0, 100],
            minRating: 0,
            availability: [],
            tutorType: "all"
          });
        }

        // Handle category search
        if (searchQuery.startsWith('category:"')) {
          const categoryName = searchQuery.replace('category:"', '').replace('"', '');
          const results = tutors.filter(tutor => 
            tutor.categories?.some(c => c.name === categoryName)
          );
          setFilteredTutors(results);
        } else {
          // General search
          const lowerQuery = searchQuery.toLowerCase();
          const results = tutors.filter(tutor =>
            tutor.name.toLowerCase().includes(lowerQuery) ||
            tutor.subjects?.some(s => s.toLowerCase().includes(lowerQuery))
          );
          setFilteredTutors(results);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setFilteredTutors([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchTutors();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return { filteredTutors, loading, error };
};