import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';

type Props = {
  currentDate: Date;
  changeDay: (days: number) => void;
};

const ScheduleHeader = ({ currentDate, changeDay }: Props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => changeDay(-1)} style={styles.button}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>{format(currentDate, 'dd.MM.yyyy')}</Text>
      <TouchableOpacity onPress={() => changeDay(1)} style={styles.button}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScheduleHeader;
