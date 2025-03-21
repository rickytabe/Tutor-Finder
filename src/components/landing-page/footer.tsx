import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import EmailHook from "../../hooks/emailhook"; // Import the custom hook

const Footer = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string }>();
  const { sendEmail } = EmailHook();

  const socialLinks = [
    { icon: <FaFacebook />, name: "Facebook" },
    { icon: <FaTwitter />, name: "Twitter" },
    { icon: <FaLinkedin />, name: "LinkedIn" },
    { icon: <FaInstagram />, name: "Instagram" }
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const onSubmit = async (data: { email: string }) => {
    const success = await sendEmail(data, "template_opng6ue"); 
    if (success) {
      document.querySelector('form')?.reset();
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-b from-gray-900 to-black border-t text-gray-300 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-r from-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-l from-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              TutorFinder
            </h3>
            <p className="text-sm leading-relaxed">
              Revolutionizing education through personalized learning experiences.
              Join our community of passionate learners and educators.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Tutors', 'Courses', 'Success Stories', 'Enterprise'].map((link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                  >
                    <FiArrowRight className="text-blue-400" />
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-6">
              Join Our Learning Community
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-6 py-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 bg-blue-700 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <span className="h-5 w-5 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <FiArrowRight className="text-lg" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
            <p className="mt-4 text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy
            </p>
          </motion.div>
        </div>

        {/* Social & Copyright */}
        <motion.div variants={itemVariants} className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ y: -3 }}
                  href="#"
                  className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} TutorFinder. Empowering learners worldwide.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;