import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarEvent } from './types';
import ScheduleHeader from './ScheduleHeader';
import ScheduleDay from './ScheduleDay';
import { useScheduleStore } from '../../store/useScheduleStore';

type Props = {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onEmptyDateClick: (date: Date) => void;
};

const Schedule = ({ events, onEventClick, onEmptyDateClick }: Props) => { 
  const currentDate = useScheduleStore(state => state.currentDate);
  const nextDay = useScheduleStore(state => state.nextDay);
  const prevDay = useScheduleStore(state => state.prevDay);

  const changeDay = (days: number) => {
    days > 0 ? nextDay() : prevDay();
  };

  return (
    <View style={styles.container}>
      <ScheduleHeader currentDate={currentDate} changeDay={changeDay} />
      <ScheduleDay
        date={currentDate}
        events={events}
        onEventClick={onEventClick}
        onEmptyDateClick={onEmptyDateClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Schedule;
