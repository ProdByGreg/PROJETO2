import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";
import { useNavigation } from '@react-navigation/native'; // ✅ Importação adicionada

const EstiloUsuario = () => {
  const [estilo, setEstilo] = useState<string | null>(null);
  const navigation = useNavigation(); // ✅ Hook de navegação

  useEffect(() => {
    buscarPreferencias();
  }, []);

  const buscarPreferencias = async () => {
    try {
      const UserIdString = await AsyncStorage.getItem('userid');
      console.log('🔵 UserId encontrado no AsyncStorage:', UserIdString);

      if (!UserIdString) {
        console.warn('⚠️ Nenhum UserId encontrado no AsyncStorage.');
        return;
      }

      const UserId = parseInt(UserIdString, 10);
      const API_URL = process.env.API_URL || 'http://localhost:5009';
      const endpoint = `${API_URL}/api/Preferencias/${UserId}`;
      console.log('🔵 Fazendo requisição para:', endpoint);

      const response = await axios.get(endpoint);
      console.log('🟢 Resposta da API recebida:', response.data);

      if (response.status === 200) {
        const preferencias = response.data;
        const estiloCalculado = definirEstilo(preferencias);
        console.log('🟢 Estilo calculado:', estiloCalculado);
        setEstilo(estiloCalculado);
      }
    } catch (error) {
      console.error('🔴 Erro ao buscar preferências:', error);
    }
  };

  const definirEstilo = (preferencias: any) => {
    const {
      coresPreferidas = '',
      estiloRoupa = '',
      identidadeVisual = '',
      personalidade = ''
    } = preferencias;

    const cores = coresPreferidas.toUpperCase();
    const estiloRoupaFormatado = estiloRoupa.toUpperCase();
    const identidade = identidadeVisual.toUpperCase();
    const personalidadeAjustada = personalidade.toUpperCase();

    console.log('🔵 Dados normalizados:', { cores, estiloRoupaFormatado, identidade, personalidadeAjustada });

    if (cores.includes('NEUTRAS (PRETO, BRANCO, CINZA)') &&
        estiloRoupaFormatado.includes('CONFORTÁVEIS, SOLTAS, PRÁTICAS') &&
        personalidadeAjustada.includes('INFORMAL, ESPONTÂNEA, ALEGRE')) {
      return 'Básico';
    }

    if (identidade.includes('FORMAL') || estiloRoupaFormatado.includes('ROUPAS DISCRETAS') || personalidadeAjustada.includes('CONSERVADORA')) {
      return 'Formal / Clássico';
    }

    if (identidade.includes('DELICADO') || estiloRoupaFormatado.includes('ROUPAS DELICADAS') || personalidadeAjustada.includes('FEMININA')) {
      return 'Romântico';
    }

    if (identidade.includes('SENSUAL') || estiloRoupaFormatado.includes('LOOKS AJUSTADOS') || personalidadeAjustada.includes('GLAMOROSA')) {
      return 'Sensual';
    }

    if (identidade.includes('CLÁSSICO SOFISTICADO') || estiloRoupaFormatado.includes('PEÇAS REFINADAS') || personalidadeAjustada.includes('SOFISTICADA')) {
      return 'Sofisticado';
    }

    if (identidade.includes('DIFERENTE') || estiloRoupaFormatado.includes('FORMAS E PEÇAS MARCANTES') || personalidadeAjustada.includes('EXÓTICA')) {
      return 'Criativo';
    }

    if (identidade.includes('URBANO') || estiloRoupaFormatado.includes('JEANS DESTROYED') || personalidadeAjustada.includes('INOVADORA')) {
      return 'Streetwear / Urbano';
    }

    return 'Estilo indefinido';
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
