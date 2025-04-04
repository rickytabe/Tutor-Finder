// components/Main/learner-pages/Learner_Dashboard/LearningOverview.tsx
import ProgressBar from "./components/ProgressBar";
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
import { Clock, BookOpen, Award, Zap, Calendar } from "react-feather";
import { format, differenceInDays } from "date-fns";

// Sample data
const weeklyHoursData = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 2 },
];

const focusTimeData = [{ name: "Focus", value: 75, fill: "#3b82f6" }];

interface Session {
  course: string;
  tutor: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
}

const currentSessions: Session[] = [
  {
    course: "Advance Level Mathematics",
    tutor: "Dr. Smith",
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2025, 2, 21),
    completed: true,
  },
  {
    course: "Physics with mechaics",
    tutor: "Prof. Johnson",
    startDate: new Date(2025, 2, 5),
    endDate: new Date(2025, 2, 25),
    completed: false,
  },
  {
    course: "Advance Level Chemistry",
    tutor: "Mr. Brown",
    startDate: new Date(2025, 2, 5),
    endDate: new Date(2025, 2, 25),
    completed: false,
  },
];

const stats = [
  { id: 1, title: "Total Hours", value: "142", Icon: Clock },
  { id: 2, title: "Active Courses", value: "6", Icon: BookOpen },
  { id: 3, title: "Current Streak", value: "12 days", Icon: Zap },
];

const LearningOverview: React.FC = () => {
  const calculateSessionDays = (session: Session) => {
    const daysHeld = differenceInDays(new Date(), session.startDate);
    const totalDays = differenceInDays(session.endDate, session.startDate);
    const daysLeft = totalDays - daysHeld;
    return { daysHeld, daysLeft };
  };

  return (
    <div className="space-y-6 hide-scrollbar pt-10">
      {/* Quick Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map(({ id, title, value, Icon }) => (
          <div
            key={id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
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
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Course Progress
            </h3>
            <div className="space-y-4">
              <ProgressBar course="Mathematics" progress={65} />
              <ProgressBar course="Physics" progress={42} />
              <ProgressBar course="Chemistry" progress={88} />
            </div>
          </div>

          {/* Study Time Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Study Hours
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyHoursData}>
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Sessions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Active Sessions
            </h3>
            <div className="space-y-4">
              {currentSessions.map((session, index) => {
                const { daysHeld, daysLeft } = calculateSessionDays(session);
                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {session.course}
                        </h4>
                        <p className="text-sm text-gray-500">
                          with {session.tutor}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
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
                      <span>{daysHeld}d held</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Focus Time Radial Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Daily Focus Time
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="90%"
                  data={focusTimeData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background dataKey="value" cornerRadius={10} />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-blue-600"
                  >
                    75%
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" /> Achievements
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "5-Day Streak",
                "Top 10% Learner",
                "Fast Learner",
                "Perfect Attendance",
              ].map((badge, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningOverview;
