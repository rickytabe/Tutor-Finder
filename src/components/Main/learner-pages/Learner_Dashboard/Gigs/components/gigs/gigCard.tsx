// components/gigs/GigCard.tsx
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTags,
  FaUser,
  FaCalendar,
  FaCheck,
  FaTimes,
  FaUsers,
  FaList,
} from "react-icons/fa";
import { useState, useCallback } from "react";
import { Gig } from "../../types/gigsTypes";
import { GigStatusBadge } from "./gigStatusBadge";

interface GigCardProps {
  gig: Gig;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onViewApplications: () => void;
  applicationCount: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: { y: -4, boxShadow: "0 10px 20px rgba(99, 102, 241, 0.1)" },
};

export const GigCard = ({
  gig,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  applicationCount,
  onViewApplications,
}: GigCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.div
      className="relative group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800 leading-snug">
              {gig.title}
            </h3>

            <div className="flex justify-start space-x-1">
              <GigStatusBadge status={gig.status ?? "pending"} />
              {gig.status === "pending" && (
                <div className=" bg-yellow-100 px-3 text-yellow-800 py-1 rounded-full text-sm font-medium">
                  Draft
                </div>
              )}
              {gig.status === "open" && (
                <div className=" bg-green-100 px-3 text-green-800 py-1 rounded-full text-sm font-medium">
                  Public
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex flex-col gap-2 min-w-[160px]">
            <div className="flex gap-2">
              {gig.status === "pending" && (
                <button
                  onClick={onPublish}
                  className="flex-1 p-2 flex items-center gap-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                  aria-label="Publish gig"
                >
                  <FaCheck className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Publish</span>
                </button>
              )}
              {gig.status === "open" && (
                <button
                  onClick={onUnpublish}
                  className="flex-1 p-2 flex items-center gap-2 rounded-lg bg-yellow-100 hover:bg-orange-100 transition-colors"
                  aria-label="Unpublish gig"
                >
                  <FaTimes className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm">Unpublish</span>
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="flex-1 p-2 flex items-center gap-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                aria-label="Edit gig"
              >
                <FaEdit className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={onDelete}
                className="flex-1 p-2 flex items-center gap-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                aria-label="Delete gig"
              >
                <FaTrash className="w-4 h-4 text-red-600" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="More options"
          >
            <FaEllipsisV className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoItem
            icon={<FaMoneyBillWave className="w-5 h-5 text-gray-600" />}
            label="Budget"
            value={`CFA ${gig.budget.toLocaleString()}`}
          />
          <InfoItem
            icon={<FaMapMarkerAlt className="w-5 h-5 text-gray-600" />}
            label="Location"
            value={gig.location}
            capitalize
          />
          <InfoItem
            icon={<FaTags className="w-5 h-5 text-gray-600" />}
            label="Category"
            value={gig.category?.name}
          />
          <InfoItem
            icon={<FaUser className="w-5 h-5 text-gray-600" />}
            label="Student Email"
            value={gig.learner?.email}
          />
          <InfoItem
            icon={<FaCalendar className="w-5 h-5 text-gray-600" />}
            label="Created"
            value={new Date(gig.created_at).toLocaleDateString()}
          />
          <InfoItem
            icon={<FaUsers className="w-5 h-5 text-gray-600" />}
            label="Applications"
            value={applicationCount}
          />
        </div>

        {/* Description */}
        <p className="font-bold">Description</p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {gig.description}
        </p>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <button
          onClick={onViewApplications}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <FaList className="w-4 h-4" />
          View Applications ({applicationCount})
        </button>
      </div>
      {/* Mobile Action Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden absolute top-14 right-4 bg-white rounded-xl shadow-lg p-3 space-y-3 z-50 min-w-[180px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {gig.status === "pending" && (
            <button
              onClick={onPublish}
              className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-green-50"
            >
              <FaCheck className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Publish</span>
            </button>
          )}
          {gig.status === "open" && (
            <button
              onClick={onUnpublish}
              className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-orange-50"
            >
              <FaTimes className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Unpublish</span>
            </button>
          )}
          <button
            onClick={onEdit}
            className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-blue-50"
          >
            <FaEdit className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-red-50"
          >
            <FaTrash className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  capitalize?: boolean;
}

const InfoItem = ({
  icon,
  label,
  value,
  capitalize = false,
}: InfoItemProps) => (
  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
    <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
    <div className="flex-1">
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div
        className={`text-sm ${capitalize ? "capitalize" : ""} text-gray-800`}
      >
        {value || "Not specified"}
      </div>
    </div>
  </div>
);
