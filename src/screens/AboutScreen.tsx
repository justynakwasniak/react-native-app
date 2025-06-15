import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AboutScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HELLO</Text>
      <Text style={styles.text}>
        This is a simple mobile application built with React Native, React Query, TypeScript, and Zustand.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to To-Do List"
          onPress={() => navigation.navigate('ToDoList')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Log In"
          onPress={() => navigation.navigate('Log')}
        />
      </View>
      <View style ={styles.buttonContainer}>
      <Button
  title="Go to Image Grid"
  onPress={() => navigation.navigate('ImageGridScreen')}
/>
        </View>
        <View style={styles.buttonContainer}> <Button
  title="Go to Carousel"
  onPress={() => navigation.navigate('Onboarding')}
/> </View>


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
  buttonContainer: {
    marginVertical: 10,
    width: '50%',
  },
});

export default AboutScreen;
