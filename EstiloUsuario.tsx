import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";

const EstiloUsuario = () => {
  const [estilo, setEstilo] = useState<string | null>(null);

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

      const UserId = parseInt(UserIdString, 10); // Converte para inteiro
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
      coresPreferidas = '', // Corrigido o nome do campo
      estiloRoupa = '', // Corrigido o nome do campo
      identidadeVisual = '', // Corrigido o nome do campo
      personalidade = ''
    } = preferencias;

    // Transforma tudo em maiúsculo
    const cores = coresPreferidas.toUpperCase();
    const estiloRoupaFormatado = estiloRoupa.toUpperCase();
    const identidade = identidadeVisual.toUpperCase();
    const personalidadeAjustada = personalidade.toUpperCase();

    console.log('🔵 Dados normalizados:', { cores, estiloRoupaFormatado, identidade, personalidadeAjustada });

    if (cores.includes('NEUTRAS (PRETO, BRANCO, CINZA)') && estiloRoupaFormatado.includes('CONFORTÁVEIS, SOLTAS, PRÁTICAS') && personalidadeAjustada.includes('INFORMAL, ESPONTÂNEA, ALEGRE')) {
      console.log('✅ Estilo detectado: Básico');
      return 'Básico';
    }

    if (identidade.includes('FORMAL') || estiloRoupaFormatado.includes('ROUPAS DISCRETAS') || personalidadeAjustada.includes('CONSERVADORA')) {
      console.log('✅ Estilo detectado: Formal / Clássico');
      return 'Formal / Clássico';
    }

    if (identidade.includes('DELICADO') || estiloRoupaFormatado.includes('ROUPAS DELICADAS') || personalidadeAjustada.includes('FEMININA')) {
      console.log('✅ Estilo detectado: Romântico');
      return 'Romântico';
    }

    if (identidade.includes('SENSUAL') || estiloRoupaFormatado.includes('LOOKS AJUSTADOS') || personalidadeAjustada.includes('GLAMOROSA')) {
      console.log('✅ Estilo detectado: Sensual');
      return 'Sensual';
    }

    if (identidade.includes('CLÁSSICO SOFISTICADO') || estiloRoupaFormatado.includes('PEÇAS REFINADAS') || personalidadeAjustada.includes('SOFISTICADA')) {
      console.log('✅ Estilo detectado: Sofisticado');
      return 'Sofisticado';
    }

    if (identidade.includes('DIFERENTE') || estiloRoupaFormatado.includes('FORMAS E PEÇAS MARCANTES') || personalidadeAjustada.includes('EXÓTICA')) {
      console.log('✅ Estilo detectado: Criativo');
      return 'Criativo';
    }

    if (identidade.includes('URBANO') || estiloRoupaFormatado.includes('JEANS DESTROYED') || personalidadeAjustada.includes('INOVADORA')) {
      console.log('✅ Estilo detectado: Streetwear / Urbano');
      return 'Streetwear / Urbano';
    }

    console.warn('⚠️ Nenhum estilo correspondido. Estilo indefinido.');
    return 'Estilo indefinido';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {estilo ? (
          <>
            <Text style={styles.title}>Seu estilo é:</Text>
            <Text style={styles.estilo}>{estilo}</Text>
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
  }
});

export default EstiloUsuario;
