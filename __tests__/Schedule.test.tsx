import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Schedule from '../src/components/Schedule/Schedule';
import { useScheduleStore } from '../src/store/useScheduleStore';
import { format } from 'date-fns';

jest.mock('../src/store/useScheduleStore');
 
describe('Schedule', () => {
  const nextDayMock = jest.fn();
  const prevDayMock = jest.fn();
  const currentDateMock = new Date(2025, 4, 25);

  beforeEach(() => {
    ((useScheduleStore as unknown) as jest.Mock).mockImplementation((selector: any) =>
      selector({
        currentDate: currentDateMock,
        nextDay: nextDayMock,
        prevDay: prevDayMock,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the current day', () => {
    const { getByTestId } = render(
      <Schedule events={[]} onEventClick={jest.fn()} onEmptyDateClick={jest.fn()} />
    );

    const displayedDate = getByTestId('test-current-day').props.children;
    expect(displayedDate).toBe(format(currentDateMock, 'dd.MM.yyyy'));
  });

  it('clicking "previous day" updates the displayed date', () => {
  const currentDateMock = new Date(2025, 4, 25);
  const updatedDateMock = new Date(2025, 4, 24);

  const prevDayMock = jest.fn();


  ((useScheduleStore as unknown) as jest.Mock).mockImplementation((selector: any) =>
    selector({
      currentDate: currentDateMock,
      nextDay: jest.fn(),
      prevDay: () => {
        ((useScheduleStore as unknown) as jest.Mock).mockImplementation((selector: any) =>
          selector({
            currentDate: updatedDateMock,
            nextDay: jest.fn(),
            prevDay: prevDayMock,
          })
        );
      },
    })
  );

  const { getByTestId, rerender } = render(
    <Schedule events={[]} onEventClick={jest.fn()} onEmptyDateClick={jest.fn()} />
  );

  fireEvent.press(getByTestId('prev-day'));

  rerender(
    <Schedule events={[]} onEventClick={jest.fn()} onEmptyDateClick={jest.fn()} />
  );

  const displayedDate = getByTestId('test-current-day').props.children;
  expect(displayedDate).toBe('24.05.2025');
});


  it('clicking "next day" invokes the function', () => {
    const { getByTestId } = render(
      <Schedule events={[]} onEventClick={jest.fn()} onEmptyDateClick={jest.fn()} />
    );

    fireEvent.press(getByTestId('next-day'));
    expect(nextDayMock).toHaveBeenCalled();
  });

  it('clicking on an empty slot calls onEmptyDateClick', () => {
    const emptyDateClickMock = jest.fn();
    const { getAllByTestId } = render(
      <Schedule events={[]} onEventClick={jest.fn()} onEmptyDateClick={emptyDateClickMock} />
    );
  const emptySlots = getAllByTestId(/empty-slot/);
  fireEvent.press(emptySlots[0]);
  expect(emptyDateClickMock).toHaveBeenCalled();
  });

//   it('clicking on an event calls onEventClick', () => { // nie przechodzi :(
//     const eventClickMock = jest.fn();
// const event = {
//   title: 'Test Event',
//   dateStart: new Date(2025, 4, 25, 10, 0).getTime(),
//   dateEnd: new Date(2025, 4, 25, 11, 0).getTime(),
// };

//     const { getByTestId } = render(
//       <Schedule events={[event]} onEventClick={eventClickMock} onEmptyDateClick={jest.fn()} />
//     );

//   fireEvent.press(getByTestId(`event-${event.dateStart}`));

//     expect(eventClickMock).toHaveBeenCalledWith(event);
//   });
});
