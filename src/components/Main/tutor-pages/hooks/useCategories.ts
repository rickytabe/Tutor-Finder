import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../../shared/api/client";
import { Category } from "../types/categories";

export const useCategories = () => {
  return useQuery<Category.CategoryData[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchApi<{ data: Category.CategoryData[] }>(
        "categories"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });
};
