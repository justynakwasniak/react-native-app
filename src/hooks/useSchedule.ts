import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents } from '../api/events';
import { CalendarEvent } from '../components/Schedule/types';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  authDomain: 'react-native.firebaseapp.com',
  projectId: 'react-native-423ce',
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(firebaseApp);

export const useSchedule = () => {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading: loading, error } = useQuery<CalendarEvent[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const { mutate: eventEdit } = useMutation({
    mutationFn: async (newEvent: CalendarEvent) => {
      await addDoc(collection(db, 'events'), {
        ...newEvent,
        dateStart: { seconds: newEvent.dateStart },
        dateEnd: { seconds: newEvent.dateEnd },
      });
      return newEvent;
    },
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ['events'] });
      const previousEvents = queryClient.getQueryData<CalendarEvent[]>(['events']);
      queryClient.setQueryData<CalendarEvent[]>(['events'], (old = []) => [...old, newEvent]);
      return { previousEvents };
    },
    onError: (err, newEvent, context) => {
      console.error('Error while editing event:', err);
      if (context?.previousEvents) {
        queryClient.setQueryData(['events'], context.previousEvents);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const handleEventClick = (event: CalendarEvent) => {
    console.log(`This hour is occupied by: ${event.title}`);
  };

  const handleEmptyDateClick = (date: Date) => {
    const newEvent: CalendarEvent = {
      dateStart: Math.floor(date.getTime() / 1000),
      dateEnd: Math.floor(date.getTime() / 1000) + 3600,
      title: 'New event',
    };

    eventEdit(newEvent);
  };

  return {
    events,
    loading,
    error: error ? error.message : null,
    handleEventClick,
    handleEmptyDateClick,
  };
};
