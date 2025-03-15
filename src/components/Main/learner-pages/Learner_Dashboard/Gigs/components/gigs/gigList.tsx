import { useState, useEffect, useCallback } from "react";
import { useGigs } from "../../context/gigContext";
import { GigCard } from "./gigCard";
import { Gig } from "../../types/gigsTypes";
import { DeleteConfirmation } from "../ui/deleteConfirmation";
import { GigManagement } from "./gigManagement";
import { createGig, deleteGig } from "../../services/gigService";
import { toast } from "react-toastify";

const GigList = () => {
  const { gigs, loadGigs } = useGigs();
  const [_selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteGigId, setDeleteGigId] = useState<string | null>(null);
  const [_isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const CreateGig = useCallback(async () => {
    try {
      setIsCreating(true);
      const newGig = await createGig({
        category_id: 5,
        title: "Advanced Calculus Tutoring",
        description: "Weekly sessions covering advanced calculus topics including differential equations and multivariable calculus.",
        budget: 2000,
        location: "Online",
        status: "open",
        budget_period: "hourly",
      });
      console.log("Created gig:", newGig);
      await loadGigs();
      toast.success("Gig created successfully!");
    } catch (error) {
      console.error("Create gig failed:", error);
      toast.error("Failed to create gig. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }, [loadGigs]);

  const handleEdit = (gig: Gig) => {
    setSelectedGig(gig);
    setIsFormOpen(true);
  };

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      await loadGigs();
      setLoading(false);
    };

    fetchGigs();
  }, [loadGigs]);

  const handleDelete = async (gigId: string) => {
    console.log("Deleting gig with ID:", gigId);
    setIsDeleting(true);
    try {
      await deleteGig(gigId);
      await loadGigs();
      setDeleteGigId(gigId);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
      setDeleteGigId(null);
    }
  };

  return (
    <div className="flex flex-col  justify-center p-4">
      <div className="flex justify-between w-full mb-8">
        <h1 className="text-3xl font-bold">My Gigs</h1>
        <GigManagement />
      </div>
      <button
        onClick={CreateGig}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        disabled={isCreating}
      >
        {isCreating ? "Creating Gig..." : "Create Hardcoded Gig"}
      </button>
      {loading ? (
        <div className="flex justify-center items-center pt-44">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {gigs.length === 0 ? (
            <div className="p-4 text-green-500 text-lg flex justify-center items-center">
              You have not created any gigs yet.
            </div>
          ) : (
            gigs.map((gig) => (
              <GigCard
                key={gig.id}
                gig={gig}
                onEdit={() => handleEdit(gig)}
                onDelete={() => setDeleteGigId(gig.id.toString())}
              />
            ))
          )}
        </div>
      )}

      <DeleteConfirmation
        isOpen={!!deleteGigId}
        onClose={() => setDeleteGigId(null)}
        onConfirm={() => deleteGigId && handleDelete(deleteGigId)}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default GigList;
