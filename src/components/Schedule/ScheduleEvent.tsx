import React from 'react';
import {  Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarEvent } from './types';
import { formatTime } from '../../utils/formatTime';

type ScheduleEventProps = {
  event: CalendarEvent;
  onEventClick: (event: CalendarEvent) => void;
    testID?: string;

};

const ScheduleEvent = ({ event, onEventClick }: ScheduleEventProps) => {
  return (
    <TouchableOpacity testID={`event-${event.dateStart}`} style={styles.eventContainer} onPress={() => onEventClick(event)}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text>{formatTime(event.dateStart)} - {formatTime(event.dateEnd)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: '#4A90E2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  eventTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScheduleEvent;
