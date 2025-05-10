import React from 'react';
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themas } from "./src/global/themes";

export default function Login() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.container}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <View style={style.boxTop}>
              <Text style={style.heading}>
                Bem-vindo ao <Text style={{ color: 'green' }}>DripOrDrown</Text>!
              </Text>
              <Text style={style.subheading}>
                Onde seu estilo encontra sua essência.
              </Text>
            </View>

            <View style={style.boxMid}>
              <Text style={style.sectionTitle}>Por que descobrir seu estilo?</Text>
              <Text style={style.sectionText}>
                Seu estilo pessoal é mais do que roupas — é como você se comunica com o mundo sem dizer uma palavra. 
              </Text>
              <Text style={style.sectionText}>
                Nosso teste foi criado para te ajudar a descobrir o que combina com sua essência, te dando clareza e confiança na hora de se vestir.
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








  boxTop: {
    height: Dimensions.get('window').height / 6,
    width: 1200,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 37,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
    marginTop: 400,
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
    height: Dimensions.get('window').height / 2.8,
    width: 1200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 37,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
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

  boxBottom: {
    height: Dimensions.get('window').height / 4,
    width: 1200,
    paddingHorizontal: 37,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    color: '#00ff88',
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#00ff88',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionText: {
    color: '#fff',
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
