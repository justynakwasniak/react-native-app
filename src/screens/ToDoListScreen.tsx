
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import useStore from '../store/useTodoStore';
import { fetchTasks } from '../api/api';

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface FetchTasksResponse {
  id: number;
  text: string;
}

const ToDoListScreen: React.FC = ({ navigation }: any) => {
  const [task, setTask] = useState<string>(''); //  stan do przechowywania tekstu zadania
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // stan do przechowywania ID edytowanego zadania
  const { tasks, addTask, removeTask, editTask, toggleTaskCompletion } = useStore(); //  użycie  Zustand do zarządzania stanem zadań

  const { isLoading, isError, refetch } = useQuery<FetchTasksResponse[], Error>({ //  użycie React Query do pobierania zadań
    queryKey: ['tasks'], //  klucz zapytania
    queryFn: async () => { //  funkcja zapytania
      const data = await fetchTasks(); // pobieranie zadań z API
      const existingTexts = new Set(tasks.map((t) => t.text)); //  zbiór istniejących zadań
      data.forEach((fetchedTask) => { //  iteracja po pobranych zadaniach
        if (!existingTexts.has(fetchedTask.text)) { //  sprawdzenie, czy zadanie już istnieje
          addTask(fetchedTask.text); //  dodanie zadania do stanu
        }
      });
      return data;
    },
  });

  const handleAddTask = (): void => {
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  const handleEditTask = (id: string, newText: string) => { // Funkcja do edytowania zadania
    if (newText.trim()) {
      editTask(id, newText);
      setEditingTaskId(null);
      setTask('');
    }
  };

  const startEditingTask = (taskId: string, currentText: string) => { // Funkcja do rozpoczęcia edycji zadania
    setEditingTaskId(taskId);
    setTask(currentText); // Ustawienie tekstu zadania do edycji
  };

  return (
    <View style={styles.container}> 
      {editingTaskId ? ( //  jeśli edytujemy zadanie, wyświetlamy pole tekstowe do edycji
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Edit task"
          style={styles.input}
        />
      ) : ( //  //  //  jeśli dodajemy nowe zadanie, wyświetlamy pole tekstowe do dodawania
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Add a task"
          style={styles.input}
        />
      )}

      <Button title={editingTaskId ? "Save Changes" : "Add Task"} onPress={() => { //  przycisk do dodawania lub edytowania zadania
        if (editingTaskId) {
          handleEditTask(editingTaskId, task);
        } else {
          handleAddTask();
        }
      }} />

      {isLoading ? ( //  //  //  jeśli ładujemy zadania, wyświetlamy wskaźnik ładowania
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
                <Text style={[styles.taskText, item.isCompleted && styles.completedTask]}>
                  {item.text}
                </Text>
                <TouchableOpacity onPress={() => startEditingTask(item.id, item.text)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                  <Text style={styles.toggleText}>{item.isCompleted ? "Mark as Incomplete" : "Mark as Completed"}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Button title="Refetch Tasks" onPress={() => refetch()} />
        </>
      )}

      <View style={styles.buttonSpacing} />
      <Button title="Go to About" onPress={() => navigation.navigate('About')} />
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
    backgroundColor: 'white',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
  editText: {
    color: 'blue',
    marginLeft: 10,
  },
  toggleText: {
    color: 'green',
    marginLeft: 10,
  },
  taskText: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonSpacing: {
    marginVertical: 10,
  },
});

export default ToDoListScreen;
