import 'react-native-get-random-values';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoListScreen from './src/screens/ToDoListScreen';
import AboutScreen from './src/screens/AboutScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';


const queryClient = new QueryClient();
const Stack = createStackNavigator();

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
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
