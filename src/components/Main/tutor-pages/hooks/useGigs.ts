import { useQuery } from "@tanstack/react-query";
import Gig from "../types/gigs";
import { fetchGigs } from "../HomePage/api/gigs";
import { ApiError } from "../../shared/api/client";

export const useGigs = (filters: Gig.Filters) => {
  return useQuery<Gig.GigData[], Error>({
    queryKey: ["gigs", filters],
    queryFn: () => fetchGigs(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    placeholderData: (previousData) => previousData,
    retry: (failureCount, error) => {
      // Don't retry on client-side validation errors
      if (error instanceof ApiError && error.status === 422) return false;
      return failureCount < 2;
    },
  });
};
