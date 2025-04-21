import { CalendarEvent } from '../components/Schedule/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents } from '../api/events';

export const useSchedule = () => {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading: loading, error } = useQuery<CalendarEvent[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const { mutate: eventEdit } = useMutation({
    mutationFn: async (newEvent: CalendarEvent) => {
      return new Promise<CalendarEvent>((resolve) => {
        setTimeout(() => resolve(newEvent), 300);
      });
    },
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ['events'] });

      const previousEvents = queryClient.getQueryData<CalendarEvent[]>(['events']);

      queryClient.setQueryData<CalendarEvent[]>(['events'], (old = []) => [...old, newEvent]);

      return { previousEvents };
    },
    onError: (err, newEvent, context) => {
      console.error('Error occurred while editing event:', err);
      if (context?.previousEvents) {
        queryClient.setQueryData(['events'], context.previousEvents);
      }
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
