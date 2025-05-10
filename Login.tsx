import React, { useState } from 'react';
import {Dimensions, Text, View, TextInput, TouchableOpacity,} from 'react-native';
import {Alert, StyleSheet, ActivityIndicator, Image,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themas } from "./src/global/themes";

const logo = require('./src/assets/DripOrDrown.jpg');

export default function Login() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async function getLogin() {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
    }

    if (!validateEmail(email)) {
      return Alert.alert('Atenção', 'Informe um email válido!');
    }

    setLoading(true);

    try {
      const API_URL = process.env.API_URL || 'http://localhost:5009';
      const response = await axios.post(`${API_URL}/api/Auth/login`, {
        email,
        password,
      });

      const { user, role } = response.data;

      if (!user?.id) {
        console.warn("ID do usuário não foi retornado pela API.");
      } else {
        await AsyncStorage.setItem('userid', user.id.toString());
        console.log('ID salvo com sucesso no AsyncStorage:', user.id);
      }

      if (role === 'admin') {
        Alert.alert('Acesso como Administrador');
      } else if (role === 'user') {
        Alert.alert('Acesso como Usuário');
      }

      navigation.navigate('Inicial');
    } catch (error) {
      console.error('Erro durante o login:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            Alert.alert('Erro', 'Email ou senha incorretos. Tente novamente.');
          } else if (error.response.data.message) {
            Alert.alert('Erro', error.response.data.message);
          } else {
            Alert.alert('Erro', 'Erro ao fazer login.');
          }
        } else {
          Alert.alert('Erro', 'Erro na conexão com o servidor.');
        }
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
      <View style={style.container}>
        <View style={{ flexDirection: 'row' }}>
          <View></View>
          <View>
            <View style={style.boxTop}>
              <Image source={logo} style={style.logo} resizeMode="contain" />
              <Text style={style.text}>Login no DripOrDrown</Text>
            </View>









            <View style={style.boxMid}>
              <Text style={style.titleInput}>Endereço de e-mail</Text>
              <View style={style.boxInput}>
                <TextInput
                  style={style.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#000000"
                />
                <MaterialIcons name="email" size={20} color={'gray'} />
              </View>
              <Text style={style.titleInput}>Senha</Text>
              <View style={style.boxInput}>
                <TextInput
                  style={style.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Digite sua senha"
                  secureTextEntry
                  autoCapitalize="none"
                  placeholderTextColor="red"
                />
                <MaterialIcons name="remove-red-eye" size={20} color={'gray'} />
              </View>

              <TouchableOpacity style={style.button} onPress={getLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={style.textButton}>Entrar</Text>
                )}
              </TouchableOpacity>


              
            </View>









            <View style={style.boxBottom}>

              <View style={style.rowContainer}>
                <Text style={style.textC}>Novo por aqui?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Criarconta')}>
                  <Text style={style.textBottom}> Crie uma conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
  );
}

export const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxTop: {
    height: Dimensions.get('window').height / 6,
    width: 500,
    paddingHorizontal: 37,
    marginBottom: 10,
    marginTop: 10,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxMid: {
    height: Dimensions.get('window').height / 3.1,
    width: 500,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
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
  },

  boxBottom: {
    height: Dimensions.get('window').height / 7,
    width: 500,
    paddingHorizontal: 37,
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

  logo: {
    width: 70,
    height: 70,
    marginTop: 10,
    borderRadius: 60,
  },

  text: {
    fontSize: 18,
    color: themas.Colors.black,
    marginTop: 20,
  },
  titleInput: {
    color: themas.Colors.black,
    marginTop: 30,
    marginLeft: '25%',

  },
  boxInput: {
    width: 230,
    height: 35,
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderColor: 'rgba(200, 200, 200, 0.5)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3.65,
    elevation: 7,
    marginLeft: '25%',
  },



  input: {
    height: '100%',
    width: 230,
    borderRadius: 5,
    paddingLeft: 10,

  },



  button: {
    width: 230,
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



  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  textC: {
    fontSize: 16,
    color: themas.Colors.black,
    marginLeft: '25%',
  },
  textBottom: {
    fontSize: 16,
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});
