import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholderTextColor="#888"

        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        placeholderTextColor="#888"

        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate('UserProfile')}
>
  <Text style={styles.loginButtonText}>Log In</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black'  },
  forgotPassword: {
    color: '#007BFF',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
