import 'react-native-get-random-values'; //  do generowania unikalnych ID
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native'; //  kontener nawigacji
import { createStackNavigator } from '@react-navigation/stack'; //  stack do nawigacji
import ToDoListScreen from './src/screens/ToDoListScreen'; // Ekran z listą zadań
import AboutScreen from './src/screens/AboutScreen'; // Ekran z informacjami

const queryClient = new QueryClient();
const Stack = createStackNavigator(); //  stos do nawigacji

export default function App() {
  if (!queryClient) {
    throw new Error('QueryClient not initialized');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="About">
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="ToDoList" component={ToDoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
