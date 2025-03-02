// types/index.ts
export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  price: number;
  rating: number;
  reviews: number;
  language: string;
  availability: string[];
  videoPreview?: string;
  badge?:string;
  type: 'professional' | 'student';
  location: 'online' | 'onsite';
  specialties: string[];
}

export interface SearchFilters {
  searchTerm: string;
  locationType: 'online' | 'onsite' | 'all';
  priceRange: [number, number];
  minRating: number;
  availability: string[];
  tutorType: 'all' | 'professional' | 'student';
}
  export interface FeaturedSection {
    title: string;
    tutors: Tutor[];
    description: string;
  }