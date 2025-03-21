// components/NavBar.tsx
import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaUsers,
  FaBell,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

interface NavBarProps {
  // Add any props if needed
}

interface Tutor {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
  // Add other fields if needed
}

const NavBar: React.FC<NavBarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const navigate = useNavigate();

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Check auth status and load tutor data
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("Tutortoken");
      const tutorData = localStorage.getItem("tutor");

      setIsAuthenticated(!!token);
      setTutor(tutorData ? JSON.parse(tutorData) : null);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("Tutortoken");
    localStorage.removeItem("tutor");
    setIsAuthenticated(false);
    setTutor(null);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  // Style variables
  const navContainerStyles =
    "fixed top-0 left-0 w-full text-white z-30 transition-all duration-300 bg-black/80 backdrop-blur-sm shadow-xl";
  const mobileMenuButtonStyles =
    "md:hidden p-2 text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full";
  const logoStyles = "text-4xl font-bold italic";
  const navLinkStyles =
    "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all";
  const activeNavLinkStyles = "bg-white/20";

  const mainLinks = [
    {
      path: "/tutorHomePage",
      name: "Home",
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      path: "/tutorDashboard",
      name: "Dashboard",
      icon: <FaThLarge className="w-5 h-5" />,
    },
    {
      path: "/tcommunity",
      name: "Community",
      icon: <FaUsers className="w-5 h-5" />,
    },
  ];

  return (
    <div>
      <nav className={navContainerStyles} aria-label="Main navigation">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="/learnerHomePage" className={logoStyles}>
            Tutor <span className="text-blue-500">Finder</span>
          </a>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
            {mainLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${navLinkStyles} ${isActive ? activeNavLinkStyles : ""}`
                }
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button className="text-white hover:text-blue-200 p-2 rounded-full relative">
                  <FaBell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative border-4 rounded-3xl border-blue-700">
                  {tutor?.profile_image ? (
                    <img 
                      src={tutor.profile_image} 
                      alt="Profile" 
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-white cursor-pointer hover:bg-blue-500 transition-colors">
                      {tutor?.name ? getInitials(tutor.name) : '?'}
                    </div>
                  )}
                </div>
                              
              </>
            ) : (
              <div className="hidden md:block">
                <div className="flex items-center gap-4 col-span-2">
                  <NavLink
                    to="/auth/tutor-login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 bg-green-500 transition-all"
                  >
                    <FaSignInAlt className="w-5 h-5" />
                    <span className="text-sm font-medium">Login</span>
                  </NavLink>
                  <NavLink
                    to="/auth/tutor-registration"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 bg-red-500 transition-all"
                  >
                    <FaUserPlus className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign Up</span>
                  </NavLink>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className={mobileMenuButtonStyles}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[75vw] bg-black/80 overflow-y-auto pb-10 shadow-xl transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-400">
          <div className={logoStyles}>
            <span className="text-blue-200">Tutor</span>
            <span className="text-white">Finder</span>
          </div>
          <button
            className="p-2 text-white"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-8 px-4 space-y-4">
          {mainLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `${navLinkStyles} ${
                  isActive ? activeNavLinkStyles : ""
                } text-lg text-white`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="pt-8 border-t border-blue-400">
              <div className="flex items-center gap-3 text-white p-2">
               <div className="relative border-4 rounded-3xl border-blue-700">
                  {tutor?.profile_image ? (
                    <img 
                      src={tutor.profile_image} 
                      alt="Profile" 
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-white cursor-pointer hover:bg-blue-500 transition-colors">
                      {tutor?.name ? getInitials(tutor.name) : '?'}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {tutor?.name || "Tutor Account"}
                  </p>
                  <p className="text-sm text-blue-100">Tutor Account</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-4 px-4 py-2 text-left text-red-400 hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                <FaSignOutAlt className="w-5 h-5" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-8 border-t border-blue-400 space-y-4">
              <NavLink
                to="/auth/tutor-login"
                onClick={toggleMenu}
                className={`${navLinkStyles} text-lg text-white`}
              >
                <FaSignInAlt className="w-5 h-5" />
                Login
              </NavLink>
              <NavLink
                to="/auth/tutor-registration"
                onClick={toggleMenu}
                className={`${navLinkStyles} text-lg text-white`}
              >
                <FaUserPlus className="w-5 h-5" />
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default NavBar;
