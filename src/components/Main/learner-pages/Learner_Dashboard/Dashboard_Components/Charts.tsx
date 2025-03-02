// components/Main/learner-pages/Learner_Dashboard/DashboardComponents/Charts.tsx
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from 'recharts';

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export const SpendingPieChart: React.FC = () => {
  const data = [
    { name: 'Mathematics', value: 45 },
    { name: 'Physics', value: 30 },
    { name: 'Programming', value: 15 },
    { name: 'Other', value: 10 }
  ];

  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export const EarningsBarChart: React.FC = () => {
  const data = [
    { month: 'Jan', earnings: 4000 },
    { month: 'Feb', earnings: 3000 },
    { month: 'Mar', earnings: 6000 },
    // Add more months
  ];

  return (
    <BarChart width={400} height={200} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
    </BarChart>
  );
};