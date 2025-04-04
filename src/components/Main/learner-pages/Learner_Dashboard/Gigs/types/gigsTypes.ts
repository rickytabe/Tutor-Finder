export type GigStatus = 'pending' |'open' | 'in_progress' | 'completed' | 'cancelled';

export interface GigCreate {
    category_name? : string;
    category_id: number;
    title: string;
    description: string;
    budget: number;
    location: string;
    budget_period: string;
    status: GigStatus; 
  }
 export interface Category{
   id:number;
   name: string;
 } 
export interface Gig extends GigCreate {
  id: number;
  learner_id: number;
  created_at: string;
  updated_at: string;
  category: Category;
  learner: {
    id: number;
    name: string;
    email: string;
  }
}
  
export interface PaginatedGigs {
  data: Gig[];
  meta: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_items: number;
  };
}

export interface GigFilterParams {
  include?: string;
  search?: string;
  price?: `${number}-${number}`;
  category_id?: number;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
  learner_id?: number;
  page?: number;
  per_page?: number;
}