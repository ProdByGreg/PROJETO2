import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themas.Colors.gg} />
        <Text style={styles.loadingText}>Carregando seu perfil...</Text>
      </View>
    );
  }

  if (!usuario || !preferencias) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Perfil Incompleto</Text>
        <Text style={styles.emptyText}>Você ainda não completou seu perfil.</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')} 
          style={styles.primaryButton}
        >
          <Text style={styles.buttonText}>RESPONDER AGORA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <View style={styles.profileHeader}>
          <View style={styles.profileCard}>
            <Text style={styles.profileName}>{usuario.nome}</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{usuario.email}</Text>
            </View>
            {usuario.telefone && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Telefone:</Text>
                <Text style={styles.detailValue}>{usuario.telefone}</Text>
              </View>
            )}
            {usuario.cpf && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>CPF:</Text>
                <Text style={styles.detailValue}>{usuario.cpf}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Seção de Preferências */}
        <Text style={styles.sectionTitle}>SUAS PREFERÊNCIAS</Text>
        
        <View style={styles.preferencesContainer}>
          {Object.entries(preferencias).map(([chave, valor]) => {
            if (chave.toLowerCase() === 'id' || chave.toLowerCase() === 'userid' || chave === 'estiloFinal') return null;

            const rotulo = campoRotulos[chave] || chave;
            const valorFormatado = Array.isArray(valor) ? valor.join(', ') : String(valor);

            return (
              <View key={chave} style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>{rotulo}</Text>
                <Text style={styles.preferenceValue}>{valorFormatado}</Text>
              </View>
            );
          })}
        </View>

        {/* Seção de Estilo Final */}
        <Text style={styles.sectionTitle}>SEU ESTILO</Text>
        <View style={styles.styleContainer}>
          <Text style={styles.styleText}>
            {preferencias.estiloFinal || 'Estilo ainda não definido'}
          </Text>
        </View>

        {/* Rodapé com Ações */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.secondaryButton}
          >
            <Text style={styles.buttonText}>VOLTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EstiloUsuario')}
            style={styles.primaryButton}
          >
            <Text style={styles.buttonText}>VER ESTILO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.secondaryButton}
          >
            <Text style={styles.buttonText}>REFAZER TESTE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    height: Dimensions.get('window').height / 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  profileName: {
    color: themas.Colors.gg,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#fff',
    fontWeight: '600',
    width: 80,
  },
  detailValue: {
    color: '#fff',
    flex: 1,
  },
  sectionTitle: {
    color: themas.Colors.gg,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  preferencesContainer: {
    paddingHorizontal: 20,
  },
  preferenceItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferenceLabel: {
    color: themas.Colors.gg,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  preferenceValue: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
  },
  styleContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  styleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: themas.Colors.gg,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default Perfil;