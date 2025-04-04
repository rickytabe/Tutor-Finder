import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiUser, FiPhone, FiMapPin, FiAward, FiEdit, FiPlus, FiMessageSquare, FiThumbsUp, FiShare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LogoutUser } from "../../../Auth/shared/AuthServices";
import { toast } from "react-toastify";
import { DeleteConfirmation } from "../../shared/deleteConfirmation";

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  whatsapp_number?: string;
  location?: string;
  user_type: string;
  profile_image?: string;
  created_at: string;
  bio?: string;
  skills?: string[];
}

interface Post {
  id: string;
  content: string;
  likes: number;
  comments: string[];
  shares: number;
  timestamp: string;
  author: string;
}

const ProfileNexus = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLogingout, setIsLogingout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [showSocial, setShowSocial] = useState(false);

  // Load initial data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPosts = localStorage.getItem("posts");

    if (!storedUser) {
      navigate("/auth/learner-login");
      return;
    }

    setUser(JSON.parse(storedUser));
    setEditedUser(JSON.parse(storedUser));
    setPosts(storedPosts ? JSON.parse(storedPosts) : []);
  }, [navigate]);

  // Save posts to local storage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleLogout = async () => {
    setIsLogingout(true);
    const success = await LogoutUser();
    if (success) {
      setIsLogingout(false);
      toast.success("Logout successful");
      setTimeout(() => {
        navigate("/auth/learner-login");
      }, 3000);
    } else {
      setIsLogingout(false);
      toast.error("Logout failed");
    }
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editedUser };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser as User);
    setEditMode(false);
    toast.success("Profile updated successfully");
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        content: newPost,
        likes: 0,
        comments: [],
        shares: 0,
        timestamp: new Date().toISOString(),
        author: user?.name || "Anonymous"
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  if (!user) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-12 w-12 border-t-2 border-b-2 border-teal-600 rounded-full"
      />
    </div>
  );

  // Profile image handling
  const isValidImage = user.profile_image?.startsWith("http");
  const avatarUrl = isValidImage ? user.profile_image : "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-teal-600 h-64 shadow-lg"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute -bottom-16 left-8 cursor-pointer"
        >
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";
            }}
          />
        </motion.div>
      </motion.div>

      {/* Profile Content */}
      <div className="pt-20 px-8 pb-8 max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <motion.h1
                whileHover={{ x: 5 }}
                className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3"
              >
                <FiUser className="text-teal-600" />
                {editMode ? (
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="border-b-2 border-teal-600"
                  />
                ) : (
                  user.name
                )}
              </motion.h1>
              <p className="text-lg text-gray-600">
                {editMode ? (
                  <input
                    type="text"
                    value={editedUser.bio || ""}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    placeholder="Add a bio"
                    className="w-full border-b-2 border-gray-200"
                  />
                ) : (
                  user.bio || "🌟 Passionate learner sharing knowledge and experiences"
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-teal-600 text-white rounded-lg"
                onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
              >
                {editMode ? "Save Profile" : <FiEdit size={20} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-red-600 text-white rounded-lg"
                onClick={() => setIsOpen(true)}
              >
                Logout
              </motion.button>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 rounded-xl cursor-pointer"
              onClick={() => setShowSocial(!showSocial)}
            >
              <div className="flex items-center gap-3">
                <FiPhone className="text-teal-600" />
                <span className="font-medium">{user.phone_number || "Add phone"}</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 rounded-xl cursor-pointer"
              onClick={() => setShowSocial(!showSocial)}
            >
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-green-600" />
                <span className="font-medium">{user.whatsapp_number || "Connect WhatsApp"}</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FiMapPin className="text-teal-600" />
                <span className="font-medium">{user.location || "Set location"}</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FiAward className="text-teal-600" />
                <span className="font-medium">{user.user_type}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {(user.skills || []).map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm"
                >
                  {skill}
                </motion.span>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-gray-200 rounded-full"
              >
                <FiPlus className="text-gray-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Post Creation */}
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex gap-4">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your knowledge..."
              className="flex-1 p-3 border rounded-lg resize-none"
              rows={3}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreatePost}
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg float-right"
          >
            Post
          </motion.button>
        </motion.div>

        {/* Posts Feed */}
        <AnimatePresence>
          {posts.map(post => (
            <motion.div
              key={post.id}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{post.author}</h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-6">{post.content}</p>
              <div className="flex gap-6 text-gray-500">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                  onClick={() => handleLikePost(post.id)}
                >
                  <FiThumbsUp /> {post.likes}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <FiMessageSquare /> {post.comments.length}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <FiShare /> {post.shares}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <DeleteConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleLogout}
        isDeleting={isLogingout}
        info="Are you sure you want to Logout from your Account?"
        buttonInfo="Logout"
        title="Confirm Logout"
        buttonInfo2="Logging Out"
      />
    </motion.div>
  );
};

export default ProfileNexus;