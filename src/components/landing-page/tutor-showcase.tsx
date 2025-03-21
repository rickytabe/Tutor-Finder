import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaStar, 
  FaClock, 
  FaCheck, 
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUsers
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const TutorShowcase = () => {
  const tutors = [
    {
      name: "Dr. Johnson",
      expertise: "Machine Learning & Python",
      experience: "8+ years",
      rating: 4.98,
      students: 1200,
      price: 5000,
      priceUnit: "/hr",
      available: true,
      image: "https://i.pinimg.com/474x/97/b7/57/97b7577efb3ceba36fd9934ff3958e97.jpg",
      badges: ["Top Rated", "AI Expert"],
    },
    {
      name: "Michael Smith",
      expertise: "Advanced Mathematics",
      experience: "5+ years",
      rating: 4.95,
      students: 850,
      price: 3000,
      priceUnit: "/hr",
      available: false,
      image: "https://i.pinimg.com/236x/70/51/fe/7051fe596b79e49070d5d0ecb606f411.jpg",
      badges: ["Exam Specialist"],
    },
    {
      name: "Serena Emilia",
      expertise: "Web Development",
      experience: "6+ years",
      rating: 4.97,
      students: 980,
      price: 2000,
      priceUnit: "/hr",
      available: true,
      image: "https://i.pinimg.com/736x/d4/a2/97/d4a2970f5e27a8303b8a860bb5bd422f.jpg",
      badges: ["Career Coach"],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    },
    hover: { y: -10 }
  };


  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Expert Tutors
          </h2>
          <p className="text-gray-400 text-xl">
            5000+ verified professionals ready to help you succeed
          </p>
        </motion.div>

        {/* Tutor Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tutors.map((tutor, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Availability Badge */}
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  tutor.available
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {tutor.available ? (
                  <FaCheck className="w-4 h-4" />
                ) : (
                  <FaClock className="w-4 h-4" />
                )}
                <span>{tutor.available ? "Available Now" : "Fully Booked"}</span>
              </motion.div>

              {/* Tutor Profile */}
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 rounded-full bg-blue-900/50 overflow-hidden relative"
                >
                  <img 
                    src={tutor.image} 
                    className="w-full h-full object-cover"
                    alt={tutor.name}
                  />
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full" />
                </motion.div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">{tutor.name}</h3>
                  <p className="text-blue-400 flex items-center gap-2">
                    <FaChalkboardTeacher className="text-lg" />
                    {tutor.expertise}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tutor.badges.map((badge, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-2"
                  >
                    <FaStar className="text-yellow-400" />
                    {badge}
                  </motion.span>
                ))}
              </div>

              {/* Stats */}
              <div className="space-y-3 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      className={`${
                        i < Math.floor(tutor.rating)
                          ? "text-blue-400"
                          : "text-gray-600"
                      }`}
                    >
                      <FaStar className="w-5 h-5" />
                    </motion.span>
                  ))}
                  <span className="ml-2">({tutor.rating}/5)</span>
                </div>
                <p className="flex items-center gap-2">
                  <FaGraduationCap className="text-blue-400" />
                  {tutor.experience} Experience
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-blue-400" />
                  {tutor.students}+ Students
                </p>
              </div>

              {/* Price & Action */}
              <motion.div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-gray-400 text-sm">Starting from</p>
                  <p className="text-2xl font-bold text-white">
                    CFA {tutor.price}
                    <span className="text-gray-400 text-lg ml-1">
                      {tutor.priceUnit}
                    </span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                    tutor.available
                      ? "bg-blue-700 text-white hover:shadow-lg"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!tutor.available}
                >
                  {tutor.available ? (
                    <>
                      Book Now
                      <FiArrowRight className="text-lg" />
                    </>
                  ) : (
                    "Unavailable"
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Link
            to="/learnerHomePage"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-400 rounded-lg hover:bg-blue-600/10 transition-all group"
          >
            Browse All Tutors
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TutorShowcase;