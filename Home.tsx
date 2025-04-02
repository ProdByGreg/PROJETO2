import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const logo = require('./src/assets/DripOrDrown.jpg');

const perguntas = [
  { id: 1, pergunta: 'Defina seu gênero', opcoes: ['Masculino', 'Feminino'] },
  { id: 2, pergunta: 'Insira suas informações físicas', inputs: ['Altura', 'Peso', 'Cores de roupas preferidas'] },
  { id: 3, pergunta: 'Descreva sua personalidade', opcoes: ['Informal, espontânea, alegre', 'Conservadora, séria, organizada', 'Exigente, refinada, bem-sucedida', 'Feminina, meiga, delicada', 'Glamorosa, excitante, sensual', 'Sofisticada, moderna, firme', 'Exótica, aventureira, inovadora'] },
  { id: 4, pergunta: 'Qual o seu tipo de roupa favorita?', opcoes: ['Looks confortáveis, soltos ao corpo, práticos', 'Roupas discretas, com caimento clássico', 'Peças refinadas, sem modismos', 'Roupas delicadas, cores suaves', 'Looks ajustados que valorizam o corpo', 'Peças estruturadas, modernas', 'Formas e peças marcantes'] },
  { id: 5, pergunta: 'Qual visual você mais se identifica?', opcoes: ['Básico confortável e prático', 'Formal tradicional e atemporal', 'Clássico sofisticado e atual', 'Delicado feminino e romântico', 'Sensual e provocante', 'Urbano e impactante', 'Diferente e criativo'] },
  { id: 6, pergunta: 'Quais detalhes você mais gosta?', opcoes: ['Looks sem detalhes', 'Detalhes bem discretos', 'Detalhes sofisticados', 'Detalhes delicados', 'Detalhes que valorizam o corpo', 'Detalhes marcantes', 'Detalhes diferentes do convencional'] },
  { id: 7, pergunta: 'Quais estampas tem mais a sua cara?', opcoes: ['Listras e xadrez', 'Risca de giz', 'Estampas abstratas', 'Florais e delicadas', 'Animal print', 'Estampas exageradas', 'Mistura de estampas'] },
  { id: 8, pergunta: 'Qual seu sapato favorito?', opcoes: ['Confortável', 'Clássico', 'Sofisticado', 'Salto alto e fino', 'Feminino', 'Design moderno', 'Diferente e vintage'] },
  { id: 9, pergunta: 'Que tipo de acessórios você gosta?', opcoes: ['Esportivos e simples', 'Clássicos e discretos', 'Refinados', 'Delicados e femininos', 'Grandes e brilhantes', 'Design arrojado', 'Divertidos e rústicos'] },
  { id: 10, pergunta: 'Qual grupo de peças você mais gosta?', opcoes: ['Jeans e camiseta', 'Saias e scarpins clássicos', 'Peças de alfaiataria', 'Vestido fluido', 'Looks sensuais', 'Jeans destroyed e casacos volumosos', 'Sem peças chaves exclusivas'] }
];

const Home = () => {
  const navigation = useNavigation();
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string | string[]>>({});
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setInputs({ ...inputs, [field]: value });
  };

  const responder = (resposta?: string) => {
    const perguntaAtual = perguntas[passo].pergunta;

    if (perguntas[passo].inputs) {
      const respostasInputs = Object.values(inputs).map(String);
      setRespostas((prev) => ({ ...prev, [perguntaAtual]: respostasInputs }));
    } else if (resposta) {
      setRespostas((prev) => ({ ...prev, [perguntaAtual]: resposta }));
    }

    if (passo < perguntas.length - 1) {
      setPasso(passo + 1);
    } else {
      salvarPreferencias();
    }
  };

  const salvarPreferencias = async () => {
    try {
      const API_URL = process.env.API_URL || 'http://localhost:5009';
      await axios.post(`${API_URL}/api/Preferencias`, respostas);
      Alert.alert('Sucesso', 'Suas preferências foram salvas com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar suas preferências.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="menu" size={32} color="gray" />
      </TouchableOpacity>
      
      <View style={styles.boxTop}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      
      <View style={styles.boxMid}>
        <Text style={styles.text}>{perguntas[passo].pergunta}</Text>

        {perguntas[passo].opcoes?.map((opcao, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => responder(opcao)}>
            <Text style={styles.textButton}>{opcao}</Text>
          </TouchableOpacity>
        ))}

        {perguntas[passo].inputs?.map((input, index) => (
          <TextInput key={index} style={styles.input} placeholder={input} placeholderTextColor="#aaa" onChangeText={(value) => handleInputChange(input, value)} />
        ))}

        {perguntas[passo].inputs && (
          <TouchableOpacity style={styles.button} onPress={() => responder()}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.boxBottom}>
        <Text style={styles.text}>© 2025 DripOrDrown</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  menuButton: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
  boxTop: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2a2a2a' },
  logo: { width: 100, height: 100, marginBottom: 10, borderRadius: 50 },
  boxMid: { flex: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2e2e2e', paddingHorizontal: 20 },
  boxBottom: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333' },
  text: { fontWeight: 'bold', fontSize: 18, color: '#fff', textAlign: 'center', marginBottom: 20 },
  button: { width: 250, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6200ea', borderRadius: 40, marginVertical: 10 },
  textButton: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  input: { width: 250, height: 50, backgroundColor: '#444', color: '#fff', paddingHorizontal: 15, borderRadius: 10, marginVertical: 5 }
});

export default Home;