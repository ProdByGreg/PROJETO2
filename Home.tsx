import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const logo = require('./src/assets/steve2.jpg');

// Defina o tipo para o objeto imagens
type ImagensType = {
  Calabresa: any;
  Margherita: any;
  'Quatro Queijos': any;
  'Frango com Catupiry': any;
  Portuguesa: any;
  'Coca-Cola': any;
  Guaraná: any;
  'Fanta Laranja': any;
  Sprite: any;
};

// Mapeamento das imagens locais
const imagens: ImagensType = {
  Calabresa: require('./src/assets/calabresa.jpg'),
  Margherita: require('./src/assets/margherita.jpeg'),
  'Quatro Queijos': require('./src/assets/quatro_queijos.jpeg'),
  'Frango com Catupiry': require('./src/assets/frango_catupiry.jpg'),
  Portuguesa: require('./src/assets/portuguesa.jpg'),
  'Coca-Cola': require('./src/assets/coca.jpg'),
  Guaraná: require('./src/assets/guarana.jpg'),
  'Fanta Laranja': require('./src/assets/fanta.jpg'),
  Sprite: require('./src/assets/sprite.jpg'),
};

interface Sabor {
  id: number;
  nome: string;
}

interface Refrigerante {
  id: number;
  nome: string;
}

const Home = () => {
  const [selectedSabores, setSelectedSabores] = useState<string[]>([]);
  const [sabores, setSabores] = useState<Sabor[]>([]);
  const [refrigerantes, setRefrigerantes] = useState<Refrigerante[]>([]);

  useEffect(() => {
    // Carrega os sabores de pizza
    axios.get('http://localhost:5009/api/sabores')
      .then(response => setSabores(response.data))
      .catch(error => console.error('Erro ao carregar sabores:', error));

    // Carrega os refrigerantes
    axios.get('http://localhost:5009/api/refrigerantes')
      .then(response => setRefrigerantes(response.data))
      .catch(error => console.error('Erro ao carregar refrigerantes:', error));
  }, []);

  const handleSaborSelection = (sabor: string) => {
    if (selectedSabores.includes(sabor)) {
      setSelectedSabores(selectedSabores.filter((item) => item !== sabor));
    } else if (selectedSabores.length < 3) {
      setSelectedSabores([...selectedSabores, sabor]);
    } else {
      Alert.alert('Atenção', 'Você pode escolher no máximo 3 sabores.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Box Top */}
      <View style={styles.boxTop}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="remove-red-eye" size={40} color={'gray'} />
        </View>

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.textLogo}>Steve Pizzaria</Text>
      </View>

      {/* Box Mid */}
      <View style={styles.boxMid}>
        <ScrollView>
          <Text style={styles.sectionTitle}>Escolha até 3 sabores de pizza:</Text>
          {sabores.map((sabor) => (
            <TouchableOpacity
              key={sabor.id}
              style={[
                styles.itemContainer,
                selectedSabores.includes(sabor.nome) && styles.selectedItem,
              ]}
              onPress={() => handleSaborSelection(sabor.nome)}
            >
              <Image source={imagens[sabor.nome as keyof ImagensType]} style={styles.itemImage} />
              <Text style={styles.itemText}>{sabor.nome}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Escolha seu refrigerante:</Text>
          {refrigerantes.map((refri) => (
            <View key={refri.id} style={styles.itemContainer}>
              <Image source={imagens[refri.nome as keyof ImagensType]} style={styles.itemImage} />
              <Text style={styles.itemText}>{refri.nome}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Box Bottom */}
      <View style={styles.boxBottom}>
        <Text style={styles.selectedText}>
          Sabores selecionados: {selectedSabores.join(', ')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTop: {
    height: '22%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDDC1',
    position: 'relative',
  },
  boxMid: {
    height: '68%',
    width: '100%',
    backgroundColor: 'green',
  },
  boxBottom: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8F8D8',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 60,
  },
  textLogo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#e0f7fa',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;