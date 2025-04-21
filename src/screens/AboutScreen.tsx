import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AboutScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOME</Text>
      <Text style={styles.text}>
        This is a simple mobile application built with React Native, React Query, Type Script and Zustand.
      </Text>
      <Button
        title="Go to To-Do List"
        onPress={() => navigation.navigate('ToDoList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',

  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AboutScreen;
