import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaVideo, FaStar, FaRocket } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="w-6 h-6" />,
      title: "Find Your Perfect Tutor",
      description: "Use our AI-powered matching system to discover tutors tailored to your learning style and goals",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: "Schedule Flexible Sessions",
      description: "Book lessons 24/7 with real-time availability tracking and instant confirmation",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <FaVideo className="w-6 h-6" />,
      title: "Start Your Learning Journey",
      description: "Join interactive sessions with screen sharing, virtual whiteboard, and progress tracking",
      gradient: "from-green-400 to-cyan-500"
    }
  ];

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
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FaRocket className="w-20 h-20 text-blue-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-blue-700 bg-clip-text text-transparent">
              Transform Your Learning Experience
            </h2>
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Discover the future of personalized education in three simple steps
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-transparent transition-all duration-300"
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 rounded-2xl`} />

              {/* Icon container */}
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: index * 0.1 }}
                className={`mb-6 w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white`}
              >
                {step.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
              
              {/* Animated hover element */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiArrowRight className="w-6 h-6 text-blue-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 mb-6">
              <FaStar className="w-6 h-6 text-yellow-400 animate-pulse" />
              <p className="text-xl text-white font-medium">
                Join thousands of successful learners
              </p>
            </div>
            <button className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <span className="relative z-10">Start Your Free Trial</span>
              <div className="absolute inset-0 bg-blue-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;