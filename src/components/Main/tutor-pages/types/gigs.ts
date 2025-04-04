declare namespace Gig {
  interface Learner {
    id: number;
    name: string;
  }

  interface Category {
    id: number;
    name: string;
  }

  interface GigData {
    id: number;
    title: string;
    description: string;
    budget?: number;
    budget_period: "hourly" | "daily" | "weekly" | "monthly";
    location: string;
    status: "pending" | "open" | "in_progress" | "completed" | "cancelled";
    learner: Learner;
    category?: Category;
    applications: {
      id: number;
      status: string;
      created_at: string;
    }[];
    created_at: string;
    updated_at: string;
  }

  interface Filters {
    search?: string;
    price?: string;
    budget_period?: string;
    category_id?: number | number[];
    status?: string;
    include_pending?: boolean;
  }
  
  interface Application {
    id: number;
    proposal_message: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
    updated_at: string;
  }
}


export default Gig;
