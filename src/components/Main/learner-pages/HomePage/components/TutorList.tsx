import { useEffect, useState } from 'react';
import { fetchTutors } from '../api/tutors';
import TutorCard from './TutorCard';
import { Tutor } from '../../types';

const TutorList = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTutors = async () => {
      try {
        // Try localStorage first
        const cachedTutors = localStorage.getItem('tutors');
        if (cachedTutors) {
          setTutors(JSON.parse(cachedTutors));
          setLoading(false);
        }
        
        // Always fetch fresh data
        const freshTutors = await fetchTutors({
          searchTerm: '',
          locationType: 'all',
          priceRange: [0, 100],
          minRating: 0,
          availability: [],
          tutorType: 'all'
        });
        setTutors(freshTutors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tutors');
      } finally {
        setLoading(false);
      }
    };

    loadTutors();
  }, []);

  if (loading) return <div>Loading tutors...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid tutor-grid">
      {tutors.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorList;