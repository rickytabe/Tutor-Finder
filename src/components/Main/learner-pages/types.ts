// types/index.ts
export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface TutorProfile {
  bio: string;
  hourly_rate: number;
  average_rating: number;
  review_count: number;
  languages: string[];
  experience: number;
  specializations: string[];
  qualifications: string[];
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  profile_image: string;
  location: string;
  user_type: 'tutor' | 'student';
  availability: 'available' | 'busy';
  
  // Relationships (from include parameter)
  tutorProfile?: TutorProfile;
  categories?: Category[];
  qualifications?: Qualification[];
  
  // Computed fields (added during transformation)
  price: number;
  rating: number;
  reviews: number;
  subjects: string[];
  specialties: string[];
  type: 'professional' | 'student';
}

export interface Qualification {
  id: string;
  title: string;
  institution: string;
  year_obtained: number;
}

export interface SearchFilters {
  searchTerm: string;
  locationType: 'online' | 'onsite' | 'all';
  priceRange: [number, number];
  minRating: number;
  availability: string[];
  tutorType: 'all' | 'professional' | 'student';
  category?: Category | null;
}

export interface FeaturedSection {
  title: string;
  tutors: Tutor[];
  description: string;
}

