// components/gigs/GigForm.tsx
import { useForm } from "react-hook-form";
import { Category, GigCreate } from "../../types/gigsTypes";
import { BaseModal } from "../ui/baseModal";
import { useState } from "react";

interface GigFormProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmit: (data: GigCreate) => Promise<void>;
  initialData?: GigCreate;
}

export const GigForm = ({
  isOpen,
  onClose,
  categories,
  onSubmit,
  initialData,
}: GigFormProps) => {
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GigCreate>({
    defaultValues: initialData,
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleFormSubmit = async (data: GigCreate) => {
    setLoading(true);
    console.log("data", data);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Gig" : "Create New Gig"}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Category Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category
            <select
              {...register("category_id", { required: true })}
              className={`mt-1 block w-full rounded-lg border-2 ${
                errors.category_id ? "border-red-500" : "border-gray-200"
              } p-3`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Title
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 10,
                  message: "Title must be at least 10 characters",
                },
              })}
              className={`mt-1 block w-full rounded-lg border-2 ${
                errors.title ? "border-red-500" : "border-gray-200"
              } p-3`}
              placeholder="e.g., Advanced Calculus Tutoring"
            />
          </label>
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Budget Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Budget (CFA)
            <input
              type="number"
              placeholder="Example: 50000"
              {...register("budget", {
                required: "Budget is required",
                min: {
                  value: 1000,
                  message: "Minimum budget is CFA 1,000",
                },
              })}
              className={`mt-1 block w-full rounded-lg border-2 ${
                errors.budget ? "border-red-500" : "border-gray-200"
              } p-3`}
            />
          </label>
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>
         
      {/* Budget Period Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Budget Period
            <select
              {...register("budget_period", { required: "Budget period is required" })}
              className={`mt-1 block w-full rounded-lg border-2 ${
                errors.budget_period ? "border-red-500" : "border-gray-200"
              } p-3`}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          {errors.budget_period && (
            <p className="text-red-500 text-sm mt-1">
              {errors.budget_period.message}
            </p>
          )}
        </div>
        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Location
            <input
              {...register("location", { required: "Location is required" })}
              className={`mt-1 block w-full rounded-lg border-2 ${
                errors.location ? "border-red-500" : "border-gray-200"
              } p-3`}
              placeholder="e.g., Online or Buea, Cameroon"
            />
          </label>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Description must be at least 50 characters",
                },
              })}
              className={`mt-1 block w-full rounded-lg border-2 ${
                errors.description ? "border-red-500" : "border-gray-200"
              } p-3 h-32`}
              placeholder="Detailed description of your learning needs..."
            />
          </label>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading? initialData? "Updating Gig..."  : "Creating Gig...":initialData? "Update Gig" : "Create Gig"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
