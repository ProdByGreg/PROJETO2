import React, { useState } from 'react';
import { Dimensions, Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { themas } from "./src/global/themes";






const logo = require('./src/assets/DripOrDrown.jpg');






export default function Criarconta() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCPF] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();



  function validateNome(nome: string) {
    return nome.replace(/\D/g, '').length === 11;
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





  async function Criarconta() {




    if (!nome || !email || !password || !confirmPassword || !telefone || !cpf) {
      return Alert.alert('Atenção', 'Informe todos os campos obrigatórios!');
    }

    if (!validateNome(nome)) {
      return Alert.alert('Atenção', 'Digite o seu nome!');
    }

    if (!validateEmail(email)) {
      return Alert.alert('Atenção', 'Informe um email válido!');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Atenção', 'Senhas não coincidem!');
    }

    if (!validateCPF(cpf)) {
      return Alert.alert('Atenção', 'CPF inválido!');
    }

    if (!validateTelefone(telefone)) {
      return Alert.alert('Atenção', 'Informe um telefone válido!');
    }

    setLoading(true);







                        //<~~TENTANDO CONECTAR COM BANCO DE DADOS~~>//

    console.log('Tentando criar conta com:', {nome,  email, password, telefone, cpf });

    try {
      const API_URL = process.env.API_URL || 'http://localhost:5009';
      const response = await axios.post(`${API_URL}/api/Auth/register`, {
        nome,
        email,
        password,
        Telefone: telefone,
        CPF: cpf
      });

      console.log('Resposta do servidor:', response.data);

                        //<~~SE TUDO OK (201) REDIRECIONA PARA TELA DE LOGIN~~>//

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login'); 
      }
    }
    
    
    
    




                        //<~~TESTANDO A CONEXÃO DO AXIOS COM BANCO DE DADOS~~>//

      catch (error) {
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
                        }
    
    
    





    
    
    finally {
      setLoading(false);
    }
  }










  return (

    <View style={style.container}>





      <View style={style.boxTop}>

        <Image
            source={logo}
            style={style.logo}
            resizeMode="contain"
          />

        <Text style={style.text}>Criar uma nova conta!</Text>

      </View>





      <View style={style.boxMid}>

      <Text style={style.titleInput}>NOME COMPLETO</Text>


<View style={style.boxInput}>

  <TextInput
    style={style.input}
    value={nome}
    onChangeText={setNome}
    placeholder="Digite seu nome"
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
            placeholder="Digite seu email"
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
            placeholder="Digite sua senha"
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
            placeholder="Confirme sua senha"
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
            placeholder="Digite seu telefone"
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
            placeholder="Digite seu CPF"
            keyboardType="numeric"
          />

          <MaterialIcons name="person" size={20} color={'gray'} />

        </View>

        
      </View>












      <View style={style.boxBottom}>

        <TouchableOpacity style={style.button} onPress={Criarconta} disabled={loading}>


          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={style.textButton}>Criar Conta</Text>
          )}


        </TouchableOpacity>

      </View>





    </View>
  );
}










export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:themas.Colors.gg,
  },
  boxTop: {
    height: 200,
    width: '100%',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxMid: {
    height: 505,
    width: '100%',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 37
  },
  boxBottom: {
    height: 205,
    width: '100%',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginTop: 40,
    fontSize: 18,
  },
  titleInput: {
    marginLeft: '30%',
    color: themas.Colors.gray,
    marginTop: 10,
  },
  boxInput: {
    width: '40%',
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: '30%',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: themas.Colors.lightGray,
    borderColor: themas.Colors.lightGray,
  },
  input: {
    height: '100%',
    width: '95%',
    borderRadius: 20,
    paddingLeft: 10
  },
  button: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.Colors.gg,
    borderRadius: 40,
    shadowColor: "#000",
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
    color: '#FFFF',
    fontWeight: 'bold',
  },
  textBottom: {
    fontSize: 16,
    color: themas.Colors.gray,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 25,
    borderRadius: 60,
  },
});