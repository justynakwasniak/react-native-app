import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;

}

interface TodoStore {
  tasks: Task[];
  addTask: (text: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  toggleTaskCompletion: (id: string) => void;

}
export const useStore = create<TodoStore>((set) => ({
  tasks: [],
  addTask: (text: string) =>
    set((state) => ({
      tasks: [...state.tasks, { id: nanoid(), text, isCompleted: false }],
    })),
  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  editTask: (id: string, newText: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      ),
    })),
  toggleTaskCompletion: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    })),
}));

