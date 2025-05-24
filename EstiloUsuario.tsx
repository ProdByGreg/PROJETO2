import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { themas } from "./src/global/themes";
import { useNavigation } from '@react-navigation/native';

const logo = require('./src/assets/DripOrDrown.jpg');


interface Preferencias {
  coresPreferidas?: string;
  estiloRoupa?: string;
  identidadeVisual?: string;
  personalidade?: string;
}


const imagemEstilos: Record<string, any> = {
  'Estilo Casual': [
    require('./src/assets/Casual1.jpg'),
    require('./src/assets/Casual2.jpg'),
    require('./src/assets/Casual3.jpg'),
    require('./src/assets/Casual4.jpg'),
    require('./src/assets/Casual5.jpg'),
    require('./src/assets/Casual6.jpg'),
    require('./src/assets/Casual7.jpg'),
    require('./src/assets/Casual8.jpg'),
  ],
  
  'Estilo Clássico': [
    require('./src/assets/Classico1.jpg'),
    require('./src/assets/Classico2.jpg'),
    require('./src/assets/Classico3.jpg'),
    require('./src/assets/Classico4.jpg'),
    require('./src/assets/Classico5.jpg'),
    require('./src/assets/Classico6.jpg'),
    require('./src/assets/Classico7.jpg'),
    require('./src/assets/Classico8.jpg'),
  ],
  'Estilo Sofisticado': [
    require('./src/assets/Sofisticado1.jpg'),
    require('./src/assets/Sofisticado2.jpg'),
    require('./src/assets/Sofisticado3.jpg'),
    require('./src/assets/Sofisticado4.png'),
    require('./src/assets/Sofisticado5.jpg'),
    require('./src/assets/Sofisticado6.jpg'),
    require('./src/assets/Sofisticado7.jpg'),
    require('./src/assets/Sofisticado8.jpg'),
  ],
  'Estilo Romântico': [
    require('./src/assets/Romantico1.jpg'),
    require('./src/assets/Romantico2.jpg'),
    require('./src/assets/Romantico3.jpg'),
    require('./src/assets/Romantico4.jpg'),
    require('./src/assets/Romantico5.jpg'),
    require('./src/assets/Romantico6.jpg'),
    require('./src/assets/Romantico7.jpg'),
    require('./src/assets/Romantico8.jpg'),
  ],
  'Estilo Esportivo': [
    require('./src/assets/Esportivo1.jpg'),
    require('./src/assets/Esportivo2.jpg'),
    require('./src/assets/Esportivo3.jpg'),
    require('./src/assets/Esportivo4.jpg'),
    require('./src/assets/Esportivo5.jpg'),
    require('./src/assets/Esportivo6.jpg'),
    require('./src/assets/Esportivo7.jpg'),
    require('./src/assets/Esportivo8.jpg'),
  ],
  'Estilo Streetwear': [
    require('./src/assets/Streetwear1.jpg'),
    require('./src/assets/Streetwear2.jpg'),
    require('./src/assets/Streetwear3.jpg'),
    require('./src/assets/Streetwear4.jpeg'),
    require('./src/assets/Streetwear5.jpg'),
    require('./src/assets/Streetwear6.jpg'),
    require('./src/assets/Streetwear7.jpg'),
    require('./src/assets/Streetwear8.jpg'),
  ],
  'Estilo Criativo': [
    require('./src/assets/Criativo1.jpg'),
    require('./src/assets/Criativo2.jpg'),
    require('./src/assets/Criativo3.jpg'),
    require('./src/assets/Criativo4.jpg'),
    require('./src/assets/Criativo5.jpg'),
    require('./src/assets/Criativo6.jpg'),
    require('./src/assets/Criativo7.jpg'),
    require('./src/assets/Criativo8.jpg'),
  ],
  'Estilo Indefinido': [
    require('./src/assets/Criativo1.jpg'),
    require('./src/assets/Streetwear2.jpg'),
    require('./src/assets/Casual4.jpg'),
    require('./src/assets/Sofisticado1.jpg'),
    require('./src/assets/Esportivo8.jpg'),
    require('./src/assets/Streetwear5.jpg'),
    require('./src/assets/Casual1.jpg'),
    require('./src/assets/Sofisticado2.jpg'),
  ],
};

