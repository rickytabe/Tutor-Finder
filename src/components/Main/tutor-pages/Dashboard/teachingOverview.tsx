// components/Main/tutor-pages/Tutor_Dashboard/TeachingOverview.tsx
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  FiClock,
  FiUsers,
  FiZap,
  FiCalendar,
  FiAward,
  FiBook,
} from "react-icons/fi";
import { format, differenceInDays } from "date-fns";
import ProgressBar from "../../learner-pages/Learner_Dashboard/components/ProgressBar";

// Sample data
const weeklyHoursData = [
  { day: "Mon", hours: 5 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 5 },
  { day: "Sat", hours: 3 },
  { day: "Sun", hours: 2 },
];

const engagementData = [
  { name: "Engagement", value: 82, fill: "url(#engagementGradient)" },
];

interface Session {
  course: string;
  student: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  subjectColor: string;
}

const currentSessions: Session[] = [
  {
    course: "Advanced Mathematics",
        student: "Ken Thom",
    startDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 3, 21),
    completed: true,
    subjectColor: "#6366f1",
  },
  {
    course: "Physics Mechanics",
    student: "Gon Goo",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 4, 20),
    completed: false,
    subjectColor: "#3b82f6",
  },
  {
    course: "Organic Chemistry",
    student: "Emmanuel",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 4, 25),
    completed: false,
    subjectColor: "#10b981",
  },
];

const stats = [
  {
    id: 1,
    title: "Teaching Hours",
    value: "245",
    Icon: FiClock
  },
  {
    id: 2,
    title: "Active Students",
    value: "18",
    Icon: FiUsers,
  },
  {
    id: 3,
    title: "Teaching Streak",
    value: "24 days",
    Icon: FiZap,
  },
];

const TeachingOverview: React.FC = () => {
  const calculateSessionProgress = (session: Session) => {
    const daysTaught = differenceInDays(new Date(), session.startDate);
    const totalDays = differenceInDays(session.endDate, session.startDate);
    const daysLeft = totalDays - daysTaught;
    return { daysTaught, daysLeft };
  };

  const StatCard = ({ title, value, Icon }: (typeof stats)[number]) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Animated Stats Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teaching Progress */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiBook className="w-5 h-5 text-blue-600" />
              Course Mastery Tracking
            </h3>
            <div className="space-y-4">
              {currentSessions.map((session, index) => (
                <div key={index} className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 blur-sm opacity-50"
                    style={{
                      background: `linear-gradient(to right, ${session.subjectColor}20, #fff)`,
                    }}
                  />
                  <ProgressBar
                    course={session.course}
                    progress={Math.random() * 100}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Teaching Schedule */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiZap className="w-5 h-5 text-blue-600" />
              Weekly Teaching Schedule
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyHoursData}>
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Sessions */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiCalendar className="w-5 h-5 text-blue-600" />
              Ongoing Teaching Sessions
            </h3>
            <div className="space-y-4">
              {currentSessions.map((session, index) => {
                const { daysTaught, daysLeft } =
                  calculateSessionProgress(session);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 h-full w-1"
                      style={{ backgroundColor: session.subjectColor }}
                    />
                    <div className="ml-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {session.course}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Student: {session.student}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            daysLeft <= 3
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {daysLeft}d left
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>
                          Started: {format(session.startDate, "MMM dd")}
                        </span>
                        <span>{daysTaught}d taught</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Student Engagement */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUsers className="w-5 h-5 text-blue-600" />
              Student Engagement Rate
            </h3>
            <div className="h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="90%"
                  data={engagementData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <defs>
                    <linearGradient
                      id="engagementGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    className="animate-pulse-slow"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-blue-600"
                  >
                    82%
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Teaching Milestones */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiAward className="w-5 h-5 text-blue-600" />
              Teaching Milestones
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "1000 Hours Taught",
                "50+ Students",
                "95% Satisfaction",
                "Consistent Performer",
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {badge}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TeachingOverview;
