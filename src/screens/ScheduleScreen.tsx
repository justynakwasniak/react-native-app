import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import Schedule from '../components/Schedule/Schedule';
import { useSchedule } from '../hooks/useSchedule';

const ScheduleScreen = () => {
  const { events, loading, error, handleEventClick, handleEmptyDateClick } = useSchedule();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Schedule
      events={events}
      onEventClick={handleEventClick}
      onEmptyDateClick={handleEmptyDateClick}
    />
  );
};

export default ScheduleScreen;
