// src/components/Main/tutor-pages/HomePage/components/GigList.tsx
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GigCard from "./GigCard";
import Gig from "../../types/gigs";
import { toast } from "react-toastify";
import { applyToGig } from "../api/gigs";
import { ApiError } from "../../../shared/api/client";
import { useState } from "react";
import ApplicationModal from "./ApplicationModal";
import AuthModal from "./AuthModal";
import GigCardSkeleton from "./gigCardSkelecton";

interface GigListProps {
  gigs: Gig.GigData[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const GigList = ({
  gigs,
  currentPage,
  itemsPerPage,
  onPageChange,
  loading = false,
}: GigListProps) => {
  const totalPages = Math.ceil(gigs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGigs = gigs.slice(startIndex, startIndex + itemsPerPage);

  const [activeModal, setActiveModal] = useState<{
    type: "auth" | "application";
    gigId?: number;
  } | null>(null);

  async function handleApply(gigId: number, proposal: string): Promise<void> {
    try {
      await applyToGig(gigId, proposal);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      // In applyToGig
      let message = "Failed to submit application";
      toast.error(error.message || message);
      if (error instanceof ApiError) {
       message =
         error.status === 404         
            ? "You Are NOT CONNECTED TO THE INTERNET"
            : error.errors?.proposal_message?.[0] || error.message;
      }
      if (error instanceof ApiError) {
        message =
          error.status === 401
            ? "Please login to apply"
            : error.errors?.proposal_message?.[0] || error.message;
      }
      throw new Error(message);
    }
  }

  const checkAuth = () => {
    const tutor = localStorage.getItem("Tutortoken");
    return !!tutor;
  };
  return (
    <div className="space-y-8">
      {/* Render modals here */}
      {activeModal?.type === "auth" && (
        <AuthModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === "application" && activeModal.gigId && (
        <ApplicationModal
          gigId={activeModal.gigId}
          onClose={() => setActiveModal(null)}
          onSubmit={(proposal) => handleApply(activeModal.gigId!, proposal)}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <GigCardSkeleton key={index} />
              ))
            : currentGigs.map((gig) => (
                <GigCard
                  key={gig.id}
                  gig={gig}
                  onApplyClick={() =>
                    setActiveModal({
                      type: checkAuth() ? "application" : "auth",
                      gigId: gig.id,
                    })
                  }
                />
              ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <motion.button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg hover:shadow-xl"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiChevronLeft className="w-5 h-5" />
            Previous
          </motion.button>

          <div className="flex items-center gap-2 mx-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`px-4 py-2 min-w-[40px] rounded-lg font-medium transition-all ${
                  currentPage === i + 1
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110 shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {i + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg hover:shadow-xl"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Next
            <FiChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default GigList;
