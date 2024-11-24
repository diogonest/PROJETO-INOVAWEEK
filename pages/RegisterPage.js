import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, CheckBox } from 'react-native';
import { supabase } from '../supabase';
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('Aluno')
        .insert([{ nome: name, email, senha: password }]); 
  
      if (error) {
        console.log("Erro ao criar conta:", error.message);
        setMessage('Erro ao criar conta: ' + error.message);
        return;
      } else {
        setMessage('Conta criada com sucesso!');
        console.log("Conta criada:", data);
        navigation.navigate('LoginPage'); 
      }
    } catch (err) {
      console.log("Ops, tivemos um problema:", err);
      setMessage("Ops, tivemos um problema:" + err.message);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* ContainerBox para o título */}
      <View style={styles.containerBox}>
        <Text style={styles.headerTitle}>Vamos</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.bold}>Criar{"\n"}A sua{"\n"}Conta?</Text>
        </Text>
      </View>

      <View style={styles.containermsg}>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
      

      {/* Input de Nome Completo */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#4E387E" style={styles.icon} />
        <TextInput
          placeholder="Nome completo"
          placeholderTextColor="#4E387E"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
  
      {/* Input de Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#4E387E" style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#4E387E"
          style={styles.input}
          value={email}
          onChangeText={setEmail} keyboardType="email-address"
        />
      </View>
  
      {/* Input de Senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#4E387E" style={styles.icon} />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#4E387E"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
  
      {/* Input de Confirmação de Senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#4E387E" style={styles.icon} />
        <TextInput
          placeholder="Digite a senha novamente"
          placeholderTextColor="#4E387E"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>
  
      {/* Checkbox e Termos */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          tintColors={{ true: "#4E387E", false: "#4E387E" }}
        />
        <Text style={styles.checkboxText}>
          I agree to the <Text style={styles.link}>Terms & Privacy</Text>
        </Text>
      </View>
  
      {/* Botão de Cadastro */}
      <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
        <Text style={styles.signupButtonText}>Cadastrar</Text>
      </TouchableOpacity>
  
      {/* Link para login */}
      <Text style={styles.footerText}>
        Já possui uma conta? <Text style={styles.link} onPress={() => navigation.navigate('LoginPage')}>Faça login</Text>
      </Text>
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Ajuste conforme o background do app
    padding: 20,
  },

  containermsg:{
    padding: 20,
  },

  message:{
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },

  containerBox: {
    backgroundColor: "#2C2543", // Cor do fundo da containerBox
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30, // Bordas inferiores arredondadas
    borderBottomRightRadius: 30,
    width: "100%", // Ajusta a largura conforme necessário
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 50,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  headerSubtitle: {
    fontSize: 50,
    color: "#FFFFFF",
    lineHeight: 50,
  },
  bold: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#4E387E",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
  },
  checkboxText: {
    color: "#4E387E",
    marginLeft: 10,
  },
  link: {
    color: "#4E387E",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#4E387E",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginVertical: 20,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    color: "#4E387E",
    textAlign: "center",
  },
});