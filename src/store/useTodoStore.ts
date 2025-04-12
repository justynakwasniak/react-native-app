import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface Task {
  id: string;
  text: string;
}

interface TodoStore { //sklep zadan
  tasks: Task[]; //lista zadan
  addTask: (text: string) => void; //dodawanie zadan
  removeTask: (id: string) => void; //usuwanie zadan
}

const useStore = create<TodoStore>((set) => ({ //tworzenie sklepu
  tasks: [], //pusta lista zadan
  addTask: (text: string) => //dodawanie zadania
    set((state) => ({ //aktualizacja stanu
      tasks: [...state.tasks, { id: nanoid(), text }], //dodanie nowego zadania z unikalnym id
    })),
  removeTask: (id: string) => //usuwanie zadania
    set((state) => ({ //aktualizacja stanu
      tasks: state.tasks.filter((task) => task.id !== id), //usuwanie zadania o podanym id
    })),
}));

export default useStore;
