import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/footer';
import TutorCard from './components/TutorCard';
import NavBar from './components/nav_bar';
import Hero from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { fetchCategories, fetchTutors } from './api/tutors';
import { Tutor } from '../types';


interface User {
  location: string;
}

const LearnerHomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  // Fetch data on component mount
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

  // Get user location from localStorage
  useEffect(() => {
    const getUserLocation = () => {
      try {
        const storedData = localStorage.getItem('user');
        if (!storedData) {
          console.warn('No user data found in localStorage');
          return null;
        }

        const userData: User = JSON.parse(storedData);
        if (!userData.location) {
          console.warn('User location not found in stored data');
        }
        return userData.location || null;
      } catch (error) {
        console.error('Error accessing user location:', error);
        return null;
      }
    };

    const location = getUserLocation();
    setUserLocation(location);
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  
  const storedTutors = tutors.length > 0 ? tutors : JSON.parse(localStorage.getItem('tutors') || '[]');
  const topTutors = storedTutors.slice(0,8);

  // Filter nearby tutors
  const nearbyTutors = storedTutors.filter((t: Tutor) => {
    if (!userLocation || !t.location) return false;
    
    const userLoc = userLocation.toLowerCase().trim();
    const tutorLoc = t.location.toLowerCase().trim();
    
    return tutorLoc.includes(userLoc);
  });

  console.log('User location:', userLocation);
  console.log('Nearby tutors:', nearbyTutors);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <NavBar />
      <Hero />

      <CategoriesSection handleSearch={handleSearch} />

      {/* Top Tutors Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Top Rated Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTutors.map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Tutors Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tutors Near You</h2>
          {nearbyTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyTutors.map((tutor: Tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              {userLocation 
                ? "No tutors found near your location"
                : "Enable location services to see nearby tutors"}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnerHomePage;