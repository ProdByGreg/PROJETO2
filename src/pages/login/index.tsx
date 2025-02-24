import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import { style } from './styles';
import Logo from '../../assets/steve2.jpg';
import { themas } from '../../global/themes';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para fazer o login
  async function getLogin() {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
    }

    try {
      const response = await axios.post('http://192.168.0.235:3000/login', { email, password });

      // Verifica o retorno do servidor
      if (response.status === 200) {
        const { role } = response.data;

        if (role === 'admin') {
          Alert.alert('Acesso como Administrador');
        } else if (role === 'user') {
          Alert.alert('Acesso como Usuário');
        }

        Alert.alert('Logado com sucesso!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        if (error.response) {
          Alert.alert('Erro', error.response.data.message);
        } else {
          Alert.alert('Erro', 'Erro na conexão com o servidor.');
        }
      } else {
        // Handle non-Axios errors
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
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
      <Text style={style.textBottom}>
        Não tem conta?
        <Text style={{ color: themas.Colors.primary }}> Crie agora!</Text>
      </Text>
    </View>
  );
}