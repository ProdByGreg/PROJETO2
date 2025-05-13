import React, { useEffect, useState } from 'react';
import {
  Dimensions,
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
import { themas } from "./src/global/themes";

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
      <View style={styles.container}>
        <View style={styles.boxTop}>        
        <Text style={styles.title}>Dados do Usuário</Text>

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
            <View key={chave} style={styles.boxMid}>
              <Text style={styles.rotulo}>{rotulo}</Text>
              <Text style={styles.valor}>{valorFormatado}</Text>
            </View>
          );
        })}

        <Text style={styles.title}>ESTILO FINAL</Text>
        <View style={[styles.boxMid, styles.boxBottom]}>
          <Text style={styles.valor}>{preferencias.estiloFinal || 'Estilo não definido'}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={[styles.button, { marginBottom: 30 }]}
        >
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: Dimensions.get('window').height / 6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  alertText: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },



  boxTop: {
    height: Dimensions.get('window').height / 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 37,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 30,
    marginTop: 5000,
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


  rotulo: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valor: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '500',
  },
  estiloboxMid: {
    backgroundColor: 'darkred',
  },
});

export default Perfil;
