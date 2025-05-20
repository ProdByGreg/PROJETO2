import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";
import { useNavigation } from '@react-navigation/native';

const logo = require('./src/assets/DripOrDrown.jpg');
const estilos = require('./src/assets/Criativo1.jpg');


interface Preferencias {
  coresPreferidas?: string;
  estiloRoupa?: string;
  identidadeVisual?: string;
  personalidade?: string;
}

const descricoesEstilo: Record<string, string> = {
  'Estilo Casual': 
    'O estilo casual é marcado pelo conforto e praticidade. \n\nIdeal para o dia a dia, ele transmite uma imagem acessível, descontraída e natural. \nRoupas como jeans, camisetas, tênis e peças leves são predominantes nesse visual. \n\nTer esse estilo mostra que você valoriza a liberdade, a simplicidade e a funcionalidade no vestir. \nEncontrar-se no estilo casual permite expressar uma atitude descomplicada e segura, facilitando o convívio social e a adaptação a diversas situações informais. \n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Clássico': 
    'O estilo clássico transmite elegância, sobriedade e confiança. \n\nEle é composto por peças atemporais, de cores neutras e cortes retos, como camisas, calças de alfaiataria e blazers. \nPessoas com esse estilo costumam valorizar a tradição, a organização e a consistência visual. Adotar esse estilo reflete maturidade, profissionalismo e sofisticação. \n\nTer um estilo bem definido como o clássico ajuda a manter uma imagem respeitável e coerente, especialmente em ambientes mais formais ou corporativos.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Sofisticado': 
    'O estilo sofisticado une elegância moderna com atenção aos detalhes.\n\n É caracterizado por peças refinadas, tecidos nobres e acessórios discretos, porém de alta qualidade. \nEsse estilo transmite poder, bom gosto e confiança. \nEle mostra que você se preocupa com a estética e com a apresentação pessoal em alto nível. \n\nTer esse estilo bem definido reforça sua autoridade, sua autoestima e sua presença em qualquer ambiente.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Romântico': 
    'O estilo romântico é delicado, feminino e acolhedor. \n\nPeças com rendas, babados, laços e estampas florais fazem parte dessa identidade visual. \nCores suaves como rosa, lilás e branco são predominantes. \nEsse estilo revela uma personalidade sensível, afetuosa e sonhadora. \n\nTer um estilo romântico é importante para destacar a doçura e a ternura no visual, ajudando a transmitir suavidade e empatia nas relações interpessoais.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Esportivo': 
    '💪 O estilo esportivo (ou esportivo natural) foca no conforto e na praticidade, com roupas leves, funcionais e dinâmicas, como leggings, tênis, moletons e camisetas. \n\nEle é ideal para pessoas ativas, com estilo de vida agitado e que prezam por liberdade de movimento. \nAdotar esse estilo demonstra energia, informalidade e espírito jovem. \n\nTer esse estilo como base ajuda a manter o bem-estar e uma aparência alinhada à rotina de quem está sempre em movimento.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Streetwear': 
    'O streetwear é um estilo urbano e contemporâneo, com raízes na cultura de rua, no skate, no hip-hop e na moda jovem. \n\nEle mistura ousadia com conforto, utilizando peças como camisetas oversized, jeans rasgados, tênis robustos e acessórios marcantes. \n\nTer esse estilo mostra autenticidade, rebeldia e atitude. É uma forma de se expressar artisticamente e de se posicionar culturalmente. \nAssumir o streetwear como estilo fortalece sua individualidade e sua conexão com movimentos modernos.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Criativo': 
    'O estilo criativo é marcado pela originalidade e pela liberdade de expressão. \n\nEle mistura cores, texturas, estampas e formas inusitadas. \n\nNão há regras fixas — o importante é surpreender e inovar. Quem adota esse estilo valoriza a autenticidade, a experimentação e o impacto visual. \n\nTer um estilo criativo é uma maneira poderosa de mostrar sua personalidade única, além de comunicar coragem e inventividade. \nEsse estilo reforça sua presença em qualquer ambiente com muita expressão e ousadia.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Indefinido': 
    'Ainda não foi possível identificar um estilo predominante com base nas suas respostas. \n\nIsso não é um problema — muitas pessoas estão em fase de descoberta e transição. \nTer um estilo definido é importante porque ele ajuda a refletir sua personalidade, aumentar sua autoconfiança e facilitar a construção de uma imagem coerente. \n\nCom o tempo e o autoconhecimento, é possível alinhar suas escolhas com o visual que mais representa quem você é.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.'
};


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






  const calcularEstilo = (respostas: Record<string, string>) => {
    const estiloPontuacao: Record<string, number> = {
      'Estilo Esportivo': 0,
      'Estilo Clássico': 0,
      'Estilo Sofisticado': 0,
      'Estilo Romântico': 0,
      'Estilo Streetwear': 0,
      'Estilo Criativo': 0,
      'Estilo Casual': 0,
    };
  
    const palavrasChave: Record<string, string[]> = {
      'Estilo Esportivo': [
        'CONFORTÁVEL', 'PRÁTICO', 'ESPORTIVO', 'ACADEMIA', 'TREINO',
        'TÊNIS DE CORRIDA', 'ROUPAS PARA TREINAR',
      ],
      'Estilo Clássico': [
        'CLÁSSICO', 'TRADICIONAL', 'DISCRETO', 'ALFAIATARIA', 'CALÇAS E SAPATOS SOCIAIS',
        'SCARPINS CLÁSSICOS', 'RISCA DE GIZ'
      ],
      'Estilo Sofisticado': [
        'SOFISTICADO', 'REFINADO', 'MODERNO', 'ESTRUTURADO', 'PEÇAS REFINADAS',
        'DESIGN MODERNO', 'PEÇAS DE ALFAIATARIA'
      ],
      'Estilo Romântico': [
        'DELICADO', 'FEMININO', 'ROMÂNTICO', 'FLORAIS', 'CORES SUAVES',
        'VESTIDO FLUIDO', 'SALTO ALTO E FINO'
      ],
      'Estilo Streetwear': [
        'IMPACTANTE', 'URBANO', 'JEANS DESTROYED', 'CASACOS VOLUMOSOS',
        'GRANDES E MARCANTES', 'LOOKS SENSUAIS'
      ],
      'Estilo Criativo': [
        'CRIATIVO', 'INOVADOR', 'EXÓTICO', 'ESTAMPAS EXAGERADAS',
        'DIVERTIDOS', 'MISTURA DE ESTAMPAS', 'DIFERENTE', 'DESIGN ARROJADO'
      ],
      'Estilo Casual': [
        'INFORMAL', 'BÁSICO', 'JEANS E CAMISETA', 'LOOKS SEM DETALHES',
        'SIMPLES', 'ROUPAS SIMPLES E TRANQUILAS', 'ESPORTIVOS E SIMPLES'
      ]
    };
  
    const respostasConcatenadas = Object.values(respostas).join(' ').toUpperCase();
  
    for (const [estilo, palavras] of Object.entries(palavrasChave)) {
      palavras.forEach(palavra => {
        if (respostasConcatenadas.includes(palavra)) {
          estiloPontuacao[estilo]++;
        }
      });
    }
  
    const estiloFinal = Object.entries(estiloPontuacao)
      .sort((a, b) => b[1] - a[1])[0][0];
  
    return estiloPontuacao[estiloFinal] === 0 ? 'Estilo Indefinido' : estiloFinal;
  };
  





  return (
    
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
<View style={styles.boxTop}>  
  
              <Text style={styles.heading}>
                Bem-vindo ao <Text style={styles.sectionTitle}>DripOrDrown</Text>
              </Text>
              <Text style={styles.subheading}>
                Onde seu estilo encontra sua essência.
              </Text>
            </View>

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

      {estilo && (
        <View style={styles.boxMid2}>
          <Text style={styles.descricao}>
            {descricoesEstilo[estilo] || 'Descrição não disponível.'}
          </Text>
        </View>
      )}

      <View style={styles.boxBottom}>
      <Image source={estilos} style={styles.estilos} resizeMode="contain" />
      </View>
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
  descricao: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 20,
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
  heading: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    color: '#fff',
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    color: themas.Colors.gg,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
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
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 60,
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
    borderRadius: 10,
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
    height: Dimensions.get('window').height / 2.3,
    width: 1200,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 37,
    borderRadius: 10,
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
    borderRadius: 10,
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
  logo: {
    width: 100,
    height: 100,
    marginTop: 800,
    borderRadius: 150,
  },
  estilos: {
    width: 200,
    height: 200,
  },
});

export default EstiloUsuario;
