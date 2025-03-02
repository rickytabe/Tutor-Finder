// components/Main/learner-pages/Learner_Dashboard/DashboardComponents/Calendar.tsx
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SessionCalendar: React.FC = () => {
  const [events] = useState([
    {
      title: 'Math Session',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 11, 30),
    },
    // Add more events
  ]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      eventPropGetter={(_event: any) => ({
        style: { backgroundColor: '#3B82F6' }
      })}
    />
  );
};

export default SessionCalendar;