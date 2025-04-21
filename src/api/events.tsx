import { CalendarEvent } from '../components/Schedule/types';

export const fetchEvents = async (): Promise<CalendarEvent[]> => { 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          dateStart: Math.floor(new Date().setHours(10, 0, 0) / 1000),
          dateEnd: Math.floor(new Date().setHours(11, 0, 0) / 1000),
          title: 'Morning Meeting',
        },
        {
          dateStart: Math.floor(new Date().setHours(14, 0, 0) / 1000),
          dateEnd: Math.floor(new Date().setHours(15, 0, 0) / 1000),
          title: 'Project Review',
        },
        {
          dateStart: Math.floor(new Date().setHours(18, 0, 0) / 1000),
          dateEnd: Math.floor(new Date().setHours(20, 0, 0) / 1000),
          title: 'Training',
        },
      ]);
    }, 500);
  });
};
