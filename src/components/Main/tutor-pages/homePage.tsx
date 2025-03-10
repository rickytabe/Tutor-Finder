// // src/pages/TutorHomePage.tsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser, setLoading } from '../../../store/reducers/AuthSlice';
// import { auth } from '../../../firebase/firebaseConfig';
// import { Link } from 'react-router-dom';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { getUserDoc } from '../../../firebase/firebaseServices';
// import persistStore from 'redux-persist/lib/persistStore';
// import store, { AppDispatch, RootState } from '../../../store/store';


// interface TutorInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   qualifications: string;
//   experience: string;
//   subjects: string;
//   hourlyRate: string;
// }

// const mockEarningsData = [
//   { month: 'Jan', earnings: 4000 },
//   { month: 'Feb', earnings: 3000 },
//   { month: 'Mar', earnings: 5000 },
//   { month: 'Apr', earnings: 4500 },
//   { month: 'May', earnings: 6000 },
//   { month: 'June', earnings: 1000 },
//   { month: 'Jully', earnings: 4000 },
//   { month: 'Aug', earnings: 3000 },
//   { month: 'Sept', earnings: 5000 },
//   { month: 'Oct', earnings: 4500 },
//   { month: 'Nov', earnings: 6000 },
//   { month: 'Dec', earnings: 1000 },
// ];

// const TutorHomePage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user, loading } = useSelector((state: RootState) => state.auth);
//   const [tutorInfo, setTutorInfo] = useState<TutorInfo | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isRehydrated, setIsRehydrated] = useState(false);

//   useEffect(() => {
//     const fetchTutorInfo = async () => {
//       try {
//         if (!user) return;
//         // Use double casting to convert to TutorInfo
//         const info = (await getUserDoc(user.uid)) as unknown as TutorInfo;
//         if (!info) {
//           throw new Error('Tutor information not found');
//         }
//         setTutorInfo(info);
//       } catch (error) {
//         console.error('Error fetching tutor info:', error);
//         setError('Failed to load tutor information');
//       }
//     };

//     fetchTutorInfo();
//   }, [user]);

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
//       try {
//         if (firebaseUser) {
//           const serializableUser = {
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             displayName: firebaseUser.displayName,
//           };
//           dispatch(setUser(serializableUser));
//         } 
//         dispatch(setLoading(false));
//       } catch (error) {
//         console.error('Error in auth state change:', error);
//       }
//     });

//     const unsubscribePersist = persistStore(store).subscribe(() => {
//       setIsRehydrated(true);
//     });

//     return () => {
//       unsubscribeAuth();
//       unsubscribePersist();
//     };
//   }, [dispatch]);

//   if (!isRehydrated || loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">You are not signed in yet.</div>
//           <Link
//             to="/auth/tutor-login"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Go to Tutor Sign In
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-green-500 text-xl">{error}</div>
//       </div>
//     );
//   }

//   if (!tutorInfo) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-red-500">No tutor information found.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Welcome back, {tutorInfo.firstName}!
//           </h1>
//           <div className="flex items-center space-x-4">
//             <button className="p-2 text-gray-400 hover:text-gray-500">
//               <span className="sr-only">Notifications</span>
//               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                 />
//               </svg>
//             </button>
//             <div className="flex-shrink-0">
//               <span className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                 {tutorInfo.firstName[0]}
//               </span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <dt className="text-sm font-medium text-gray-500">Total Earnings</dt>
//             <dd className="mt-1 text-3xl font-semibold text-gray-900">$12,450</dd>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <dt className="text-sm font-medium text-gray-500">Upcoming Sessions</dt>
//             <dd className="mt-1 text-3xl font-semibold text-gray-900">5</dd>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <dt className="text-sm font-medium text-gray-500">Student Rating</dt>
//             <dd className="mt-1 text-3xl font-semibold text-gray-900">4.8/5</dd>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Profile Section */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
//               <InfoItem label="First Name" value={tutorInfo.firstName} />
//               <InfoItem label="Last Name" value={tutorInfo.lastName} />
//               <InfoItem label="Email" value={tutorInfo.email} />
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Details</h2>
//               <InfoItem label="Hourly Rate" value={`$${tutorInfo.hourlyRate}/hr`} />
//               <InfoItem label="Experience" value={`${tutorInfo.experience || 'Not specified'} years`} />
//               <InfoItem label="Qualifications" value={tutorInfo.qualifications} />
//             </div>
//           </div>

//           {/* Chart and Subjects Section */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Overview</h2>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={mockEarningsData}>
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="earnings"
//                       stroke="#3B82F6"
//                       strokeWidth={2}
//                       dot={{ fill: '#3B82F6' }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Teaching Subjects</h2>
//               <div className="flex flex-wrap gap-2">
//                 {tutorInfo.subjects.split(',').map((subject, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                   >
//                     {subject.trim()}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
//   <div className="mb-4 last:mb-0">
//     <dt className="text-sm font-medium text-gray-500">{label}</dt>
//     <dd className="mt-1 text-gray-900">{value || 'Not provided'}</dd>
//   </div>
// );

// export default TutorHomePage;
