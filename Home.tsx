// src/pages/home/Home.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Container Horizontal para Box Left e Box Right */}
      <View style={styles.horizontalContainer}>
        {/* Box Left */}
        <View style={styles.boxLeft}>
          <Text>Box Left</Text>
        </View>

        {/* Caixa Central (Top, Mid e Bottom) */}
        <View style={styles.centerContainer}>
          {/* Box Top */}
          <View style={styles.boxTop}>
            <Text>Box Top</Text>
          </View>

          {/* Box Mid */}
          <View style={styles.boxMid}>
            <Text>Box Mid</Text>
          </View>

          {/* Box Bottom */}
          <View style={styles.boxBottom}>
            <Text>Box Bottom</Text>
          </View>
        </View>

        {/* Box Right */}
        <View style={styles.boxRight}>
          <Text>Box Right</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza as caixas verticalmente
    alignItems: 'center',     // Centraliza as caixas horizontalmente
  },
  horizontalContainer: {
    flexDirection: 'row',     // Organiza as caixas em linha (horizontal)
    width: '100%',            // Toda a largura da tela
    height: '100%',           // Toda a altura da tela
  },
  boxLeft: {
    height: '100%',           // Box Left ocupa 100% da altura
    width: '15%',             // Box Left ocupa 15% da largura
    backgroundColor: '#D4F1F4', // Cor de fundo da Box Left
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: '70%',             // Caixa central ocupa 70% da largura
    justifyContent: 'flex-start', // Organiza as caixas dentro da caixa central de forma vertical
    alignItems: 'center',      // Alinha as caixas no centro horizontalmente
  },
  boxTop: {
    height: '15%',  
    width: '100%',           // Box Top ocupa 33% da altura da caixa central
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDDC1', // Cor de fundo da Box Top
    marginBottom: 10,
  },
  boxMid: {
    height: '50%',             // Box Mid ocupa 34% da altura da caixa central
    width: '70%', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',  // Cor de fundo da Box Mid
    marginTop: 80,
  },
  boxBottom: {
    height: '10%',             // Box Bottom ocupa 33% da altura da caixa central
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8F8D8', // Cor de fundo da Box Bottom
    marginTop: 132,
  },
  boxRight: {
    height: '100%',            // Box Right ocupa 100% da altura
    width: '15%',              // Box Right ocupa 15% da largura
    backgroundColor: '#FFEB3B', // Cor de fundo da Box Right
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
