// components/Main/learner-pages/Learner_Dashboard/DashboardComponents/Heatmap.tsx
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface HeatmapProps {
  data: Array<{
    date: Date;
    count: number;
  }>;
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  // Generate mock data if no data is provided
  const demoData = data || Array.from({ length: 100 }, (_, i) => ({
    date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
    count: Math.floor(Math.random() * 4)
  }));

  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)}
        endDate={new Date()}
        values={demoData}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value): any => ({
          'data-tip': value?.date 
            ? `${value.date.toLocaleDateString()}: ${value.count} study hours`
            : 'No data'
        })}
        showWeekdayLabels
        onClick={(value) => console.log('Selected date:', value)}
      />
      
      {/* Legend */}
      <div className="heatmap-legend mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-color-empty rounded-sm"></div>
          <span className="text-sm">0h</span>
        </div>
        {[1, 2, 3, 4].map((value) => (
          <div key={value} className="flex items-center gap-1">
            <div className={`w-4 h-4 bg-color-scale-${value} rounded-sm`}></div>
            <span className="text-sm">{value}h+</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;