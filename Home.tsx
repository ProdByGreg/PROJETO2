import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";

const logo = require('./src/assets/DripOrDrown.jpg');

const perguntasBase = [
  { id: 1, pergunta: 'DEFINA SEU GÊNERO:', opcoes: ['MASCULINO', 'FEMININO'] },
  { id: 2, pergunta: 'QUAL O SEU TAMANHO DE ROUPA?', opcoes: ['PP', 'P', 'M', 'G', 'GG', 'XG'] },
  { id: 3, pergunta: 'QUAIS CORES DE ROUPAS VOCÊ PREFERE?', opcoes: ['NEUTRAS (PRETO, BRANCO, CINZA)', 'CORES VIVAS', 'PASTÉIS', 'TONS TERROSOS', 'COLORIDO E VIBRANTE'] },
  { id: 4, pergunta: 'DESCREVA SUA PERSONALIDADE', opcoesFeminino: ['INFORMAL, ESPONTÂNEA, ALEGRE', 'CONSERVADORA, SÉRIA, ORGANIZADA', 'EXIGENTE, REFINADA, BEM-SUCEDIDA', 'FEMININA, MEIGA, DELICADA', 'GLAMOROSA, EXCITANTE, SENSUAL', 'SOFISTICADA, MODERNA, FIRME', 'EXÓTICA, AVENTUREIRA, INOVADORA'], opcoesMasculino: ['INFORMAL, ESPONTÂNEO, ALEGRE', 'CONSERVADOR, SÉRIO, ORGANIZADO', 'EXIGENTE, REFINADO, BEM-SUCEDIDO', 'MASCULINO, TRANQUILO, GENTIL', 'ELEGANTE, IMPONENTE, SENSUAL', 'SOFISTICADO, MODERNO, FIRME', 'EXÓTICO, AVENTUREIRO, INOVADOR'] },
  { id: 5, pergunta: 'QUAL O SEU TIPO DE ROUPA FAVORITA?', opcoesFeminino: ['CONFORTÁVEIS, SOLTAS, PRÁTICAS', 'ROUPAS DISCRETAS, CLÁSSICAS', 'PEÇAS REFINADAS, SEM MODISMOS', 'ROUPAS DELICADAS, CORES SUAVES', 'LOOKS AJUSTADOS QUE VALORIZAM O CORPO', 'PEÇAS ESTRUTURADAS, MODERNAS', 'FORMAS E PEÇAS MARCANTES'], opcoesMasculino: ['CONFORTÁVEIS, SOLTAS, PRÁTICAS', 'ROUPAS DISCRETAS, CLÁSSICAS', 'PEÇAS REFINADAS, SEM MODISMOS', 'ROUPAS SIMPLES E TRANQUILAS', 'LOOKS AJUSTADOS QUE VALORIZAM O CORPO', 'PEÇAS ESTRUTURADAS, MODERNAS', 'FORMAS E PEÇAS MARCANTES'] },
  { id: 6, pergunta: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?', opcoesFeminino: ['BÁSICO CONFORTÁVEL E PRÁTICO', 'FORMAL TRADICIONAL E ATEMPORAL', 'CLÁSSICO SOFISTICADO E ATUAL', 'DELICADO FEMININO E ROMÂNTICO', 'SENSUAL E PROVOCANTE', 'URBANO E IMPACTANTE', 'DIFERENTE E CRIATIVO'], opcoesMasculino: ['BÁSICO CONFORTÁVEL E PRÁTICO', 'FORMAL TRADICIONAL E ATEMPORAL', 'CLÁSSICO SOFISTICADO E ATUAL', 'SIMPLES E ROMÂNTICO', 'SENSUAL E PROVOCANTE', 'URBANO E IMPACTANTE', 'DIFERENTE E CRIATIVO'] },
  { id: 7, pergunta: 'QUAIS DETALHES VOCÊ MAIS GOSTA?', opcoes: ['LOOKS SEM DETALHES', 'DETALHES BEM DISCRETOS', 'DETALHES SOFISTICADOS', 'DETALHES DELICADOS', 'DETALHES QUE VALORIZAM O CORPO', 'DETALHES MARCANTES', 'DETALHES DIFERENTES DO CONVENCIONAL'] },
  { id: 8, pergunta: 'QUAIS ESTAMPAS TÊM MAIS A SUA CARA?', opcoes: ['LISTRAS E XADREZ', 'RISCA DE GIZ', 'ESTAMPAS ABSTRATAS', 'FLORAIS E DELICADAS', 'ANIMAL PRINT', 'ESTAMPAS EXAGERADAS', 'MISTURA DE ESTAMPAS'] },
  { id: 9, pergunta: 'QUAL SEU SAPATO FAVORITO?', opcoesFeminino: ['CONFORTÁVEL', 'CLÁSSICO', 'SOFISTICADO', 'SALTO ALTO E FINO', 'FEMININO', 'DESIGN MODERNO', 'DIFERENTE E VINTAGE'], opcoesMasculino: ['CONFORTÁVEL', 'CLÁSSICO', 'SOFISTICADO', 'SOCIAL', 'MASCULINO', 'DESIGN MODERNO', 'DIFERENTE E VINTAGE'] },
  { id: 10, pergunta: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?', opcoesFeminino: ['ESPORTIVOS E SIMPLES', 'CLÁSSICOS E DISCRETOS', 'REFINADOS', 'DELICADOS E FEMININOS', 'GRANDES E BRILHANTES', 'DESIGN ARROJADO', 'DIVERTIDOS E RÚSTICOS'], opcoesMasculino: ['ESPORTIVOS E SIMPLES', 'CLÁSSICOS E DISCRETOS', 'REFINADOS', 'SIMPLES E MASCULINOS', 'GRANDES E MARCANTES', 'DESIGN ARROJADO', 'DIVERTIDOS E RÚSTICOS'] },
  { id: 11, pergunta: 'QUAL GRUPO DE PEÇAS VOCÊ MAIS GOSTA?', opcoesFeminino: ['JEANS E CAMISETA', 'SAIAS E SCARPINS CLÁSSICOS', 'PEÇAS DE ALFAIATARIA', 'VESTIDO FLUIDO', 'LOOKS SENSUAIS', 'JEANS DESTROYED E CASACOS VOLUMOSOS', 'SEM PEÇAS CHAVES EXCLUSIVAS'], opcoesMasculino: ['JEANS E CAMISETA', 'CALÇAS E SAPATOS SOCIAIS', 'PEÇAS DE ALFAIATARIA', 'ROUPAS LEVES E FLUIDAS', 'LOOKS SENSUAIS', 'JEANS DESTROYED E CASACOS VOLUMOSOS', 'SEM PEÇAS CHAVES EXCLUSIVAS'] }
];

const determinarEstiloFinal = (respostas: Record<string, string>) => {
  const todasRespostas = Object.values(respostas).join(' ').toUpperCase();

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

const Home = () => {
  const navigation = useNavigation();
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [genero, setGenero] = useState<'MASCULINO' | 'FEMININO' | null>(null);
  const [preferenciasSalvas, setPreferenciasSalvas] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);

  const selecionarResposta = (resposta: string) => {
    setRespostaSelecionada(resposta);
  };

  const avancar = () => {
    if (!respostaSelecionada) {
      Alert.alert('Atenção', 'Por favor, selecione uma opção antes de continuar.');
      return;
    }

    const perguntaAtual = perguntasBase[passo].pergunta;
    const novaResposta = { ...respostas, [perguntaAtual]: respostaSelecionada };
    setRespostas(novaResposta);

    if (perguntaAtual === 'DEFINA SEU GÊNERO:') {
      setGenero(respostaSelecionada === 'MASCULINO' ? 'MASCULINO' : 'FEMININO');
    }

    if (passo < perguntasBase.length - 1) {
      setPasso(passo + 1);
      setRespostaSelecionada(null);
    }
  };

  const salvarPreferencias = async () => {
    try {
      const UserId = await AsyncStorage.getItem('userid');
      if (!UserId) return Alert.alert('Erro', 'Usuário não identificado.');

      const estiloFinal = determinarEstiloFinal(respostas);

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
        PecasFavoritas: respostas['QUAL GRUPO DE PEÇAS VOCÊ MAIS GOSTA?'],
        EstiloFinal: estiloFinal,
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

  const perguntaAtual = perguntasBase[passo];
  let opcoes = perguntaAtual.opcoes;
  if (!opcoes && genero) {
    opcoes = genero === 'MASCULINO' ? perguntaAtual.opcoesMasculino : perguntaAtual.opcoesFeminino;
  }

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
              <Text style={styles.pergunta}>{perguntaAtual.pergunta}</Text>
              <View style={styles.opcoesContainer}>
                {opcoes?.map((opcao, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.opcaoButton, 
                      respostaSelecionada === opcao && styles.opcaoSelecionada
                    ]} 
                    onPress={() => selecionarResposta(opcao)}
                  >
                    <Text style={styles.opcaoText}>{opcao}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.botoesContainer}>
                {passo < perguntasBase.length - 1 ? (
                  <TouchableOpacity style={styles.buttonNext} onPress={avancar}>
                    <Text style={styles.buttonText}>PRÓXIMO</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={salvarPreferencias}>
                    <Text style={styles.buttonText}>CONFIRMAR</Text>
                  </TouchableOpacity>
                )}
                {passo > 0 && (
                  <TouchableOpacity style={styles.buttonBack} onPress={() => {
                    setPasso(passo - 1);
                    setRespostaSelecionada(null);
                  }}>
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
    height: Dimensions.get('window').height / 7,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 1625,
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
    height: Dimensions.get('window').height / 1.5,
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
  pergunta: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'center'
  },
  opcoesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },  
  opcaoButton: {
    width: 550,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.test,
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
  },
  opcaoSelecionada: {
    backgroundColor: themas.Colors.gg,
    borderColor: '#fff',
    borderWidth: 1,
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
  },
  buttonNext: {
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
  },
  buttonBack: {
    width: 550,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
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
  boxBottom: {
    height: Dimensions.get('window').height / 8,
    width: 1200,
    paddingHorizontal: 37,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 1500,
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
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16
  },
  sucesso: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50
  }
});

export default Home;