import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ApiError } from "../../shared/api/client";
import Navbar from "../HomePage/components/navBar";
import Hero from "./components/hero";
import { useGigs } from "../hooks/useGigs";
import GigList from "./components/GigList";
import { useCategories } from "../hooks/useCategories";
import Filters from "./components/Filters";
import Gig from "../types/gigs";
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const TutorHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nearYouCurrentPage, setNearYouCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filters, setFilters] = useState<Gig.Filters>({
    status: "open",
    include_pending: false,
    search: "",
  });
  const [tutorLocation, setTutorLocation] = useState("");

  const { data: categories } = useCategories();
  const { data: gigs, isLoading, error } = useGigs(filters);

  useEffect(() => {
    const tutorData = localStorage.getItem("tutor");
    if (tutorData) {
      const parsedTutor = JSON.parse(tutorData);
      setTutorLocation(parsedTutor?.location || "");
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setNearYouCurrentPage(1);
  }, [filters]);

  const nearYouGigs =
    gigs?.filter(
      (gig) => gig.location.toLowerCase() === tutorLocation.toLowerCase()
    ) || [];

  const searchTimeout = useRef<NodeJS.Timeout>();

  const handleSearchChange = (term: string) => {
    setSearchTerm(term || "");

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout
    searchTimeout.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: (term || "").trim(),
      }));
    }, 100);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-gray-50"
    >
      <Navbar />
      <Hero
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={() => {}}
      />

      <div className="container mx-auto px-4 py-8">
        <Filters
          filters={filters}
          setFilters={setFilters}
          categories={(categories || []).map((category) => ({
            ...category,
            id: category.id.toString(),
            description: category.description || "",
          }))}
        />

        {/* Top Teaching Opportunities */}
        <motion.section variants={pageVariants}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Top Teaching Opportunities
          </h2>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-600"
            >
              Loading Opportunities...
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-red-600 space-y-2"
            >
              <p>{error.message}</p>
              {(error as ApiError).errors?.price && (
                <p className="text-sm">Valid format: 5000-10000</p>
              )}
            </motion.div>
          )}

          {isLoading ? (
            <GigList
              gigs={[]}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              loading={true}
            />
          ) : (
            <GigList
              gigs={gigs || []}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              loading={false}
            />
          )}
        </motion.section>

        {/* Learners Near You */}
        {tutorLocation && (
          <motion.section variants={pageVariants} className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Teaching Opportunities in ({tutorLocation})
            </h2>

            {nearYouGigs.length > 0 ? (
              <GigList
                gigs={nearYouGigs}
                currentPage={nearYouCurrentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setNearYouCurrentPage}
                loading={false}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500"
              >
                {gigs?.length
                  ? `No local learners found`
                  : "No opportunities available"}
              </motion.div>
            )}
          </motion.section>
        )}
      </div>
    </motion.div>
  );
};

export default TutorHomePage;
