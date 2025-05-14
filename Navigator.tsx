import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';
import Criarconta from './Criarconta';
import Perfil from './Perfil';
import EstiloUsuario from './EstiloUsuario';
import Inicial from './Inicial';



const Stack = createStackNavigator();





export default function App() {
  console.log('Iniciando navegação.');
  console.log('Iniciando navegação..');
  console.log('Iniciando navegação...');




  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Criarconta" screenOptions={{ headerShown: false }}>


        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />


        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name="Criarconta"
          component={Criarconta}
          options={{ title: 'Criarconta' }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: 'Perfil' }}
        />

        <Stack.Screen
          name="EstiloUsuario"
          component={EstiloUsuario}
          options={{ title: 'EstiloUsuario' }}
        />

        <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={{ title: 'Inicial' }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );}