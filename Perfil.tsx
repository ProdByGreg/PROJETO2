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
        if (!idSalvo) {
          setLoading(false);
          return;
        }

        const usuarioUrl = `http://localhost:5009/api/Preferencias/perfil/${idSalvo}`;
        const usuarioResponse = await axios.get(usuarioUrl);
        setUsuario(usuarioResponse.data);

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
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  if (!usuario || !preferencias) {
    return (
      <View style={styles.center}>
        <Text style={styles.alertText}>Você ainda não completou seu perfil.</Text>
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
          <Text style={styles.name}>{usuario.nome}</Text>
          <Text style={styles.detail}>{usuario.email}</Text>
          <Text style={styles.detail}>{usuario.telefone}</Text>
          <Text style={styles.detail}>{usuario.cpf}</Text>
        </View>

        <Text style={styles.sectionTitle}>Preferências</Text>
        <View style={styles.grid}>
          {Object.entries(preferencias).map(([chave, valor]) => {
            if (chave.toLowerCase() === 'id' || chave.toLowerCase() === 'userid' || chave === 'estiloFinal') return null;

            const rotulo = campoRotulos[chave] || chave;
            const valorFormatado = Array.isArray(valor) ? valor.join(', ') : String(valor);

            return (
              <View key={chave} style={styles.preferenceCard}>
                <Text style={styles.cardTitle}>{rotulo}</Text>
                <Text style={styles.cardContent}>{valorFormatado}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle2}>Estilo Final</Text>
        <View style={styles.finalBox}>
          <Text style={styles.finalText}>
            {preferencias.estiloFinal || 'Estilo não definido'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
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
    height: Dimensions.get('window').height / 2,
  },
  container: {
    alignItems: 'center',
  },
  boxTop: {
    height: Dimensions.get('window').height / 6,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 37,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 30,
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 30,
  },
  name: {
    color: themas.Colors.gg,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 3,
  },
  sectionTitle: {
    color: themas.Colors.gg,
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  sectionTitle2: {
    color: themas.Colors.gg,
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 300,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },






  preferenceCard: {
    height: '40%',
    width: '30%',
    paddingHorizontal: 37,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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





  
  cardTitle: {
    color: themas.Colors.gg,
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cardContent: {
    color: '#fff',
    fontSize: 15,
    
  },
  finalBox: {
    height: '8%',
    width: '100%',
    paddingHorizontal: 37,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  finalText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: themas.Colors.gg,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  alertText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Perfil;
