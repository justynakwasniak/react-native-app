
export interface Task {
    id: number;
    text: string;
  }
    export const fetchTasks = async (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, text: 'Buy groceries' },
          { id: 2, text: 'Walk the dog' },
          { id: 3, text: 'Learn React Native' }
        ]);
      }, 1000);
    });
  };
