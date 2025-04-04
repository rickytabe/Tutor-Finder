import { useState, useEffect, useCallback, useMemo } from "react";
import { useGigs } from "../../context/gigContext";
import { GigCard } from "./gigCard";
import { Gig } from "../../types/gigsTypes";
import { DeleteConfirmation } from "../../../../../shared/deleteConfirmation";
import { GigManagement } from "./gigManagement";
import { deleteGig, publishGig, unpublishGig } from "../../services/gigService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { GigTabs } from "../ui/gigTabs";
import ApplicationsList from "./applicationList";
import GigCardSkeleton from "../../../../../tutor-pages/HomePage/components/gigCardSkelecton";

const itemsPerPage = 4;

const GigList = () => {
  const { gigs, loadGigs } = useGigs();
  const [_selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteGigId, setDeleteGigId] = useState<string | null>(null);
  const [_isFormOpen, _setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [applicationCounts, setApplicationCounts] = useState<Record<string, number>>({});

  const fetchApplicationCount = useCallback(async (gigId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_Base_URL}/gigs/${gigId}/applications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setApplicationCounts(prev => ({ ...prev, [gigId]: data.count }));
    } catch (error) {
      console.error("Error fetching application count:", error);
    }
  }, []);

  useEffect(() => {
    if (gigs.length > 0 && !loading) {
      gigs.forEach(gig => {
        fetchApplicationCount(gig.id.toString());
      });
    }
  }, [gigs, loading, fetchApplicationCount]);

  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) =>
      selectedTab === "all" ? true : gig.status === selectedTab
    );
  }, [gigs, selectedTab]);

  const totalPages = Math.ceil(filteredGigs.length / itemsPerPage);
  const paginatedGigs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGigs.slice(start, start + itemsPerPage);
  }, [filteredGigs, currentPage]);

  const refreshGigs = useCallback(async () => {
    setLoading(true);
    try {
      await loadGigs();
    } catch (error) {
      toast.error("Failed to refresh gigs");
    } finally {
      setLoading(false);
    }
  }, [loadGigs]);

  useEffect(() => {
    refreshGigs();
  }, [refreshGigs]);

  const handleDelete = async (gigId: string) => {
    setIsDeleting(true);
    try {
      await deleteGig(gigId);
      await refreshGigs();
      toast.success("Gig deleted successfully");
    } catch (error) {
      toast.error("Failed to delete gig");
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
      setDeleteGigId(null);
    }
  };

  const handleStatusChange = async (
    gigId: string,
    action: "publish" | "unpublish"
  ) => {
    try {
      if (action === "publish") {
        await publishGig(gigId);
        toast.success("Gig published successfully");
      } else {
        await unpublishGig(gigId);
        toast.success("Gig unpublished successfully");
      }
      await refreshGigs();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center p-4 max-w-7xl mx-auto"
    >
      <div className="flex flex-row justify-between items-start mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          My Learning Sessions
        </h1>
        <GigManagement />
      </div>

      <GigTabs
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {loading ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <GigCardSkeleton key={idx} />
          ))}
        </motion.div>
      ) : selectedTab === "applications" ? (
        <ApplicationsList />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTab}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {paginatedGigs.map((gig) => (
              <GigCard
                key={gig.id}
                gig={gig}
                applicationCount={applicationCounts[gig.id] || 0}
                onViewApplications={() => {
                  setSelectedTab("applications");
                }}
                onEdit={() => setSelectedGig(gig)}
                onDelete={() => setDeleteGigId(gig.id.toString())}
                onPublish={() =>
                  handleStatusChange(gig.id.toString(), "publish")
                }
                onUnpublish={() =>
                  handleStatusChange(gig.id.toString(), "unpublish")
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {totalPages > 1 && selectedTab !== "applications" && (
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: totalPages }).map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-10 h-10 rounded-full ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {idx + 1}
            </motion.button>
          ))}
        </motion.div>
      )}

      <DeleteConfirmation
        isOpen={!!deleteGigId}
        onClose={() => setDeleteGigId(null)}
        onConfirm={() => deleteGigId && handleDelete(deleteGigId)}
        isDeleting={isDeleting}
        info="Are you sure you want to delete this gig?"
        buttonInfo="Delete"
        title="Confirm Delete"
        buttonInfo2="Deleting"
      />
    </motion.div>
  );
};

export default GigList;