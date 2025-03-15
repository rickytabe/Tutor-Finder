
import { useEffect, useState } from 'react';
import { GigForm } from './gigsForm';
import { useGigs } from '../../context/gigContext';
import { createGig, updateGig, getCategories } from '../../services/gigService';
import { Category, Gig, GigCreate } from '../../types/gigsTypes';
import { toast } from 'react-toastify';


export const GigManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { loadGigs } = useGigs();

  // Load categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (data: GigCreate) => {
    try {
      if (selectedGig) {
        await updateGig(selectedGig.id.toString(), data);
        toast.success('Gig updated successfully!')
      } else {
        await createGig(data);
        toast.success('Gig created successfully!')
      }
      await loadGigs();
    } catch (error: any) {
      console.error('Operation failed:', error.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setSelectedGig(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Create New Gig
      </button>

      <GigForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onSubmit={handleSubmit}
        initialData={selectedGig || undefined}
      />

    </div>
  );
};