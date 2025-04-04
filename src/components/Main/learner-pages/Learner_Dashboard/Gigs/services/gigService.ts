
import { GigCreate, Gig, PaginatedGigs, GigFilterParams, Category } from '../types/gigsTypes';
import { defaultHeaders, handleResponse } from './api_base';



export const createGig = async (gigData: GigCreate): Promise<Gig> => {
  console.log("Gig data",gigData);
  try {
    const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(gigData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error creating gig:', error);
    throw new Error('Failed to create gig. Please try again.');
  }
};


export const getGigs = async (
    filters: GigFilterParams
  ): Promise<PaginatedGigs> => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters according to API documentation
      if (filters.include) queryParams.append('include', filters.include);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.price) queryParams.append('price', filters.price);
      if (filters.category_id) queryParams.append('category_id', filters.category_id.toString());
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.learner_id) queryParams.append('learner_id', filters.learner_id.toString());
      
      // Pagination parameters
      queryParams.append('page', (filters.page || 1).toString());
      queryParams.append('per_page', (filters.per_page || 10).toString());
  
      const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs?${queryParams}`, {
        headers: defaultHeaders
      });
  
      return handleResponse<PaginatedGigs>(response);
    } catch (error) {
      console.error('Get gigs error:', error);
      throw new Error('Failed to load gigs. Please try again later.');
    }
  };
  
export const getGigById = async (id: string): Promise<Gig> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs/${id}`, {
        headers: defaultHeaders
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get gig error:', error);
      throw new Error('Gig not found or failed to load.');
    }
  };

  export const updateGig = async (id: string, gigData: Partial<GigCreate>): Promise<Gig> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(gigData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Update gig error:', error);
      throw new Error('Failed to update gig. Please check your input.');
    }
};
  
export const deleteGig = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs/${id}`, {
        method: 'DELETE',
        headers: defaultHeaders
      });
      await handleResponse(response);
    } catch (error) {
      console.error('Delete gig error:', error);
      throw new Error('Failed to delete gig. Please try again.');
    }
  };

  // services/gigService.ts
export const getCategories = async (): Promise<{ data: Category[] }> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_Base_URL}/categories`, {
        headers: defaultHeaders
      });
      return handleResponse<{ data: Category[] }>(response);
    } catch (error) {
      console.error('Get categories error:', error);
      throw new Error('Failed to load categories');
    }
};

export const publishGig = async (id: string): Promise<Gig> => {
  const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs/${id}/publish`, {
    headers: defaultHeaders,
    method: 'PATCH'
  });
  const result = await (await response).json();
  return result.data;
};

export const unpublishGig = async (id: string): Promise<Gig> => {
  const response = await fetch(`${import.meta.env.VITE_Base_URL}/gigs/${id}/unpublish`, {
    headers: defaultHeaders,
    method: 'PATCH'
  });
   const result = await  (response).json();
   return result.data;
};
