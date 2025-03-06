// src/types/user.ts
import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  photoURL: string | null;
  userType: 'learner' | 'tutor'; // Specifies user type
  createdAt: Timestamp;
}

export interface Learner extends User {
  displayName: string;
  subjectsOfInterest: string[];
  preferredLearningStyle: string; 
  availability: string[]; // e.g., ['Weekdays', 'Weekends']
  location?: string;
}

export interface Tutor extends User {
  qualifications: string;
  experienceYears: number;
  subjectsTaught: string[];
  hourlyRate: number;
  availability: string[]; // e.g., ['Weekdays', 'Weekends']
  idVerificationFile: string; // URL or file path
  certificationFiles?: string[]; // Optional certification files
  teachingPhilosophy?: string;
  references?: string;
}

export type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

// src/types/users.ts

export interface User1 {
  id: number; // Integer primary key
  name: string; // Required
  email: string; // Required, unique
  password?: string; // Required for backend creation, but may not be stored in client-side data structures.  Consider handling this separately.
  phone_number: string; // Required
  whatsapp_number: string; // Required
  user_type: 'tutor' | 'learner'; // Required enum
  location: string; // Required
  profile_image?: string | null; // Nullable URL
  remember_token:string | null;
  email_verified_at: Date | null;
}

export interface Learners extends User1 {
  subjectsOfInterest: string[];
  preferredLearningStyle: string;
  availability: string[];
}

export interface Tutors extends User1 {
  qualifications: string;
  experienceYears: number;
  subjectsTaught: string[];
  hourlyRate: number;
  availability: string[];
  idVerificationFile?: string; // URL or file path, optional
  certificationFiles?: string[]; // Optional
  teachingPhilosophy?: string;
  references?: string;
}
//Remove SerializableUser.  Not needed.
