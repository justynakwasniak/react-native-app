import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Schedule from '../src/components/Schedule/Schedule';
import { useScheduleStore } from '../src/store/useScheduleStore';
import { jest, describe, expect } from '@jest/globals';

jest.mock('../src/store/useScheduleStore'); 
jest.mock('../src/components/Schedule/ScheduleHeader', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');

  return {
    __esModule: true, 
    default: ({ changeDay }: any) => (
      <View>
        <Text>MockedHeader</Text>
        <TouchableOpacity testID="prev-day" onPress={() => changeDay(-1)}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="next-day" onPress={() => changeDay(1)}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});


jest.mock('../src/components/Schedule/ScheduleDay', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');

  return ({ events, onEventClick, onEmptyDateClick }: any) => {
    return (
      <View>
        <TouchableOpacity testID="empty-slot" onPress={() => onEmptyDateClick(new Date())}>
          <Text>Empty Slot</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="event" onPress={() => onEventClick(events[0])}>
          <Text>{events[0]?.title ?? 'No Event'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

describe('Schedule', () => {
  const nextDayMock = jest.fn();
  const prevDayMock = jest.fn();
  const currentDateMock = new Date();
  beforeEach(() => { 
    (useScheduleStore as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({
        currentDate: currentDateMock,
        nextDay: nextDayMock,
        prevDay: prevDayMock,
      })
    );
  });
//5
  afterEach(() => {
    jest.clearAllMocks();
  });
//6
  it('clicked prev day', async () => { 
    const { getByTestId } = render(
      <Schedule
        events={[]}
        onEventClick={jest.fn()}
        onEmptyDateClick={jest.fn()}
      />
    );

    fireEvent.press(getByTestId('prev-day'));

    expect(prevDayMock).toHaveBeenCalled();
  });

  it('clicked next day', async () => { 
    const { getByTestId } = render(
      <Schedule
        events={[]}
        onEventClick={jest.fn()}
        onEmptyDateClick={jest.fn()}
      />
    );

    fireEvent.press(getByTestId('next-day'));

    expect(nextDayMock).toHaveBeenCalled();
  });

  it('clicked on an empty slot', async () => {

    const emptyDateClickMock = jest.fn();

    const { getByTestId } = render(
      <Schedule
        events={[]}
        onEventClick={jest.fn()}
        onEmptyDateClick={emptyDateClickMock}
      />
    );

    fireEvent.press(getByTestId('empty-slot'));

    expect(emptyDateClickMock).toHaveBeenCalled();
  });

  it('clicked on the event', async () => { 

    const eventClickMock = jest.fn();
    const event = { title: 'Test Event', dateStart: 0, dateEnd: 0 };

    const { getByTestId } = render(
      <Schedule
        events={[event]}
        onEventClick={eventClickMock}
        onEmptyDateClick={jest.fn()}
      />
    );

    fireEvent.press(getByTestId('event')); 



    expect(eventClickMock).toHaveBeenCalledWith(event); 
  });
});


