import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";
import { useNavigation } from '@react-navigation/native';

interface Preferencias {
  coresPreferidas?: string;
  estiloRoupa?: string;
  identidadeVisual?: string;
  personalidade?: string;
}

const EstiloUsuario = () => {
  const [estilo, setEstilo] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    carregarEstiloUsuario();
  }, []);

  const carregarEstiloUsuario = async () => {
    try {
      const userId = await obterUserIdAsyncStorage();
      if (!userId) return;

      const preferencias = await buscarPreferenciasUsuario(userId);
      if (preferencias) {
        const estiloCalculado = calcularEstilo(preferencias);
        setEstilo(estiloCalculado);
      }
    } catch (error) {
      console.error('🔴 Erro ao carregar estilo do usuário:', error);
    }
  };

  const obterUserIdAsyncStorage = async (): Promise<number | null> => {
    const userIdString = await AsyncStorage.getItem('userid');
    console.log('🔵 UserId encontrado no AsyncStorage:', userIdString);

    if (!userIdString) {
      console.warn('⚠️ Nenhum UserId encontrado no AsyncStorage.');
      return null;
    }

    return parseInt(userIdString, 10);
  };

  const buscarPreferenciasUsuario = async (userId: number): Promise<Preferencias | null> => {
    const API_URL = process.env.API_URL || 'http://localhost:5009';
    const endpoint = `${API_URL}/api/Preferencias/${userId}`;
    console.log('🔵 Fazendo requisição para:', endpoint);

    try {
      const response = await axios.get(endpoint);
      console.log('🟢 Resposta da API recebida:', response.data);

      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error('🔴 Erro ao buscar preferências:', error);
      return null;
    }
  };

  const calcularEstilo = (preferencias: Preferencias): string => {
    const {
      coresPreferidas = '',
      estiloRoupa = '',
      identidadeVisual = '',
      personalidade = ''
    } = preferencias;
  
    const todasRespostas = (
      coresPreferidas + ' ' +
      estiloRoupa + ' ' +
      identidadeVisual + ' ' +
      personalidade
    ).toUpperCase();
  
    console.log('🔵 Todas as respostas combinadas:', todasRespostas);
  
    if (todasRespostas.includes('CONFORTÁVEL') || todasRespostas.includes('PRÁTICO') || todasRespostas.includes('ESPORTIVO')) {
      return 'Estilo Casual';
    }
  
    if (todasRespostas.includes('CLÁSSICO') || todasRespostas.includes('TRADICIONAL') || todasRespostas.includes('DISCRETO') || todasRespostas.includes('ALFAIATARIA')) {
      return 'Estilo Clássico';
    }
  
    if (todasRespostas.includes('SOFISTICADO') || todasRespostas.includes('REFINADO') || todasRespostas.includes('MODERNO') || todasRespostas.includes('ESTRUTURADO')) {
      return 'Estilo Sofisticado';
    }
  
    if (todasRespostas.includes('DELICADO') || todasRespostas.includes('FEMININO') || todasRespostas.includes('ROMÂNTICO') || todasRespostas.includes('FLORAIS')) {
      return 'Estilo Romântico';
    }
  
    if (todasRespostas.includes('SENSUAL') || todasRespostas.includes('VALORIZAM O CORPO') || todasRespostas.includes('SALTO ALTO') || todasRespostas.includes('LOOKS SENSUAIS')) {
      return 'Estilo Sexy';
    }
  
    if (todasRespostas.includes('IMPACTANTE') || todasRespostas.includes('URBANO') || todasRespostas.includes('JEANS DESTROYED') || todasRespostas.includes('CASACOS VOLUMOSOS')) {
      return 'Estilo Urbano';
    }
  
    if (todasRespostas.includes('CRIATIVO') || todasRespostas.includes('INOVADOR') || todasRespostas.includes('EXÓTICO') || todasRespostas.includes('ESTAMPAS EXAGERADAS') || todasRespostas.includes('MISTURA DE ESTAMPAS')) {
      return 'Estilo Criativo';
    }
  
    return 'Estilo Indefinido';
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {estilo ? (
          <>
            <Text style={styles.title}>Seu estilo é:</Text>
            <Text style={styles.estilo}>{estilo}</Text>
            <TouchableOpacity style={styles.seeButton} onPress={() => navigation.navigate('Perfil')}>
              <Text style={styles.buttonText}>VER PERFIL</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.title}>Carregando seu estilo...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: themas.Colors.gg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  estilo: {
    fontSize: 32,
    color: '#00ff99',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  seeButton: {
    backgroundColor: themas.Colors.black,
    borderRadius: 12,
    padding: 12,
    width: '80%',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default EstiloUsuario;
