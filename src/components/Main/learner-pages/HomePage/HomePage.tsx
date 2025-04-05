import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Footer from "./components/footer";
import TutorCard from "./components/TutorCard";
import NavBar from "./components/nav_bar";
import Hero from "./components/Hero";
import { CategoriesSection } from "./components/CategoriesSection";
import { fetchCategories, fetchTutors } from "./api/tutors";
import { Tutor } from "../../shared/types";
import { motion } from "framer-motion";
import Footer from "../../../landing-page/footer";

interface User {
  location: string;
}

const LearnerHomePage = () => {
  const navigate = useNavigate();
  const [, setError] = useState<string | null>(null);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isLoadingTutors, setIsLoadingTutors] = useState(true);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingTutors(true);
        const [tutorsData] = await Promise.all([
          fetchTutors({
            searchTerm: "",
            locationType: "all",
            priceRange: [0, 100],
            minRating: 0,
            availability: [],
            tutorType: "all",
          }),
          fetchCategories(),
        ]);

        setTutors(tutorsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      }finally{
      setIsLoadingTutors(false);
      }
    };

    loadData();
  }, []);

  // Get user location from localStorage
  useEffect(() => {
    const getUserLocation = () => {
      try {
        const storedData = localStorage.getItem("user");
        if (!storedData) {
          console.warn("No user data found in localStorage");
          return null;
        }

        const userData: User = JSON.parse(storedData);
        if (!userData.location) {
          console.warn("User location not found in stored data");
        }
        return userData.location || null;
      } catch (error) {
        console.error("Error accessing user location:", error);
        return null;
      }finally{
      setIsLoadingLocation(false);
      }
    };

    const location = getUserLocation();
    setUserLocation(location);
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };


  const storedTutors =
    tutors.length > 0
      ? tutors
      : JSON.parse(localStorage.getItem("tutors") || "[]");
  const topTutors = storedTutors.slice(0, 8);

  // Filter nearby tutors
  const nearbyTutors = storedTutors.filter((t: Tutor) => {
    if (!userLocation || !t.location) return false;

    const userLoc = userLocation.toLowerCase().trim();
    const tutorLoc = t.location.toLowerCase().trim();

    return tutorLoc.includes(userLoc);
  });

  console.log("User location:", userLocation);
  console.log("Nearby tutors:", nearbyTutors);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 scrollbar-hide">
      <NavBar />
      <Hero />

      <CategoriesSection handleSearch={handleSearch} />

      {/* Top Tutors Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Top Rated Tutors</h2>
          {isLoadingTutors ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              {topTutors.map((tutor: Tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Nearby Tutors Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tutors Near You</h2>
          {isLoadingLocation ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
          ) : nearbyTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
