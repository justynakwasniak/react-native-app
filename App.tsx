import 'react-native-get-random-values'; //Importuje bibliotekę, która pozwala na generowanie losowych wartości
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
//QueryClient zarządza zapytaniami w aplikacji.
//QueryClientProvider umożliwia korzystanie z queryClient w całej aplikacji.
import ToDoListScreen from './src/screens/ToDoListScreen';

const queryClient = new QueryClient(); 

export default function App() {
  if (!queryClient) {
    throw new Error('QueryClient not initialized');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToDoListScreen />
    </QueryClientProvider>
  );
}
