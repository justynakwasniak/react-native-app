import 'react-native-get-random-values';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';


import AboutScreen from './src/screens/AboutScreen';
import ToDoListScreen from './src/screens/ToDoListScreen';
import LoginScreen from './src/screens/LogScreen';
import ProfileScreen from './src/screens/UserProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ImageGridScreen from './src/screens/ImageGridScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';


const queryClient = new QueryClient();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeIcon = () => (
  <Image
    source={require('./src/assets/home.png')}
    style={styles.icon}
    resizeMode="contain"
  />
);

const SearchIcon = () => (
  <Image
    source={require('./src/assets/search.png')}
    style={styles.icon}
    resizeMode="contain"
  />
);

const ProfileIcon = () => (
  <Image
    source={require('./src/assets/user.png')}
    style={styles.icon}
    resizeMode="contain"
  />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="Home"
        component={AboutScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: SearchIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
          <Stack.Screen name="ToDoList" component={ToDoListScreen} />
          <Stack.Screen name="Log" component={LoginScreen} />
          <Stack.Screen name="UserProfile" component={ProfileScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="ImageGridScreen" component={ImageGridScreen} />
<Stack.Screen name="Onboarding" component={OnboardingScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