const descricoesEstilo: Record<string, string> = {
  'Estilo Casual': 
    '🌟O estilo casual é marcado pelo conforto e praticidade. \n\n🌟Ideal para o dia a dia, ele transmite uma imagem acessível, descontraída e natural. \nRoupas como jeans, camisetas, tênis e peças leves são predominantes nesse visual. \n\nTer esse estilo mostra que você valoriza a liberdade, a simplicidade e a funcionalidade no vestir. \n🌟Encontrar-se no estilo casual permite expressar uma atitude descomplicada e segura, facilitando o convívio social e a adaptação a diversas situações informais. \n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Clássico': 
    '🧩O estilo clássico transmite elegância, sobriedade e confiança. \n\n🌟Ele é composto por peças atemporais, de cores neutras e cortes retos, como camisas, calças de alfaiataria e blazers. \nPessoas com esse estilo costumam valorizar a tradição, a organização e a consistência visual. Adotar esse estilo reflete maturidade, profissionalismo e sofisticação. \n\n🌟Ter um estilo bem definido como o clássico ajuda a manter uma imagem respeitável e coerente, especialmente em ambientes mais formais ou corporativos.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Sofisticado': 
    '💸O estilo sofisticado une elegância moderna com atenção aos detalhes.\n\n 🌟É caracterizado por peças refinadas, tecidos nobres e acessórios discretos, porém de alta qualidade. \nEsse estilo transmite poder, bom gosto e confiança. \nEle mostra que você se preocupa com a estética e com a apresentação pessoal em alto nível. \n\n🌟Ter esse estilo bem definido reforça sua autoridade, sua autoestima e sua presença em qualquer ambiente.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Romântico': 
    '🌟O estilo romântico é delicado, feminino e acolhedor. \n\n🌟Peças com rendas, babados, laços e estampas florais fazem parte dessa identidade visual. \nCores suaves como rosa, lilás e branco são predominantes. \nEsse estilo revela uma personalidade sensível, afetuosa e sonhadora. \n\n🌟Ter um estilo romântico é importante para destacar a doçura e a ternura no visual, ajudando a transmitir suavidade e empatia nas relações interpessoais.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Esportivo': 
    '💪 O estilo esportivo (ou esportivo natural) foca no conforto e na praticidade, com roupas leves, funcionais e dinâmicas, como leggings, tênis, moletons e camisetas. \n\n🌟Ele é ideal para pessoas ativas, com estilo de vida agitado e que prezam por liberdade de movimento. \nAdotar esse estilo demonstra energia, informalidade e espírito jovem. \n\n🌟Ter esse estilo como base ajuda a manter o bem-estar e uma aparência alinhada à rotina de quem está sempre em movimento.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Streetwear': 
    '💸O streetwear é um estilo urbano e contemporâneo, com raízes na cultura de rua, no skate, no hip-hop e na moda jovem. \n\nEle mistura ousadia com conforto, utilizando peças como camisetas oversized, jeans rasgados, tênis robustos e acessórios marcantes. \nTer esse estilo mostra autenticidade, rebeldia e atitude. É uma forma de se expressar artisticamente e de se posicionar culturalmente. \nAssumir o streetwear como estilo fortalece sua individualidade e sua conexão com movimentos modernos.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Criativo': 
    '🧠O estilo criativo é marcado pela originalidade e pela liberdade de expressão. \n\n🌟Ele mistura cores, texturas, estampas e formas inusitadas. \n\nNão há regras fixas — o importante é surpreender e inovar. Quem adota esse estilo valoriza a autenticidade, a experimentação e o impacto visual. \n\n🌟Ter um estilo criativo é uma maneira poderosa de mostrar sua personalidade única, além de comunicar coragem e inventividade. \nEsse estilo reforça sua presença em qualquer ambiente com muita expressão e ousadia.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.',

  'Estilo Indefinido': 
    'Ainda não foi possível identificar um estilo predominante com base nas suas respostas. \n\n🌟Isso não é um problema — muitas pessoas estão em fase de descoberta e transição. \nTer um estilo definido é importante porque ele ajuda a refletir sua personalidade, aumentar sua autoconfiança e facilitar a construção de uma imagem coerente. \n\n🌟Com o tempo e o autoconhecimento, é possível alinhar suas escolhas com o visual que mais representa quem você é.\n\n🌟Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.'
};


