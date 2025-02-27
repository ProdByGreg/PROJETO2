import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { style } from './styles';
import { themas } from './src/global/themes';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function getLogin() {
    if (!email || !password) {
      console.log('Campos obrigatórios não preenchidos:', { email, password });
      return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
    }

    console.log('Tentando fazer login com:', { email, password });

    try {
      const response = await axios.post('http://localhost:5009/api/Auth/login', { email, password });
      console.log('Resposta do servidor:', response.data);

      if (response.status === 200) {
        const { role } = response.data;
        console.log('Papel do usuário:', role);

        if (role === 'admin') {
          Alert.alert('Acesso como Administrador');
        } else if (role === 'user') {
          Alert.alert('Acesso como Usuário');
        }

        navigation.navigate('Home');
        Alert.alert('Logado com sucesso!');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Erro na resposta do servidor:', error.response.data);
          Alert.alert('Erro', error.response.data.message);
        } else {
          console.log('Erro de conexão com o servidor:', error.message);
          Alert.alert('Erro', 'Erro na conexão com o servidor.');
        }
      } else {
        console.log('Erro inesperado:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.text}>Bem-vindo de volta!</Text>
      </View>

      <View style={style.boxMid}>
        <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
        <View style={style.boxInput}>
          <TextInput
            style={style.input}
            value={email}
            onChangeText={setEmail}
          />
          <MaterialIcons name="email" size={20} color={'gray'} />
        </View>

        <Text style={style.titleInput}>SENHA</Text>
        <View style={style.boxInput}>
          <TextInput
            style={style.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <MaterialIcons name="remove-red-eye" size={20} color={'gray'} />
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button} onPress={getLogin}>
          <Text style={style.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  boxTop: {
    alignItems: 'center',
  },
  boxMid: {
    marginVertical: 20,
  },
  titleInput: {
    fontSize: 14,
    marginBottom: 5,
  },
  boxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
});