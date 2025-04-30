import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
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
  const [preferenciasSalvas, setPreferenciasSalvas] = useState(false);

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
      if (!UserId) return Alert.alert('Erro', 'Usuário não identificado.');

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

      const API_URL = process.env.API_URL || 'http://localhost:5009';
      const response = await axios.post(`${API_URL}/api/Preferencias`, preferenciasFormatadas);

      if (response.status === 200 || response.status === 201) {
        setPreferenciasSalvas(true);
      } else {
        Alert.alert('Erro', 'Não foi possível salvar suas preferências.');
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar suas preferências.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Perfil')}>
            <MaterialIcons name="menu" size={28} color="gray" />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Selecione suas Preferências:</Text>
        </View>

        <View style={styles.boxMid}>
          {preferenciasSalvas ? (
            <>
              <Text style={styles.sucesso}>PREFERÊNCIAS SALVAS COM SUCESSO!</Text>
              <TouchableOpacity style={styles.seeButton} onPress={() => navigation.navigate('EstiloUsuario')}>
                <Text style={styles.buttonText}>VER RESULTADO</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.pergunta}>{perguntas[passo].pergunta}</Text>
              <View style={styles.opcoesContainer}>
                {perguntas[passo].opcoes?.map((opcao, index) => (
                  <TouchableOpacity key={index} style={styles.opcaoButton} onPress={() => responder(opcao)}>
                    <Text style={styles.opcaoText}>{opcao}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.botoesContainer}>
                {!preferenciasSalvas && passo === perguntas.length - 1 && (
                  <TouchableOpacity style={styles.button} onPress={salvarPreferencias}>
                    <Text style={styles.buttonText}>CONFIRMAR</Text>
                  </TouchableOpacity>
                )}

                {passo > 0 && !preferenciasSalvas && (
                  <TouchableOpacity style={styles.buttonBack} onPress={() => setPasso(passo - 1)}>
                    <Text style={styles.buttonText}>VOLTAR</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>

        <View style={styles.boxBottom}>
          <Text style={styles.footerText}>© 2025 DripOrDrown</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: Dimensions.get('window').height / 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.gg,
  },
  boxTop: {
    height: 300,
    width: '100%',
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 600,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10
  },
  boxMid: {
    height: 1000,
    width: '100%',
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 37,
  },
  pergunta: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'center'
  },
  opcoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20
  },
  opcaoButton: {
    backgroundColor: themas.Colors.test,
    borderRadius: 12,
    padding: 12,
    width: '80%',
    marginTop: 10,
  },
  opcaoText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  botoesContainer: {
    marginTop: 50,
    alignItems: 'center',
    gap: 20
  },
  button: {
    backgroundColor: themas.Colors.gg,
    borderRadius: 12,
    padding: 12,
    width: '80%',
    marginTop: 10,
  },
  buttonBack: {
    backgroundColor: 'red',
    borderRadius: 12,
    padding: 12,
    width: '80%'
  },
  seeButton: {
    backgroundColor: themas.Colors.gg,
    borderRadius: 12,
    padding: 12,
    width: '80%',
    marginTop: 100,
    marginLeft: 170,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  boxBottom: {
    height: 80,
    width: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16
  },
  sucesso: {
    color: '#00ff99',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50
  }
});

export default Home;
