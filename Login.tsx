import React, { useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themas } from "./src/global/themes";

const logo = require('./src/assets/DripOrDrown.jpg');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  
      navigation.navigate('Home');
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
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.container}>
        <View style={style.boxTop}>
          <Image source={logo} style={style.logo} resizeMode="contain" />
          <Text style={style.text}>DripOrDrown!</Text>
        </View>

        <View style={style.boxMid}>
          <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
            <MaterialIcons name="email" size={20} color={'gray'} />
          </View>

          <Text style={style.titleInput}>SENHA</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
            <MaterialIcons name="remove-red-eye" size={20} color={'gray'} />
          </View>
        </View>

        <View style={style.boxBottom}>
          <TouchableOpacity style={style.button} onPress={getLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={style.textButton}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={style.rowContainer}>
            <Text style={style.textC}>Não tem conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Criarconta')}>
              <Text style={style.textBottom}> Crie uma.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export const style = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.black,
  },
  boxTop: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMid: {
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 37,
  },
  boxBottom: {
    height: Dimensions.get('window').height / 4,
    width: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    borderRadius: 60,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  titleInput: {
    marginLeft: '38%',
    color: themas.Colors.lightGray,
    marginTop: 30,
  },
  boxInput: {
    width: '25%',
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: '38%',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#444',
    borderColor: '#444',
  },
  input: {
    height: '100%',
    width: '95%',
    borderRadius: 20,
    paddingLeft: 10,
    color: '#fff',
  },
  button: {
    width: 230,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.gg,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  textC: {
    fontSize: 16,
    color: themas.Colors.lightGray,
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
