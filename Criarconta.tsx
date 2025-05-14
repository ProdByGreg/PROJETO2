import React, { useState } from 'react';
import { Dimensions, Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { themas } from "./src/global/themes";

const logo = require('./src/assets/DripOrDrown.jpg');

export default function Cadastrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCPF] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function validateNome(nome: string) {
    const re = /^[A-Za-zÀ-ÿ\s]+$/;
    return re.test(nome);
  }
  

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validateCPF(cpf: string) {
    return cpf.replace(/\D/g, '').length === 11;
  }

  function validateTelefone(telefone: string) {
    return telefone.replace(/\D/g, '').length === 11;
  }

  async function criarConta() {
    console.log('Iniciando a criação da conta...');
    console.log('Valores atuais do estado:', { nome, email, password, confirmPassword, telefone, cpf });

    if (!nome || !email || !password || !confirmPassword || !telefone || !cpf) {
      console.log('Atenção: Campos obrigatórios não preenchidos');
      return Alert.alert('Atenção', 'Informe todos os campos obrigatórios!');
    }

    if (!validateNome(nome)) {
      console.log('Atenção: Nome inválido');
      return Alert.alert('Atenção', 'Digite o seu nome!');
    }

    if (!validateEmail(email)) {
      console.log('Atenção: Email inválido');
      return Alert.alert('Atenção', 'Informe um email válido!');
    }

    if (password !== confirmPassword) {
      console.log('Atenção: Senhas não coincidem');
      return Alert.alert('Atenção', 'Senhas não coincidem!');
    }

    if (!validateCPF(cpf)) {
      console.log('Atenção: CPF inválido');
      return Alert.alert('Atenção', 'CPF inválido!');
    }

    if (!validateTelefone(telefone)) {
      console.log('Atenção: Telefone inválido');
      return Alert.alert('Atenção', 'Informe um telefone válido!');
    }

    setLoading(true);

    console.log('Tentando criar conta com:', { nome, email, password, telefone, cpf });

    try {
      const API_URL = process.env.API_URL || 'http://localhost:5009';
      console.log('Enviando dados para API:', API_URL);
      const response = await axios.post(`${API_URL}/api/Auth/register`, {
        nome,
        email,
        password,
        Telefone: telefone,
        CPF: cpf
      });

      console.log('Resposta do servidor:', response.data);
      
      if (response.status === 201) {
        console.log('Conta criada com sucesso!');
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro durante a criação da conta:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Erro na resposta do servidor:', error.response.data);
          Alert.alert('Erro', error.response.data.message || 'Erro ao criar conta.');
        } else {
          console.log('Erro de conexão com o servidor:', error.message);
          Alert.alert('Erro', 'Erro na conexão com o servidor.');
        }
      } else {
        console.log('Erro inesperado:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
      console.log('Processo de criação de conta finalizado');
    }
  }

  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.container}>





        <View style={style.boxTop}>
          <Text style={style.text3}>Já tem conta?</Text>
          <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Login')}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              
              <Text style={style.textButton}>Faça login</Text>
            )}
                    <Image source={logo} style={style.logo} resizeMode="contain" />
          </TouchableOpacity>
                  <Text style={style.text}>Crie sua conta gratis.</Text>
                  <Text style={style.text2}>Explore o conteúdo do site para fins pessoais e organizacionais.</Text>
        </View>






        <View style={style.boxMid}>
          <Text style={style.titleInput}>NOME COMPLETO</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={nome}
              onChangeText={setNome}
              placeholder=" Digite seu nome"
              autoCapitalize="none"
            />
            <MaterialIcons name="person" size={20} color={'gray'} />
          </View>

          <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={email}
              onChangeText={setEmail}
              placeholder=" Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MaterialIcons name="email" size={20} color={'gray'} />
          </View>

          <Text style={style.titleInput}>SENHA</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={password}
              onChangeText={setPassword}
              placeholder=" Digite sua senha"
              secureTextEntry
              autoCapitalize="none"
            />
            <MaterialIcons name="remove-red-eye" size={20} color={'gray'} />
          </View>

          <Text style={style.titleInput}>CONFIRMAR SENHA</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder=" Confirme sua senha"
              secureTextEntry
              autoCapitalize="none"
            />
            <MaterialIcons name="remove-red-eye" size={20} color={'gray'} />
          </View>

          <Text style={style.titleInput}>TELEFONE</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={telefone}
              onChangeText={setTelefone}
              placeholder=" Digite seu telefone"
              keyboardType="phone-pad"
            />
            <MaterialIcons name="phone" size={20} color={'gray'} />
          </View>

          <Text style={style.titleInput}>CPF</Text>
          <View style={style.boxInput}>
            <TextInput
              style={style.input}
              value={cpf}
              onChangeText={setCPF}
              placeholder=" Digite seu CPF"
              keyboardType="numeric"
            />
            <MaterialIcons name="person" size={20} color={'gray'} />
          </View>
          <TouchableOpacity style={style.button} onPress={criarConta} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={style.textButton}>Criar Conta.</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={() => navigation.navigate('Login')}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={style.textButton}>Ja tenho conta.</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={style.boxBottom}>


          <Text style={style.footerText}>© 2025 DripOrDrown</Text>

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
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginTop: 460,
    marginBottom: 20,
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
  
  boxMid: {
    height: Dimensions.get('window').height / 1,
    width: '70%',
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
  },
  boxBottom: {
    height: Dimensions.get('window').height / 4,
    width: '70%',
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
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
  },
  text2: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  text3: {
    fontSize: 18,
    color: '#fff',
    marginTop: 15,
    marginLeft: '38.2%',
  },
  titleInput: {
    color: 'black',
    marginTop: 20,
    marginLeft: '32%',
  },
  boxInput: {
      width: 550,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
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
      marginLeft: '32%',
      borderWidth: 1,
      flexDirection: 'row',
  },
  input: {
    width: 550,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
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
    marginLeft: '32%',
  },
  button2: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    marginTop: 29,
    marginLeft: '47%',
  },
  textButton: {
    fontSize: 18,
    color: '#FFFF',
    fontWeight: 'bold',
  },
  textBottom: {
    fontSize: 16,
    color: themas.Colors.gray,
  },
  logo: {
    width: 117,
    height: 117,
    borderRadius: 100,
    marginLeft: 1100,
  },
  footerText: {
    color: '#fff',
    fontSize: 16
  },
});
