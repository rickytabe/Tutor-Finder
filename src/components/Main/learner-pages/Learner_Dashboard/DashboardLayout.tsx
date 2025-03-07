// components/Main/learner-pages/Learner_Dashboard/DashboardLayout.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../HomePage/components/icons';

interface Children {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Children> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  const tabs = [
    { id: 'learning', icon: 'book', label: 'Learning Overview' },
    { id: 'sessions', icon: 'calendar', label: 'Session Management' },
    { id: 'financial', icon: 'dollar', label: 'Financial Hub' },
    { id: 'profile', icon: 'user', label: 'Profile Nexus' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-lg fixed h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-6">Learner Dashboard</h2>
          <nav>
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={`/dashboard/${tab.id}`}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`
                }
              >
                <Icon name={tab.icon} className="mr-3" size={18} />
                <span className="text-sm">{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64  bg-gray-500">
        <div className="max-w-full mx-auto ">
          {/* Mobile Header with Dropdown */}
          <div className="md:hidden mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 bg-blue-600 text-white rounded-lg focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <nav>
                      {tabs.map((tab) => (
                        <NavLink
                          key={tab.id}
                          to={`/dashboard/${tab.id}`}
                          className={({ isActive }) =>
                            `block px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 transition-colors ${
                              isActive ? 'bg-blue-100 text-blue-600' : ''
                            }`
                          }
                          onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                        >
                          <div className="flex items-center">
                            <Icon name={tab.icon} className="mr-2" size={16} />
                            <span>{tab.label}</span>
                          </div>
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </main>

      {/* Overlay for Dropdown (Mobile Only) */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;