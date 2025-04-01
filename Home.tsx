import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const logo = require('./src/assets/DripOrDrown.jpg');

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="menu" size={32} color="gray" />
      </TouchableOpacity>

      <View style={styles.boxTop}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.text}>DripOrDrown!</Text>
      </View>

      <View style={styles.boxMid}>
      </View>

      <View style={styles.boxBottom}>
        <Text style={styles.text}>© 2025 DripOrDrown</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  boxTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
  },
  boxMid: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  boxBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },

});

export default Home;
