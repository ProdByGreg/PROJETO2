import React from 'react';
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themas } from "./src/global/themes";

const logo = require('./src/assets/DripOrDrown.jpg');

export default function Login() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.container}>
      <Image source={logo} style={style.logo} resizeMode="contain" />
        <View style={{ flexDirection: 'row' }}>
          <View>
            

            <View style={style.boxTop}>  
              <Text style={style.heading}>
                Bem-vindo ao <Text style={style.sectionTitle}>DripOrDrown</Text>
              </Text>
              <Text style={style.subheading}>
                Onde seu estilo encontra sua essência.
              </Text>
            </View>




            <View style={style.boxMid}>
              <Text style={style.sectionTitle}>Por que descobrir seu estilo?</Text>
              <Text style={style.sectionText}>
                Seu estilo pessoal é mais do que roupas — 
                É como você se comunica com o mundo sem dizer uma palavra. 
              </Text>
              <Text style={style.sectionText}>
                Nosso teste foi criado para te ajudar a descobrir o que combina com sua essência, 
                te dando clareza e confiança na hora de se vestir.
              </Text>
              <Text style={style.sectionText}>
                Ao final, você receberá recomendações únicas para compor um visual que realmente tem a ver com você.
              </Text>
            </View>

            <View style={style.boxMid}>
              <Text style={style.sectionTitle}>A importância da moda para a autoestima</Text>
              <Text style={style.sectionText}>
                A moda tem o poder de transformar como nos sentimos sobre nós mesmos. O que vestimos reflete nossa identidade, nossas escolhas e como nos vemos no mundo.
              </Text>
              <Text style={style.sectionText}>
                Quando nos vestimos de maneira que nos representa e nos faz sentir bem, isso impacta diretamente nossa confiança e autoestima.
              </Text>
              <Text style={style.sectionText}>
                A moda não é só sobre aparência, é sobre como você se expressa e como isso pode aumentar sua autoconfiança. Sentir-se confortável e estiloso no que veste pode ser a chave para se sentir mais poderoso e autêntico.
              </Text>
            </View>

            <View style={style.boxBottom}>
              <Text style={style.ctaText}>
                Pronto para se conhecer melhor através da moda?
              </Text>
              <TouchableOpacity
                style={style.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={style.buttonText}>FAÇA O TESTE AQUI</Text>
              </TouchableOpacity>
            </View>



            <View style={style.boxMid2}>
              <Text style={style.sectionTitle}>
                Descobrir seu estilo é importante por vários motivos, tanto práticos quanto emocionais.
              </Text>

              <Text style={style.sectionTitle}>
                Aqui estão alguns dos principais:
              </Text>

              <Text style={style.sectionText}>
                🧠 1. Autoconhecimento e expressão pessoal{"\n"}
                Seu estilo é uma forma de comunicar quem você é sem precisar dizer uma palavra.{"\n"}
                Ele reflete sua personalidade, valores, gostos e até seu estado de espírito.{"\n\n"}

                💸 2. Economia de tempo e dinheiro{"\n"}
                Conhecendo seu estilo, você evita compras por impulso e foca no que realmente combina com você.{"\n"}
                Isso reduz erros, peças esquecidas no guarda-roupa e facilita montar looks rapidamente.{"\n\n"}

                💪 3. Confiança e autoestima{"\n"}
                Quando você se veste de forma alinhada com sua identidade, se sente mais confiante.{"\n"}
                Estar confortável e bem vestido ajuda a encarar o dia com mais segurança.{"\n\n"}

                🧩 4. Versatilidade e praticidade{"\n"}
                Um estilo bem definido facilita a criação de um guarda-roupa funcional e coerente.{"\n"}
                Isso permite combinações fáceis, menos indecisão e mais praticidade no dia a dia.{"\n\n"}

                🌐 5. Impacto social e profissional{"\n"}
                A forma como você se apresenta influencia a percepção que os outros têm de você.{"\n"}
                Um estilo bem construído pode transmitir profissionalismo, criatividade ou autoridade, dependendo do contexto.
              </Text>
            </View>



            <View style={style.boxBottom2}>
              <Text style={style.sectionTitle2}>
                A moda tem um papel profundo na construção e fortalecimento da autoestima, porque vai muito além de tendências ou aparências:{"\n\n"}
                Ela está diretamente ligada à forma como nos vemos e nos sentimos.{"\n\n"}
                Veja por que ela é tão importante nesse aspecto:
              </Text>

              <Text style={style.ctaText}>
                🌟 1. Reflete sua identidade{"\n"}
                Vestir-se de maneira alinhada com quem você é reforça sua autenticidade. Isso traz segurança e faz com que você se sinta representado na sua própria imagem.{"\n\n"}

                💬 2. Expressa emoções e fases da vida{"\n"}
                A moda é uma forma de comunicação não verbal. Escolher determinadas cores, tecidos ou estilos pode expressar alegria, força, delicadeza, ousadia, ou qualquer sentimento que você queira transmitir — inclusive para si mesmo.{"\n\n"}

                👗 3. Aumenta a confiança{"\n"}
                Quando você se sente bem com o que está vestindo, seu corpo responde: postura mais ereta, olhar mais firme, sorriso mais fácil. Isso afeta diretamente sua confiança em situações sociais ou profissionais.{"\n\n"}

                🔄 4. Incentiva o autocuidado{"\n"}
                Cuidar da própria aparência — sem futilidade, mas com intenção — é um ato de carinho consigo mesmo. Escolher roupas que valorizam seu corpo e fazem você se sentir bem é parte desse processo.{"\n\n"}

                🚫 5. Ajuda a desconstruir padrões{"\n"}
                Ao desenvolver seu próprio estilo, você começa a se libertar das imposições de beleza e a se valorizar do seu jeito. Isso fortalece sua autoestima de forma saudável e realista.
              </Text>

              <TouchableOpacity
                style={style.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={style.buttonText}>FAÇA AGORA O TESTE E DESCUBRA.</Text>
              </TouchableOpacity>
            </View>





            
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export const style = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: Dimensions.get('window').height / 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },





  logo: {
    width: 200,
    height: 200,
    marginTop: 3000,
    borderRadius: 150,
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
  boxBottom2: {
    height: Dimensions.get('window').height / 0.8,
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionTitle2: {
    color: 'lightblue',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 100,
    textAlign: 'center',
  },
  sectionText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  ctaText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
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
    marginTop: 30,
    marginLeft: '25%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
