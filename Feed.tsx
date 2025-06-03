import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const posts = [
  {
    id: '1',
    usuario: 'fashionista_01',
    imagem: require('./src/assets/Casual1.jpg'),
    descricao: 'Look comfy para dias frios ❄️',
    curtidas: 152,
  },
  {
    id: '2',
    usuario: 'moda_urbana',
    imagem: require('./src/assets/Casual2.jpg'),
    descricao: 'Estilo urbano com atitude 🖤',
    curtidas: 234,
  },
  {
    id: '3',
    usuario: 'chic_modern',
    imagem: require('./src/assets/Casual3.jpg'),
    descricao: 'Sofisticação com leveza',
    curtidas: 301,
  },
];

const Feed = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {posts.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="person" size={24} color="#fff" />
            <Text style={styles.username}>{item.usuario}</Text>
          </View>

          <Image source={item.imagem} style={styles.imagem} resizeMode="cover" />

          <View style={styles.footer}>
            <TouchableOpacity>
              <MaterialIcons name="favorite" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.likes}>{item.curtidas} curtidas</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    flexGrow: 1,
    height: Dimensions.get('window').height / 2,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 30,
    height: Dimensions.get('window').height / 0.7,
    width: Dimensions.get('window').width / 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.29,
    shadowRadius: 6.65,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  imagem: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  footer: {
    padding: 15,
  },
  likes: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  descricao: {
    color: '#ccc',
    marginTop: 5,
    fontSize: 14,
  },
});

export default Feed;
