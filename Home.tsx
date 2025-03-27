import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const logo = require('./src/assets/DripOrDrown.jpg');

const Home = () => {
  return (
    <View style={styles.container}>

      <View style={styles.boxTop}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.text}>DripOrDrown!</Text>
      </View>

      <View style={styles.boxMid}>
      </View>

      <View style={styles.boxBottom}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTop: {
    height: '22%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    position: 'relative',
  },
  boxMid: {
    height: '68%',
    width: '100%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxBottom: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 60,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Home;