const detalhesEstilo: Record<string, string> = {
  'Estilo Casual': 
    '👖 O estilo casual é leve, confortável e prático. \n\n🧢Ideal para o dia a dia, ele inclui peças como jeans, camisetas, tênis e jaquetas leves. \n\n😌 O foco é o bem-estar e a funcionalidade, sem abrir mão do estilo. \n\n🧺 Looks casuais são ótimos para quem gosta de simplicidade, com uma pegada descomplicada e autêntica. \n\n👟 Perfeito para rotinas corridas ou momentos relax, sem perder o toque pessoal.',

  'Estilo Clássico': 
    '🕴️ O estilo clássico transmite elegância, seriedade e sofisticação atemporal. \n\n👔 Peças bem cortadas, alfaiataria, tons neutros e acessórios discretos dominam esse visual. \n\n📏 É ideal para quem valoriza organização, tradição e uma imagem polida e coerente. \n\n⌚ Elementos como blazers, calças sociais, camisas e sapatos refinados fazem parte da composição. \n\n💼 Excelente para ambientes profissionais ou situações que exigem uma apresentação impecável.',

  'Estilo Sofisticado': 
    '💎 O estilo sofisticado é elegante, refinado e moderno. \n\n🧥 Ele valoriza tecidos nobres, cortes bem estruturados e detalhes de alta qualidade. \n\n👠 Acessórios são sutis, mas de impacto — como bolsas de grife ou sapatos de couro fino. \n\n🌟 Esse estilo transmite sucesso, poder e bom gosto, com foco em exclusividade e presença marcante. \n\n🛍️ Ideal para quem deseja se destacar com classe e autoridade.',

  'Estilo Romântico': 
    '🌸 O estilo romântico é delicado, feminino e encantador. \n\n👗 Ele traz rendas, laços, estampas florais e cores suaves como rosa, branco e lilás. \n\n🕊️ As peças costumam ter cortes fluídos e tecidos leves, como saias rodadas, vestidos e blusas com babados. \n\n🧁 Esse estilo expressa sensibilidade, afeto e um ar sonhador. \n\n💖 Ideal para quem gosta de looks suaves, poéticos e acolhedores.',

  'Estilo Esportivo': 
    '🏃‍♀️ O estilo esportivo é dinâmico, funcional e confortável. \n\n👟 Ele combina peças como leggings, camisetas, jaquetas, tênis e bonés, com foco em liberdade de movimento. \n\n💪 É ideal para quem tem uma rotina agitada ou prática esportes, mas quer manter o visual alinhado. \n\n🎽 A estética esportiva transmite energia, vitalidade e praticidade. \n\n🧢 Também é comum em looks urbanos que valorizam o "sporty chic" — mistura de moda e desempenho.',

  'Estilo Streetwear': 
    '🔥 O estilo streetwear, é marcado por um visual urbano, despojado e cheio de atitude. \n\n🛹Ele tem origem na cultura de rua, especialmente do skate, hip hop e do cenário esportivo, e mistura conforto com estilo. \n\n😎No guarda-roupa feminino, é comum encontrar calças largas ou cargo, tops, camisetas oversized, moletom com capuz, tênis robustos (como os chunky sneakers) e acessórios como bonés, correntes e pochetes. \n\n💀Já no visual masculino, predominam as bermudas largas, camisetas estampadas, jaquetas bomber ou corta-vento, além de tênis estilosos e bonés. Ambos os estilos priorizam peças confortáveis e com personalidade, muitas vezes com logos de marcas, grafismos ou cores marcantes. \n\n🧃O streetwear permite expressar individualidade e atitude por meio da roupa, combinando o conforto das roupas esportivas com a estética da cultura jovem e urbana.\n\n💥 É um estilo ideal para quem quer se vestir de forma livre, moderna e cheia de identidade.',

  'Estilo Criativo': 
    '🎨 O estilo criativo é ousado, original e cheio de personalidade. \n\n🌈 Ele mistura estampas, cores vibrantes, texturas inusitadas e peças fora do comum. \n\n🌀 Não segue padrões: a regra aqui é surpreender e inovar. \n\n👒 Acessórios marcantes, sobreposições e combinações inesperadas são a essência desse estilo. \n\n🌟 Perfeito para quem quer expressar sua individualidade e criatividade sem limites.',

  'Estilo Indefinido': 
    '❓ Ainda não foi possível identificar um estilo predominante com base nas suas escolhas. \n\n🔄 Isso pode significar que você está em uma fase de transição ou descobrindo novos gostos. \n\n🧭 Com o tempo, autoconhecimento e experimentação, seu estilo pode se definir naturalmente. \n\n🧶 Misturar influências é uma forma legítima de construir algo único. \n\n💫 Continue explorando — seu estilo pessoal está em evolução constante!'
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
        'TÊNIS DE CORRIDA', 'ROUPAS PARA TREINAR', 'SEM ESTAMPAS',
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
        'VESTIDO FLUIDO', 'SALTO ALTO E FINO' ,'LOOKS SENSUAIS',
      ],
      'Estilo Streetwear': [
        'IMPACTANTE', 'URBANO', 'JEANS DESTROYED', 'CASACOS VOLUMOSOS',
        'GRANDES E MARCANTES', 'BEM-SUCEDIDO'
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
                Seu estilo <Text style={styles.sectionTitle}>DripOrDrown</Text>
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
        <View style={styles.boxBottom}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {imagemEstilos[estilo]?.slice(0, 4).map((imgSource, index) => (
      <Image
        key={index}
        source={imgSource}
        style={styles.estilos}
        resizeMode="cover"
      />
    ))}
  </ScrollView>
</View>

)}




      {estilo && (
        <View style={styles.boxMid2}>
          <Text style={styles.descricao}>
            {descricoesEstilo[estilo] || 'Descrição não disponível.'}
          </Text>
        </View>
      )}




