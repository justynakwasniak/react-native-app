import { create } from 'zustand';
import { addDays } from 'date-fns';

type ScheduleState = {
  currentDate: Date;
  nextDay: () => void;
  prevDay: () => void;
  setDate: (date: Date) => void;
};

export const useScheduleStore = create<ScheduleState>((set) => ({
  currentDate: new Date(),
  nextDay: () => set((state) => ({ currentDate: addDays(state.currentDate, 1) })),
  prevDay: () => set((state) => ({ currentDate: addDays(state.currentDate, -1) })),
  setDate: (date) => set({ currentDate: date }),
}));
