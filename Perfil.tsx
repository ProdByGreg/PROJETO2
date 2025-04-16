import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const campoRotulos: Record<string, string> = {
  Genero: 'Gênero',
  TamanhoDaRoupa: 'Tamanho da Roupa',
  CoresPreferidas: 'Cores Preferidas',
  Personalidade: 'Personalidade',
  EstiloRoupa: 'Tipo de Roupa Favorita',
  IdentidadeVisual: 'Visual com que se Identifica',
  DetalhesFavoritos: 'Detalhes Favoritos',
  EstampasFavoritas: 'Estampas Favoritas',
  SapatosFavoritos: 'Sapatos Favoritos',
  AcessoriosFavoritos: 'Acessórios Favoritos',
  PecasFavoritas: 'Grupo de Peças Favoritas',
};

const Perfil = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [preferencias, setPreferencias] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const idSalvo = await AsyncStorage.getItem('userid');
        console.log('[DEBUG] ID recuperado do AsyncStorage:', idSalvo);

        if (!idSalvo) {
          console.warn('[WARN] Nenhum ID encontrado no AsyncStorage');
          setLoading(false);
          return;
        }

        // Carregar dados do usuário
        const usuarioUrl = `http://localhost:5009/api/Preferencias/perfil/${idSalvo}`;

        const usuarioResponse = await axios.get(usuarioUrl);
        setUsuario(usuarioResponse.data);

        // Carregar preferências
        const preferenciasUrl = `http://localhost:5009/api/Preferencias/${idSalvo}`;
        const preferenciasResponse = await axios.get(preferenciasUrl);
        setPreferencias(preferenciasResponse.data);

      } catch (error: any) {
        console.error('[ERRO] Erro ao buscar dados:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!usuario || !preferencias) {
    return (
      <View style={styles.center}>
        <Text style={styles.alertText}>Você ainda não completou o perfil.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>Responder agora</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Exibindo dados do usuário */}
      <Text style={styles.title}>Dados do Usuário</Text>
      <View style={styles.card}>
        <Text style={styles.rotulo}>Nome</Text>
        <Text style={styles.valor}>{usuario.nome}</Text>

        <Text style={styles.rotulo}>Email</Text>
        <Text style={styles.valor}>{usuario.email}</Text>

        <Text style={styles.rotulo}>Telefone</Text>
        <Text style={styles.valor}>{usuario.telefone}</Text>

        <Text style={styles.rotulo}>CPF</Text>
        <Text style={styles.valor}>{usuario.cpf}</Text>
      </View>

      {/* Exibindo preferências */}
      <Text style={styles.title}>Suas Preferências</Text>
      {Object.entries(preferencias).map(([chave, valor]) => {
        if (chave.toLowerCase() === 'id' || chave.toLowerCase() === 'userid') return null;

        const rotulo = campoRotulos[chave] || chave;
        const valorFormatado = Array.isArray(valor) ? valor.join(', ') : String(valor);

        return (
          <View key={chave} style={styles.card}>
            <Text style={styles.rotulo}>{rotulo}</Text>
            <Text style={styles.valor}>{valorFormatado}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: 500,
  },
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 20,
  },
  center: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  card: {
    backgroundColor: '#3a3a3a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // para Android
  },
  rotulo: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  valor: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Perfil;
