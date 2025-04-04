// api/tutorService.ts
import { Tutor } from "../../../shared/types";


// export const fetchTutors = async (filters: SearchFilters) => {
//   try {
//     const queryParams = new URLSearchParams({
//       search: filters.searchTerm,
//       category_id: filters.category?.id || "",
//       available: filters.availability.includes("Now 🚀") ? "available" : "busy",
//       include: "tutorProfile,categories,qualifications",
//       min_rating: filters.minRating.toString(),
//       price_min: filters.priceRange[0].toString(),
//       price_max: filters.priceRange[1].toString(),
//       location_type: filters.locationType,
//       tutor_type: filters.tutorType,
//     });

//     const response = await fetch(`${import.meta.env.BASE_URL}/tutors?${queryParams}`, {
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     localStorage.setItem('tutors', JSON.stringify(responseData.data));

//     // Transform API response to match Tutor type
//     return responseData.data.map((apiTutor: any): Tutor => ({
//       id: apiTutor.id.toString(),
//       name: apiTutor.name,
//       profile_image: apiTutor.profile_image || "https://i.pravatar.cc/150",
//       subjects: apiTutor.categories?.map((cat: any) => cat.name) || ["General Tutoring"],
//       price: apiTutor.tutorProfile?.hourly_rate || 0,
//       rating: parseFloat(apiTutor.tutorProfile?.average_rating || "4.5"),
//       reviews: apiTutor.tutorProfile?.review_count || 0,
//       availability: apiTutor.available === "available" ? "available" : "busy",
//       type: apiTutor.tutor_type || "professional",
//       location: apiTutor.location === "Nairobi" ? "onsite" : "online",
//       specialties: apiTutor.tutorProfile?.specializations?.split(",") || [],
//       tutorProfile: {
//         bio: apiTutor.tutorProfile?.bio || "",
//         experience: apiTutor.tutorProfile?.years_experience || 0,
//         qualifications: apiTutor.qualifications?.map((q: any) => q.title) || [],
//         hourly_rate: 0,
//         average_rating: 0,
//         review_count: 0,
//         languages: [],
//         specializations: []
//       },
//       email: "",
//       phone_number: "",
//       whatsapp_number: "",
//       user_type: "tutor"
//     }));

//   } catch (error) {
//     console.error("Error fetching tutors:", error);
//     throw error;
//   }
// };

export const fetchTutors = async (filters: any): Promise<Tutor[]> => {
  try {
    const params: Record<string, string> = {
      include: "tutorProfile,categories",
      min_rating: filters.minRating.toString(),
      price_min: filters.priceRange[0].toString(),
      price_max: filters.priceRange[1].toString(),
    };

    // Only add search parameter if it's valid
    if (filters.searchTerm && filters.searchTerm.length >= 3) {
      params.search = filters.searchTerm;
    }

    // Only add category_id if it exists
    if (filters.category?.id) {
      params.category_id = filters.category.id;
    }

    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${import.meta.env.VITE_Base_URL}/tutors?${queryParams}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    localStorage.setItem("tutors", JSON.stringify(responseData.data));

    return responseData.data.map(
      (apiTutor: any): Tutor => ({
        id: apiTutor.id.toString(),
        name: apiTutor.name,
        profile_image: apiTutor.profile_image || "https://i.pravatar.cc/150",
        categories: apiTutor.categories?.map((cat: any) => ({
          id: cat.id.toString(),
          name: cat.name,
          description: cat.description,
        })) || [],
        price: apiTutor.tutorProfile?.hourly_rate || 1000,
        rating: parseFloat(apiTutor.tutorProfile?.average_rating || "4.5"),
        reviews: apiTutor.tutorProfile?.review_count || 0,
        location: apiTutor.location || "Online",
        email: apiTutor.email || "",
        phone_number: apiTutor.phone_number || "",
        whatsapp_number: apiTutor.whatsapp_number || "",
        user_type: "tutor",
        availability: apiTutor.available === "available" ? "available" : "busy",
        specialties: apiTutor.tutorProfile?.specializations?.split(",") || [],
        type: apiTutor.tutor_type || "professional",
        subjects: apiTutor.categories?.map((cat: any) => cat.name) || [],
        tutorProfile: {
          bio: apiTutor.tutorProfile?.bio || "",
          hourly_rate: apiTutor.tutorProfile?.hourly_rate || 1000,
          average_rating: parseFloat(
            apiTutor.tutorProfile?.average_rating || "4.5"
          ),
          review_count: apiTutor.tutorProfile?.review_count || 7,
          languages: apiTutor.tutorProfile?.languages || [],
          experience: apiTutor.tutorProfile?.years_experience || 5,
          specializations: apiTutor.tutorProfile?.specializations?.split(",") || [],
          qualifications: apiTutor.qualifications?.map((q: any) => q.title) || [],
        },
        available: undefined,
        studentsTaught: 0
      })
    );
  } catch (error) {
    console.error("Error fetching tutors:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_Base_URL}/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("categories: ", responseData);
    localStorage.setItem("categories", JSON.stringify(responseData.data));
    return responseData.data.map((cat: any) => ({
      id: cat.id.toString(),
      name: cat.name,
      description: cat.description,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
