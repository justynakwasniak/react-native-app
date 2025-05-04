import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const dummyData = [
  'React Native',
  'Zustand',
  'React Query',
  'Expo',
  'TypeScript',
  'Tailwind CSS',
  'Navigation',
  'AsyncStorage',
  'Firebase',
];

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (text: string) => {
    setQuery(text);
    const results = dummyData.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem}>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    color: 'black',
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 16,
  },
});

export default SearchScreen;




