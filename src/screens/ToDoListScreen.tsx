import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useStore } from '../store/useTodoStore';
import { useTasks } from '../hooks/useTasks';

const ToDoListScreen = ({ navigation }: any) => {
  const [task, setTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const { tasks, addTask, removeTask, editTask, toggleTaskCompletion } = useStore();
  const { isLoading, isError, refetch } = useTasks();

  const handleSubmit = () => {
    if (!task.trim()) {
      return;
    }

    if (editingTaskId) {
      editTask(editingTaskId, task);
      setEditingTaskId(null);
    } else {
      addTask(task);
    }
    setTask('');
  };

  const startEditing = (id: string, text: string) => {
    setEditingTaskId(id);
    setTask(text);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (isError) {
    return <Text>Failed to load tasks</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Task"
        style={styles.input}
      />
      <View style={styles.buttonSpacing}>
        <Button title={editingTaskId ? 'Save' : 'Add'} onPress={handleSubmit} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text
              style={[
                styles.taskText,
                item.isCompleted && styles.completedTask,
              ]}
            >
              {item.text}
            </Text>
            <View style={styles.buttonSpacing}>
              <Button title="Edit" onPress={() => startEditing(item.id, item.text)} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button title="Delete" onPress={() => removeTask(item.id)} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button
                title={item.isCompleted ? 'Undo' : 'Complete'}
                onPress={() => toggleTaskCompletion(item.id)}
              />
            </View>
          </View>
        )}
      />

      <View style={styles.buttonSpacing}>
        <Button title="Refetch" onPress={() => refetch()} />
      </View>
      <View style={styles.buttonSpacing}>
        <Button title="Go to schedule" onPress={() => navigation.navigate('Schedule')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    flexWrap: 'wrap',
    gap: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonSpacing: {
    marginVertical: 4,
  },
});

export default ToDoListScreen;
