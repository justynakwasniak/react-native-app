import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { CalendarEvent } from './types';
import { fromUnixTime, format } from 'date-fns';
import ScheduleEvent from './ScheduleEvent';

type Props = {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onEmptyDateClick: (date: Date) => void;
};

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);

const ScheduleDay = ({ date, events, onEventClick, onEmptyDateClick }: Props) => {
  const dayEvents = events.filter(event =>
    format(fromUnixTime(event.dateStart), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  return (
    <ScrollView style={styles.container}>
      {HOURS.map(hour => {
        const blockTime = new Date(date);
        blockTime.setHours(hour, 0, 0, 0);

        const eventAtHour = dayEvents.find(event => {
          const eventDate = fromUnixTime(event.dateStart);
          return eventDate.getHours() === hour;
        });

        return (
          <View key={hour} style={styles.hourBlock}>
            {eventAtHour ? (
              <ScheduleEvent event={eventAtHour} onEventClick={onEventClick} />
            ) : (
              <TouchableOpacity onPress={() => onEmptyDateClick(blockTime)}>
                <Text style={styles.hourLabel}>{`${hour}:00`}</Text>
                <Text style={styles.emptyText}>Add Event</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  hourBlock: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  hourLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  emptyText: {
    color: '#999',
  },
});

export default ScheduleDay;

