// components/Main/learner-pages/Learner_Dashboard/SessionManagement.tsx
import { useState, ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Icon from '../HomePage/components/icons';
import { getGigs } from './Gigs/services/gigService';


// Modal.setAppElement('#root');

// Type Definitions(this is for a gig object)
type Gig = {
  endDate: any;
  startDate: any;
  startTime: ReactNode;
  id: string;
  title: string;
  subject: string;
  budgetRange: [number, number];
  locationType: 'online' | 'onsite' | 'hybrid';
  createdAt: Date;
  status: 'open' | 'closed' | 'in-progress';
  interestedTutors: number;
  dailyDuration: number;
};

type Session = {
  id: string;
  title: string;
  subject: string;
  tutor: string;
  date: Date;
  duration: number;
  status: 'upcoming' | 'completed' | 'canceled';
};

type GigFormData = Omit<Gig, 'id' | 'createdAt' | 'status' | 'interestedTutors'> & {
  tutorQualifications: string[];
  description: string;
  startDate: Date;
  endDate: Date;
  dailyDuration: number;
  startTime: string;
};

// Dummy Data (this serves as a gig emulator for testing in my app)
const dummyGigs: Gig[] = [
  {
    id: '1',
    title: 'Advanced Python Programming',
    subject: 'Python',
    budgetRange: [50, 80],
    locationType: 'online',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-02-28'),
    createdAt: new Date('2025-02-28'),
    status: 'open',
    interestedTutors: 3,
    dailyDuration: 2,
    startTime: '10:00'
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    subject: 'ML',
    budgetRange: [70, 100],
    locationType: 'hybrid',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-08-05'),
    createdAt: new Date('2023-08-05'),
    status: 'in-progress',
    dailyDuration: 3,
    startTime: '14:00',
    interestedTutors: 5
  },
];

const dummySessions: Session[] = [
  {
    id: '1',
    title: 'Python Basics',
    subject: 'Python',
    tutor: 'John Doe',
    date: new Date('2025-02-30T10:00:00'),
    duration: 60,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Machine Learning Intro',
    subject: 'ML',
    tutor: 'Jane Smith',
    date: new Date('2025-02-20T14:00:00'),
    duration: 90,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Data Structures',
    subject: 'Programming',
    tutor: 'Alice Johnson',
    date: new Date('2025-02-21T16:00:00'),
    duration: 120,
    status: 'canceled'
  }
];


const SessionManagement: React.FC = () => {
  const [isGigModalOpen, setIsGigModalOpen] = useState(false);
  const [gigs, setGigs] = useState<Gig[]>(dummyGigs);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<GigFormData>();

  const onSubmit = (data: GigFormData) => {
    const newGig: Gig = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      status: 'open',
      interestedTutors: 0
    };
    setGigs([newGig, ...gigs]);
    setIsGigModalOpen(false);
    reset();
  };
  // Get gigs for logged-in user (learner_id from auth system)
const loadUserGigs = async (learnerId: number) => {
  try {
    const result = await getGigs({
      learner_id: learnerId,
      status: 'open',
      per_page: 10,
      include: 'category'
    });
    
    console.log('User gigs:', result.data);
    console.log('Pagination info:', result.meta);
  } catch (error) {
    console.error('Error loading gigs:', error);
  }
};

  loadUserGigs(32);
  
  const getStatusBadge = (status: Gig['status'] | Session['status']) => {
    const statusStyles = {
      'open': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'upcoming': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-purple-100 text-purple-800',
      'canceled': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const sessions = dummySessions;
  const upcomingSessions = sessions.filter(session => session.status === 'upcoming');
  const pastSessions = sessions.filter(session => session.status !== 'upcoming');

  return (
    <div className="space-y-6">
      {/* Gig Creation Modal */}
      <Modal
        isOpen={isGigModalOpen}
        onRequestClose={() => setIsGigModalOpen(false)}
        className="scrollbar-hide bg-white md:rounded-xl   max-w-2xl mx-auto mt-20"
        overlayClassName="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{
          content: {
            height: '90vh',
            overflowY: 'auto',
          },
        }}
       >
        <div className="flex justify-between items-center mb-6 sticky top-0 p-4 bg-gray-700 text-white z-10">
          <h2 className="text-2xl font-bold">Create New Learning Gig</h2>
          <button 
            onClick={() => setIsGigModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className='font-bold text-2xl' >x</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Gig Title
                <input
                  {...register('title', { required: true })}
                  className={`mt-1 block w-full rounded-lg border-2 focus:bg-blue-100 ${errors.title ? 'border-red-500' : 'border-gray-500'} p-3`}
                  placeholder="e.g., Learn Advanced Python Programming"
                />
              </label>
            </div>

            
            <div className='col-span-2' >
              {/* Subject Area */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject/Skill
                  <input
                    {...register('subject', { required: true })}
                    className={`mt-1 block w-full rounded-lg border-2 focus:bg-blue-100 ${errors.subject ? 'border-red-500' : 'border-gray-500'} p-3`}
                    placeholder="e.g., Machine Learning, Guitar"
                  />
                </label>
              </div>
              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Budget Range ($)
                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      {...register('budgetRange.0', { required: true, min: 0 })}
                      className={`w-1/2 rounded-lg border-2 focus:bg-blue-100 ${errors.budgetRange?.[0] ? 'border-red-500' : 'border-gray-500'} p-3`}
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      {...register('budgetRange.1', { required: true, min: 0 })}
                      className={`w-1/2 rounded-lg border-2 focus:bg-blue-100 ${errors.budgetRange?.[1] ? 'border-red-500' : 'border-gray-500'} p-3`}
                      placeholder="Max"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Location Type */}
            <div className='col-span-2' >
              <label className="block text-sm font-medium mb-2">
                Location Preference
                <select
                  {...register('locationType', { required: true })}
                  className={`mt-1 block w-full rounded-lg border-2 focus:bg-blue-100 ${errors.locationType ? 'border-red-500' : 'border-gray-500'} p-3`}
                >
                  <option value="online">Online Only</option>
                  <option value="onsite">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      minDate={new Date()}
                      className={`mt-1 block w-full rounded-lg border-2 ${
                        errors.startDate ? 'border-red-500' : 'border-gray-500'
                      } p-3`}
                      placeholderText="Select start date"
                    />
                  )}
                />
              </label>
            </div>

            {/* End Date */}
            <div className=''>
              <label className="block text-sm font-medium mb-2">
                End Date
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      minDate={new Date()}
                      className={`mt-1 block w-full rounded-lg border-2 ${
                        errors.endDate ? 'border-red-500' : 'border-gray-500'
                      } p-3`}
                      placeholderText="Select end date"
                    />
                  )}
                />
              </label>
            </div>

            {/* Daily Duration */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Daily Duration (hours)
                <input
                  type="number"
                  {...register('dailyDuration', { required: true, min: 1 })}
                  className={`mt-1 block w-full rounded-lg border-2 ${
                    errors.dailyDuration ? 'border-red-500' : 'border-gray-500'
                  } p-3`}
                  placeholder="e.g., 2"
                />
              </label>
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Daily Start Time
                <input
                  type="time"
                  {...register('startTime', { required: true })}
                  className={`mt-1 block w-full rounded-lg border-2 ${
                    errors.startTime ? 'border-red-500' : 'border-gray-500'
                  } p-3`}
                />
              </label>
            </div>
          </div>
            

            {/* Learning Goals */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Learning Goals
                <textarea
                  {...register('description', { required: true })}
                  className={`mt-1 block w-full rounded-lg border-2 focus:bg-blue-100  ${errors.description ? 'border-red-500' : 'border-gray-500'} p-3 h-32`}
                  placeholder="Describe what you want to achieve..."
                />
              </label>
            </div>

            {/* Tutor Qualifications */}
            <div className="col-span-2">
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Tutor Requirements</legend>
                {['Certified Teacher', 'Industry Expert', 'Native Speaker', 'University Student'].map((qualification) => (
                  <label key={qualification} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={qualification}
                      {...register('tutorQualifications')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{qualification}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsGigModalOpen(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post Gig
            </button>
          </div>
        </form>
      </Modal>

      {/* Gig List Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Learning Gigs</h3>
          <button 
            onClick={() => setIsGigModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Icon name="plus" size={18} />
            Create New Gig
          </button>
        </div>

        <div className="grid gap-4">
          {gigs.map(gig => (
            <div key={gig.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-lg">{gig.title}</h4>
                  {getStatusBadge(gig.status)}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="users" size={16} />
                  <span>{gig.interestedTutors} tutors interested</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-gray-500">Subject</label>
                  <p className="font-medium">{gig.subject}</p>
                </div>
                <div>
                  <label className="text-gray-500">Budget</label>
                  <p className="font-medium">
                    ${gig.budgetRange[0]} - ${gig.budgetRange[1]}/hr
                  </p>
                </div>
                <div>
                  <label className="text-gray-500">Schedule</label>
                  <p className="font-medium">
                    {gig.startDate.toLocaleDateString()} -{' '}
                    {gig.endDate.toLocaleDateString()}
                  </p>
                  <div>
                  <label className="text-gray-500">Daily Duration</label>
                  <p className="font-medium">{gig.dailyDuration} hours</p>
                </div>
                <div>
                  <label className="text-gray-500">Start Time</label>
                  <p className="font-medium">{gig.startTime}</p>
                </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="clock" size={14} />
                  <span>
                    Created: {gig.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="location" size={14} />
                  <span className="capitalize">{gig.locationType}</span>
                </div>
              </div>
            </div>
          ))}

          {gigs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="file" size={24} className="mx-auto mb-2" />
              No active learning gigs found
            </div>
          )}
        </div>
      </div>

      {/* Calendar and Session Preparation Sections (Keep previous implementation) */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
        <div className="space-y-4">
          {upcomingSessions.map(session => (
            <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{session.title}</h4>
                {getStatusBadge(session.status)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-gray-500">Tutor</label>
                  <p className="font-medium">{session.tutor}</p>
                </div>
                <div>
                  <label className="text-gray-500">Date & Time</label>
                  <p className="font-medium">
                    {session.date.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-gray-500">Duration</label>
                  <p className="font-medium">{session.duration} minutes</p>
                </div>
              </div>
            </div>
          ))}

          {upcomingSessions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="calendar" size={24} className="mx-auto mb-2" />
              No upcoming sessions found
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Past Sessions</h3>
        <div className="space-y-4">
          {pastSessions.map(session => (
            <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{session.title}</h4>
                {getStatusBadge(session.status)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-gray-500">Tutor</label>
                  <p className="font-medium">{session.tutor}</p>
                </div>
                <div>
                  <label className="text-gray-500">Date & Time</label>
                  <p className="font-medium">
                    {session.date.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-gray-500">Duration</label>
                  <p className="font-medium">{session.duration} minutes</p>
                </div>
              </div>
            </div>
          ))}

          {pastSessions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="history" size={24} className="mx-auto mb-2" />
              No past sessions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;