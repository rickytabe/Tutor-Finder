import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FiUser, FiAward, FiEdit, FiPlus, FiMessageSquare, 
  FiThumbsUp, FiShare, FiMail, FiBriefcase, 
   FiMapPin, FiPhone, FiInfo
} from "react-icons/fi";
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

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleLogout = async () => {
    setIsLogingout(true);
    const success = await LogoutUser();
    if (success) {
      setIsLogingout(false);
      toast.success("Logout successful");
      setTimeout(() => navigate("/auth/learner-login"), 1500);
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
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-12 w-12 border-t-2 border-b-2 border-indigo-600 rounded-full"
      />
    </div>
  );

  const avatarUrl = user.profile_image?.startsWith("http") 
    ? user.profile_image 
    : "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-gray-50"
    >
      {/* Profile Header */}
      <div className="bg-indigo-700 pt-8 pb-24 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative -mb-16 w-32 h-32 bg-white rounded-full shadow-xl border-4 border-white"
          >
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => (e.target as HTMLImageElement).src = "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full shadow-md"
              onClick={() => setEditMode(true)}
            >
              <FiEdit className="text-white text-lg" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 space-y-8">
        {/* Profile Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <FiUser className="text-indigo-600 text-3xl" />
                <motion.h1 
                  className="text-3xl font-bold text-gray-900"
                  whileHover={{ x: 5 }}
                >
                  {editMode ? (
                    <input
                      type="text"
                      value={editedUser.name || ""}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="border-b-2 border-indigo-600"
                    />
                  ) : (
                    user.name
                  )}
                </motion.h1>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FiBriefcase className="text-indigo-600" />
                <span>{user.user_type}</span>
                <span className="text-sm">• Member since {new Date(user.created_at).toLocaleDateString()}</span>
              </div>

              {user.bio && (
                <motion.div 
                  className="mt-4 p-4 bg-indigo-50 rounded-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FiInfo className="text-indigo-600" />
                    <span className="font-medium">About Me</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {editMode ? (
                      <textarea
                        value={editedUser.bio || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        rows={3}
                      />
                    ) : (
                      user.bio
                    )}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
              >
                <FiEdit /> {editMode ? "Save" : "Edit"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-red-100 text-red-600 rounded-lg"
                onClick={() => setIsOpen(true)}
              >
                Logout
              </motion.button>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <motion.div 
              className="p-4 bg-indigo-50 rounded-lg flex items-center gap-4"
              whileHover={{ x: 5 }}
            >
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FiMail className="text-indigo-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </motion.div>

            {user.phone_number && (
              <motion.div 
                className="p-4 bg-indigo-50 rounded-lg flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FiPhone className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{user.phone_number}</p>
                </div>
              </motion.div>
            )}

            {user.whatsapp_number && (
              <motion.div 
                className="p-4 bg-indigo-50 rounded-lg flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaWhatsapp className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-medium text-gray-900">{user.whatsapp_number}</p>
                </div>
              </motion.div>
            )}

            {user.location && (
              <motion.div 
                className="p-4 bg-indigo-50 rounded-lg flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FiMapPin className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{user.location}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Skills Section */}
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiAward className="text-indigo-600" />
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {(user.skills || []).map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-1 bg-indigo-100 rounded-full"
              >
                <FiPlus className="text-indigo-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Post Creation */}
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex gap-4">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your knowledge..."
                className="w-full p-4 border rounded-xl resize-none bg-gray-50"
                rows={3}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreatePost}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2 justify-center"
              >
                <FiPlus className="text-lg" />
                Publish Post
              </motion.button>
            </div>
          </div>
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
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
              whileHover={{ y: -2 }}
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-800 whitespace-pre-line">{post.content}</p>
                  <div className="flex gap-6 mt-4 text-gray-500">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 hover:text-indigo-600"
                      onClick={() => handleLikePost(post.id)}
                    >
                      <FiThumbsUp /> {post.likes}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 hover:text-indigo-600"
                    >
                      <FiMessageSquare /> {post.comments.length}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 hover:text-indigo-600"
                    >
                      <FiShare /> {post.shares}
                    </motion.button>
                  </div>
                </div>
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