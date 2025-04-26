import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../api/api';
import { useStore } from '../store/useTodoStore';

export const useTasks = () => {
  const { tasks, addTask } = useStore();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const data = await fetchTasks();
      const existingTexts = new Set(tasks.map((t) => t.text));

      data.forEach((item) => {
        if (!existingTexts.has(item.text)) {
          addTask(item.text);
        }
      });

      return data;
    },
  });

  return { isLoading, isError, data, refetch };
};