{estilo && (
  <View style={styles.boxBottom}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {imagemEstilos[estilo]?.slice(4, 8).map((imgSource, index) => (
      <Image
        key={index}
        source={imgSource}
        style={styles.estilos}
        resizeMode="cover"
      />
    ))}
  </ScrollView>
</View>

)}




      {estilo && (
        <View style={styles.boxMid3}>
          <Text style={styles.descricao}>
            {detalhesEstilo[estilo] || 'Detalhes não disponível.'}
          </Text>
        </View>
      )}





<View style={styles.boxBottom2}>  

              <Text style={styles.heading}>
                Não gostou do resultado? Refaça o <Text style={styles.sectionTitle}>teste.</Text>
              </Text>
  
<TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.buttonText}>REFAZER O TESTE</Text>
              </TouchableOpacity>
  
</View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: Dimensions.get('window').height / 5,
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
  sectionText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  boxTop: {
    height: Dimensions.get('window').height / 6,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 37,
    marginBottom: 30,
    marginTop: 30,
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
  boxMid3: {
    height: Dimensions.get('window').height / 2,
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
    height: Dimensions.get('window').height / 2,
    width: '100%',
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
    alignItems: 'center',
  },
  boxBottom2: {
    height: Dimensions.get('window').height / 6,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 37,

    marginBottom: 30,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 2300,
    borderRadius: 150,
  },
  estilos: {
    width: 460,
    height: 450,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    
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
    marginTop: 50,
  },

  
});

export default EstiloUsuario;
