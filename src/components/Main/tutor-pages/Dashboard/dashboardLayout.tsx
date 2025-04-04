import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiMenu
} from 'react-icons/fi';

interface Children {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Children> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { id: 'teaching', icon: <FiBook />, label: 'Teaching Overview' },
    { id: 'sessions', icon: <FiCalendar />, label: 'Session Management' },
    { id: 'financial', icon: <FiDollarSign />, label: 'Financial Hub' },
    { id: 'profile', icon: <FiUser />, label: 'Profile Nexus' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-lg shadow-black z-10 fixed h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-6">Tutor Dashboard</h2>
          <nav>
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={`/tutor_dashboard/${tab.id}`}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`
                }
              >
                <span className="mr-3 text-lg">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-white pt-5 md:pt-0">
        <div className="max-w-full mx-auto">
          {/* Mobile Header with Dropdown */}
          <div className="md:hidden mb-6">
            <div className="flex justify-between items-center px-4">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 bg-blue-600 text-white rounded-lg focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  <FiMenu className="w-6 h-6" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-40">
                    <nav>
                      {tabs.map((tab) => (
                        <NavLink
                          key={tab.id}
                          to={`/tutor_dashboard/${tab.id}`}
                          className={({ isActive }) =>
                            `block px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 transition-colors ${
                              isActive ? 'bg-blue-100 text-blue-600' : ''
                            }`
                          }
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="flex items-center">
                            <span className="mr-2 text-lg">{tab.icon}</span>
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
          className="fixed inset-0 bg-black/50 z-35 md:hidden"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;