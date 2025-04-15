import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Perfil = () => {
  const [preferencias, setPreferencias] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarPreferencias = async () => {
      try {
        // Alterado para 'userId' em vez de 'userid'
        const idSalvo = await AsyncStorage.getItem('userId');
        if (!idSalvo) {
          setLoading(false);
          return;
        }

        console.log('ID do usuário:', idSalvo); // Log para verificar se o ID está correto

        const response = await axios.get(`http://localhost:5009/api/Preferencias/${idSalvo}`);
        if (response.data) {
          setPreferencias(response.data);
        } else {
          console.warn('Não encontrou preferências para o usuário:', idSalvo);
        }
      } catch (error) {
        console.warn('Erro ao buscar preferências:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPreferencias();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!preferencias) {
    return (
      <View style={styles.center}>
        <Text style={styles.alertText}>VOCÊ NÃO RESPONDEU O FORMULÁRIO</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>CLIQUE AQUI</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Preferências</Text>
      {Object.entries(preferencias).map(([chave, valor]) => (
        <Text key={chave} style={styles.info}>
          {`${chave.replace(/([A-Z])/g, ' $1')}: ${valor}`}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
  },
  alertText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Perfil;
