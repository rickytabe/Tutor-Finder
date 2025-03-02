// api/mockTutors.ts
import { Tutor } from "../../types";
import { SearchFilters } from "../../types";

export const mockTutors: Tutor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=11",
    subject: "Python Programming",
    price: 45,
    rating: 4.8,
    reviews: 128,
    language: "English",
    availability: ["Now 🚀", "Weekends 🏖️"],
    type: "professional",
    videoPreview: "https://youtu.be/M_z6shjaoNw?si=eO1QmNqF6v2ItqkZ",
    location: "online",
    specialties: ["Web Development", "Data Science"],
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=23",
    subject: "Electrical Engineering",
    price: 60,
    rating: 4.9,
    reviews: 245,
    language: "Mandarin",
    availability: ["Today 🌞", "Flexible 🔄"],
    type: "professional",
    location: "onsite",
    specialties: ["Circuit Design", "Power Systems"],
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=32",
    subject: "Classical Piano",
    price: 35,
    rating: 4.7,
    reviews: 89,
    language: "French",
    availability: ["Weekends 🏖️", "Flexible 🔄"],
    type: "student",
    location: "online",
    specialties: ["Music Theory", "Improvisation"],
  },
  {
    id: "4",
    name: "Raj Patel",
    avatar: "https://i.pravatar.cc/150?img=45",
    subject: "Quantum Physics",
    price: 55,
    rating: 4.6,
    reviews: 167,
    language: "Hindi",
    availability: ["Now 🚀", "Today 🌞"],
    type: "professional",
    location: "onsite",
    specialties: ["Quantum Mechanics", "Relativity"],
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=57",
    subject: "Machine Learning",
    price: 65,
    rating: 4.9,
    reviews: 212,
    language: "Spanish",
    availability: ["Today 🌞", "Weekends 🏖️"],
    type: "professional",
    location: "online",
    specialties: ["Neural Networks", "Deep Learning"],
  },
  // Add more tutors as needed...
];

export const featuredSections = [
  {
    title: "🚀 Top Coding Tutors",
    tutorIds: ["1", "5"],
    description: "Most popular programming experts",
  },
  {
    title: "🔬 Science & Engineering Stars",
    tutorIds: ["2", "4"],
    description: "Leading experts in technical fields",
  },
  {
    title: "🎵 Creative Arts Mentors",
    tutorIds: ["3"],
    description: "Talented arts and music instructors",
  },
];

export const filterTutors = (
  tutors: Tutor[],
  filters: SearchFilters
): Tutor[] => {
  const isDefaultFilters =
    filters.searchTerm === "" &&
    filters.locationType === "all" &&
    filters.priceRange[0] === 0 &&
    filters.priceRange[1] === 100 &&
    filters.minRating === 4.0 &&
    filters.availability.length === 0 &&
    filters.tutorType === "all";

  if (isDefaultFilters) return tutors; // Return all for featured sections

  return tutors.filter((tutor) => {
    // Search term matching
    const matchesSearchTerm =
      tutor.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      tutor.specialties.some((s) =>
        s.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );

    // Location filter
    const matchesLocation =
      filters.locationType === "all" || tutor.location === filters.locationType;

    // Price range
    const matchesPrice =
      tutor.price >= filters.priceRange[0] &&
      tutor.price <= filters.priceRange[1];

    // Rating filter
    const matchesRating = tutor.rating >= filters.minRating;

    // Availability filter
    const matchesAvailability =
      filters.availability.length === 0 ||
      filters.availability.some((avail: string) =>
        tutor.availability.includes(avail)
      );

    // Tutor type filter
    const matchesTutorType =
      filters.tutorType === "all" || tutor.type === filters.tutorType;

    return (
      matchesSearchTerm &&
      matchesLocation &&
      matchesPrice &&
      matchesRating &&
      matchesAvailability &&
      matchesTutorType
    );
  });
};
