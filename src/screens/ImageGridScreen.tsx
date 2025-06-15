import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Text } from 'react-native';

const imageData = [
  { id: '1', uri: 'https://picsum.photos/seed/1/300/300' },
  { id: '2', uri: 'https://picsum.photos/seed/2/300/300' },
  { id: '3', uri: 'https://picsum.photos/seed/3/300/300' },
  { id: '4', uri: 'https://picsum.photos/seed/4/300/300' },
  { id: '5', uri: 'https://picsum.photos/seed/5/300/300' },
  { id: '6', uri: 'https://picsum.photos/seed/6/300/300' },
  { id: '7', uri: 'https://picsum.photos/seed/1/300/300' },
  { id: '8', uri: 'https://picsum.photos/seed/2/300/300' },
  { id: '9', uri: 'https://picsum.photos/seed/3/300/300' },
  { id: '10', uri: 'https://picsum.photos/seed/4/300/300' },
  { id: '11', uri: 'https://picsum.photos/seed/5/300/300' },
  { id: '12', uri: 'https://picsum.photos/seed/6/300/300' },
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns - 20;

const ImageGridScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.caption}>Image {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageWrapper: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  caption: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default ImageGridScreen;
