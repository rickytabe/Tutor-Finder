// components/QuickActions.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const QuickActions: React.FC = () => {
  const location = useLocation();
  const actions = [
    { name: "Bookings", path: "/bookings", icon: "📅" },
    { name: "Messages", path: "/messages", icon: "💬" },
    { name: "Payment History", path: "/payments", icon: "💳" },
    { name: "Learning Progress", path: "/progress", icon: "📈" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className=" rounded-xl shadow-lg p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {actions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                location.pathname === action.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span className="text-xl">{action.icon}</span>
              <span className="font-medium">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default QuickActions;