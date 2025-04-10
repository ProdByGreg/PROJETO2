import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";

const logo = require('./src/assets/DripOrDrown.jpg');

const perguntas = [
  { id: 1, pergunta: 'DEFINA SEU GÊNERO:', opcoes: ['MASCULINO', 'FEMININO', 'PREFIRO NÃO DIZER.'] },
  { id: 2, pergunta: 'QUAL O SEU TAMANHO DE ROUPA?', opcoes: ['PP', 'P', 'M', 'G', 'GG', 'XG'] },
  { id: 3, pergunta: 'QUAIS CORES DE ROUPAS VOCÊ PREFERE?', opcoes: ['NEUTRAS (PRETO, BRANCO, CINZA)', 'CORES VIVAS', 'PASTÉIS', 'TONS TERROSOS', 'COLORIDO E VIBRANTE'] },
  { id: 4, pergunta: 'DESCREVA SUA PERSONALIDADE', opcoes: ['INFORMAL, ESPONTÂNEA, ALEGRE', 'CONSERVADORA, SÉRIA, ORGANIZADA', 'EXIGENTE, REFINADA, BEM-SUCEDIDA', 'FEMININA, MEIGA, DELICADA', 'GLAMOROSA, EXCITANTE, SENSUAL', 'SOFISTICADA, MODERNA, FIRME', 'EXÓTICA, AVENTUREIRA, INOVADORA'] },
  { id: 5, pergunta: 'QUAL O SEU TIPO DE ROUPA FAVORITA?', opcoes: ['CONFORTÁVEIS, SOLTAS, PRÁTICAS', 'ROUPAS DISCRETAS, CLÁSSICAS', 'PEÇAS REFINADAS, SEM MODISMOS', 'ROUPAS DELICADAS, CORES SUAVES', 'LOOKS AJUSTADOS QUE VALORIZAM O CORPO', 'PEÇAS ESTRUTURADAS, MODERNAS', 'FORMAS E PEÇAS MARCANTES'] },
  { id: 6, pergunta: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?', opcoes: ['BÁSICO CONFORTÁVEL E PRÁTICO', 'FORMAL TRADICIONAL E ATEMPORAL', 'CLÁSSICO SOFISTICADO E ATUAL', 'DELICADO FEMININO E ROMÂNTICO', 'SENSUAL E PROVOCANTE', 'URBANO E IMPACTANTE', 'DIFERENTE E CRIATIVO'] },
  { id: 7, pergunta: 'QUAIS DETALHES VOCÊ MAIS GOSTA?', opcoes: ['LOOKS SEM DETALHES', 'DETALHES BEM DISCRETOS', 'DETALHES SOFISTICADOS', 'DETALHES DELICADOS', 'DETALHES QUE VALORIZAM O CORPO', 'DETALHES MARCANTES', 'DETALHES DIFERENTES DO CONVENCIONAL'] },
  { id: 8, pergunta: 'QUAIS ESTAMPAS TÊM MAIS A SUA CARA?', opcoes: ['LISTRAS E XADREZ', 'RISCA DE GIZ', 'ESTAMPAS ABSTRATAS', 'FLORAIS E DELICADAS', 'ANIMAL PRINT', 'ESTAMPAS EXAGERADAS', 'MISTURA DE ESTAMPAS'] },
  { id: 9, pergunta: 'QUAL SEU SAPATO FAVORITO?', opcoes: ['CONFORTÁVEL', 'CLÁSSICO', 'SOFISTICADO', 'SALTO ALTO E FINO', 'FEMININO', 'DESIGN MODERNO', 'DIFERENTE E VINTAGE'] },
  { id: 10, pergunta: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?', opcoes: ['ESPORTIVOS E SIMPLES', 'CLÁSSICOS E DISCRETOS', 'REFINADOS', 'DELICADOS E FEMININOS', 'GRANDES E BRILHANTES', 'DESIGN ARROJADO', 'DIVERTIDOS E RÚSTICOS'] },
  { id: 11, pergunta: 'QUAL GRUPO DE PEÇAS VOCÊ MAIS GOSTA?', opcoes: ['JEANS E CAMISETA', 'SAIAS E SCARPINS CLÁSSICOS', 'PEÇAS DE ALFAIATARIA', 'VESTIDO FLUIDO', 'LOOKS SENSUAIS', 'JEANS DESTROYED E CASACOS VOLUMOSOS', 'SEM PEÇAS CHAVES EXCLUSIVAS'] }
];

const Home = () => {
  const navigation = useNavigation();
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  const responder = (resposta: string) => {
    const perguntaAtual = perguntas[passo].pergunta;
    setRespostas((prev) => ({ ...prev, [perguntaAtual]: resposta }));

    if (passo < perguntas.length - 1) {
      setPasso(passo + 1);
    }
  };






const salvarPreferencias = async () => {
  try {
    const UserId = await AsyncStorage.getItem('userid');
    console.log('UserId:', UserId);

    if (!UserId) {
      Alert.alert('Erro', 'Usuário não identificado.');
      return;
    }

    const preferenciasFormatadas = {
      UserId,
      Genero: respostas['DEFINA SEU GÊNERO:'],
      TamanhoDaRoupa: respostas['QUAL O SEU TAMANHO DE ROUPA?'],
      CoresPreferidas: respostas['QUAIS CORES DE ROUPAS VOCÊ PREFERE?'],
      Personalidade: respostas['DESCREVA SUA PERSONALIDADE'],
      EstiloRoupa: respostas['QUAL O SEU TIPO DE ROUPA FAVORITA?'],
      IdentidadeVisual: respostas['QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?'],
      DetalhesFavoritos: respostas['QUAIS DETALHES VOCÊ MAIS GOSTA?'],
      EstampasFavoritas: respostas['QUAIS ESTAMPAS TÊM MAIS A SUA CARA?'],
      SapatosFavoritos: respostas['QUAL SEU SAPATO FAVORITO?'],
      AcessoriosFavoritos: respostas['QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?'],
      PecasFavoritas: respostas['QUAL GRUPO DE PEÇAS VOCÊ MAIS GOSTA?']
    };

    console.log('Preferências formatadas:', preferenciasFormatadas);

    const API_URL = process.env.API_URL || 'http://localhost:5009';
    const endpoint = `${API_URL}/api/Preferencias`;
    console.log('Enviando POST para:', endpoint);

    const response = await axios.post(endpoint, preferenciasFormatadas);

    console.log('Resposta do servidor:', response.data);

    Alert.alert('Sucesso', 'Suas preferências foram salvas com sucesso!');
  } catch (error: any) {
    console.error('Erro ao salvar preferências:', error);

    if (error.response) {
      console.error('Resposta do servidor com erro:', error.response.data);
      Alert.alert('Erro do servidor', JSON.stringify(error.response.data));
    } else if (error.request) {
      console.error('Nenhuma resposta recebida do servidor:', error.request);
      Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
    } else {
      console.error('Erro ao configurar a requisição:', error.message);
      Alert.alert('Erro', error.message);
    }
  }
};










  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="menu" size={32} color="gray" />
      </TouchableOpacity>

      <View style={styles.boxTop}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.boxMid}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.text}>{perguntas[passo].pergunta}</Text>

          <View style={styles.opcoesContainer}>
            {perguntas[passo].opcoes?.map((opcao, index) => (
              <TouchableOpacity key={index} style={styles.opcaoButton} onPress={() => responder(opcao)}>
                <Text style={styles.textButton}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.botoesContainer}>
            {passo === perguntas.length - 1 && (
              <TouchableOpacity style={styles.button} onPress={salvarPreferencias}>
                <Text style={styles.textButton}>CONFIRMAR</Text>
              </TouchableOpacity>
            )}

            {passo > 0 && (
              <TouchableOpacity style={styles.buttonBack} onPress={() => setPasso(passo - 1)}>
                <Text style={styles.textButton}>VOLTAR</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.boxBottom}>
        <Text style={styles.text2}>© 2025 DripOrDrown</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10
  },
  boxTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50
  },
  boxMid: {
    flex: 6,
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 20
  },
  boxBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 120
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  opcoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  opcaoButton: {
    width: '25%',
    minHeight: 40,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingHorizontal: 8,
  },
  botoesContainer: {
    alignItems: 'center',
    gap: 10
  },
  button: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.gg,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  buttonBack: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
});

export default Home;
