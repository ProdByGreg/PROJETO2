import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, } from 'react-native';
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
  
    if (todasRespostas.includes('CONFORTÁVEL') || todasRespostas.includes('PRÁTICO') || todasRespostas.includes('SALTO ALTO') || todasRespostas.includes('LOOKS DESPOJADOS')) {
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
  
    if (todasRespostas.includes('SENSUAL') || todasRespostas.includes('VALORIZAM O CORPO') || todasRespostas.includes('ESPORTIVO') || todasRespostas.includes('LOOKS SENSUAIS')) {
      return 'Estilo Esportivo';
    }
  
    if (todasRespostas.includes('IMPACTANTE') || todasRespostas.includes('URBANO') || todasRespostas.includes('JEANS DESTROYED') || todasRespostas.includes('CASACOS VOLUMOSOS')) {
      return 'Estilo Streetwear';
    }
  
    if (todasRespostas.includes('CRIATIVO') || todasRespostas.includes('INOVADOR') || todasRespostas.includes('EXÓTICO') || todasRespostas.includes('ESTAMPAS EXAGERADAS') || todasRespostas.includes('MISTURA DE ESTAMPAS')) {
      return 'Estilo Criativo';
    }
  
    return 'Estilo Indefinido';
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.boxTop}></View>
      <View style={styles.boxMid}>
        {estilo ? (
          <>
            <Text style={styles.title}>Seu estilo é:</Text>
            <Text style={styles.estilo}>{estilo}</Text>
            <TouchableOpacity style={styles.seeButton} onPress={() => navigation.navigate('Perfil')}>
              <Text style={styles.buttonText}>VER PERFIL</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.title}>Estilo a definir...</Text>
        )}
      </View>

      <View style={styles.boxMid2}></View>
      <View style={styles.boxBottom}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: Dimensions.get('window').height / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  estilo: {
    fontSize: 32,
    color: themas.Colors.gg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  seeButton: {
    width: 550,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.gg,
    borderRadius: 5,
    borderColor: 'rgba(200, 200, 200, 0.5)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3.65,
    elevation: 7,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
    boxTop: {
      height: Dimensions.get('window').height / 6,
      width: 1200,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingHorizontal: 37,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: 30,
      marginTop: 1000,
      borderWidth: 1,
      borderColor: 'rgba(200, 200, 200, 0.5)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3.65,
      elevation: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    boxMid: {
      height: Dimensions.get('window').height / 2.2,
      width: 1200,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      paddingHorizontal: 37,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: 50,
      marginTop: 10,
      borderWidth: 1,
      borderColor: 'rgba(200, 200, 200, 0.5)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3.65,
      elevation: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  
    boxMid2: {
      height: Dimensions.get('window').height / 1.3,
      width: 1200,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      paddingHorizontal: 37,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: 50,
      marginTop: 10,
      borderWidth: 1,
      borderColor: 'rgba(200, 200, 200, 0.5)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3.65,
      elevation: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  
    boxBottom: {
      height: Dimensions.get('window').height / 4,
      width: 1200,
      paddingHorizontal: 37,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: 100,
      marginTop: 10,
      borderWidth: 1,
      borderColor: 'rgba(200, 200, 200, 0.5)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3.65,
      elevation: 7,
      justifyContent: 'center',
    },
    boxBottom2: {
      height: Dimensions.get('window').height / 0.8,
      width: 1200,
      paddingHorizontal: 37,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: 100,
      marginTop: 10,
      borderWidth: 1,
      borderColor: 'rgba(200, 200, 200, 0.5)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3.65,
      elevation: 7,
      justifyContent: 'center',
    },
});

export default EstiloUsuario;
