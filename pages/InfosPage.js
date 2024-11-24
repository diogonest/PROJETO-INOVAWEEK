import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function InfoPage({ route, navigation }) {
  const { grupo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome do grupo:</Text>
        <Text style={styles.infoTitle}>{grupo.nome}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.infoText}>{grupo.descricao}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Integrantes:</Text>
        <Text style={styles.infoText}>{grupo.integrantes.join(', ')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Avaliação:</Text>
        <Text style={styles.infoText}>{grupo.avaliacao}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que o container ocupe toda a altura da tela
    backgroundColor: '#2E2158', // Define a cor de fundo
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F2B705',
    marginBottom: 30,
    textAlign: 'center', // Centraliza o título
  },
  infoContainer: {
    backgroundColor: '#D8E7F4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center', // Centraliza os containers horizontalmente
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle:{
    fontSize: 40,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#03045e',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#03045e',

  },
  button: {
    position: 'absolute', // Posicionamento absoluto
    bottom: 20, // Distância da borda inferior
    alignSelf: 'center', // Centraliza horizontalmente
    backgroundColor: "#B1A5D0",
    borderRadius: 25,
    width: '90%', // Largura do botão (ajuste se necessário)
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#4E387E",
    fontSize: 16,
    fontWeight: "bold",
  },
});
