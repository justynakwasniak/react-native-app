import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface Task {
  id: string;
  text: string;
  isCompleted: boolean; //  status wykonania zadania

}

interface TodoStore { //sklep zadan
  tasks: Task[]; //lista zadan
  addTask: (text: string) => void; //dodawanie zadan
  removeTask: (id: string) => void; //usuwanie zadan
  editTask: (id: string, newText: string) => void; //edycja zadan
  toggleTaskCompletion: (id: string) => void; // przełączanie statusu wykonania zadania

}
const useStore = create<TodoStore>((set) => ({
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

export default useStore;