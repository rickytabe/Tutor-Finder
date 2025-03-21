import { Link } from "react-router-dom";
import { FaClock, FaCheckCircle, FaRocket, FaRegGem } from "react-icons/fa";
import { motion } from "framer-motion";

const ValueGrid = () => {
  const features = [
    {
      icon: <FaClock />,
      title: "Flexible Scheduling",
      description: "Book lessons 24/7 with tutors across time zones. Reschedule anytime with no penalties.",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: <FaCheckCircle />,
      title: "Verified Experts",
      description: "All tutors undergo rigorous screening and background checks. Quality guaranteed.",
      gradient: "from-green-400 to-cyan-500"
    },
    {
      icon: <FaRocket />,
      title: "Career-Focused",
      description: "Learn in-demand skills with industry professionals. Get job-ready with personalized coaching.",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[40%] h-[40%] right-0 top-0 bg-gradient-to-r from-blue-500/20 blur-3xl" />
        <div className="absolute w-[40%] h-[40%] left-0 bottom-0 bg-gradient-to-l from-purple-500/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <FaRegGem className="w-14 h-14 text-blue-400 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold bg-blue-500 bg-clip-text text-transparent">
              Why Choose TutorFinder
            </h2>
          </div>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mt-4">
            Transform your learning experience with our <span className="text-blue-400">student-first philosophy</span>
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Animated Icon */}
              <div className="mb-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                  <span className={`text-3xl bg-gradient-to-br ${feature.gradient} bg-clip-text text-blue-700`}>
                    {feature.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>
              
              {/* Decorative Line */}
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
            <p className="text-gray-400 mb-6 text-xl font-light">
              Ready to transform your future?
            </p>
            <Link 
              to="/learnerHomePage" 
              className="relative overflow-hidden bg-blue-500 text-white px-12 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10">Discover Your Potential Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueGrid;