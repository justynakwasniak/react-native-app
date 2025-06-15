import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Schedule
        events={events}
        onEventClick={handleEventClick}
        onEmptyDateClick={handleEmptyDateClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScheduleScreen;
