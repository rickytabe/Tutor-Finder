import { fetchApi } from "../../../shared/api/client";
import Gig from "../../types/gigs";
import { ApiError } from "../../../shared/api/client";

export const fetchGigs = async (
  filters: Gig.Filters
): Promise<Gig.GigData[]> => {
  try {
    const params = {
      include: "category,learner,applications",
      status: "open",
      include_pending: filters.include_pending ? 1 : 0,
      search: filters.search?.trim() || undefined,
      price: filters.price,
      budget_period: filters.budget_period,
      category_id: filters.category_id,
    };

    const response = await fetchApi<{ data: any[] }>("gigs", { params });

    // Transform API response to match expected structure
    return response.data.map((gig) => ({
      id: gig.id,
      title: gig.title,
      description: gig.description,
      budget: Number(gig.budget), // Convert string to number
      budget_period: gig.budget_period,
      location: gig.location,
      status: gig.status,
      category: gig.category || null, // Handle missing category
      learner: gig.learner || { id: -1, name: "Anonymous" }, // Default learner
      createdAt: gig.created_at, // Map snake_case to camelCase
      updatedAt: gig.updated_at,
      applications: gig.applications || [],
      created_at: gig.created_at,
      updated_at: gig.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching gigs:", error);
    throw error;
  }
};

export const applyToGig = async (gigId: number, proposal: string) => {
  try {
    const response = await fetchApi<{ data: any }>(`gigs/${gigId}/apply`, {
      method: "POST",
      body: { proposal_message: proposal },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.errors?.proposal_message?.[0] || error.message);
    }
    throw new Error("Failed to submit application");
  }
};
