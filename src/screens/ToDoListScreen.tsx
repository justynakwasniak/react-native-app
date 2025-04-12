import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import useStore from '../store/useTodoStore';
import { fetchTasks } from '../api/api';

interface Task {
  id: string;
  text: string;
}

interface FetchTasksResponse {
  id: number;
  text: string;
}
//stan aplikacji
const ToDoListScreen: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const { tasks, addTask, removeTask } = useStore();
//pobieranie zadan z API
  const { isLoading, isError, refetch } = useQuery<FetchTasksResponse[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const data = await fetchTasks();
      const existingTexts = new Set(tasks.map((t) => t.text));
      data.forEach((fetchedTask) => {
        if (!existingTexts.has(fetchedTask.text)) {
          addTask(fetchedTask.text);
        }
      });
      return data;
    },
  });
//dodawanie zadan do listy
  const handleAddTask = (): void => {
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Add a task"
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddTask} />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <Text>Error loading tasks</Text>
      ) : (
        <>
          <FlatList
            data={tasks}
            keyExtractor={(item: Task) => item.id}
            renderItem={({ item }: { item: Task }) => (
              <View style={styles.taskContainer}>
                <Text style={styles.taskText}>{item.text}</Text>
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Button title="Refetch Tasks" onPress={() => refetch()} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  container: {
    padding: 20,
    backgroundColor: 'white', // dodaj dla testu

  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteText: {
    color: 'red',
  },
  taskText: {
    flex: 1,
  },
});

export default ToDoListScreen;
