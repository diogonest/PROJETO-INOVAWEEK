import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para ícones
import { supabase } from '../supabase';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Aluno')
        .select('*')
        .eq('email', email)
        .eq('senha', senha)
        .single(); // Obtém um único registro

      if (error || !data) {
        setMessage('E-mail ou Senha incorretos');
      } else {
        setMessage('Login realizado');
        navigation.navigate('MainPage'); // Navega para a página principal após login
      }
    } catch (err) {
      console.log("Ops, tivemos um problema:", err);
      setMessage('Ops, tivemos um problema: ' + err.message);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('../pictures/pnguvv.png')} />
        <Text style={styles.title}>Inova</Text>
        <Text style={styles.subtitle}>week</Text>
      </View>

      {/* Input de email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput 
        placeholder="Email" placeholderTextColor="#fff" 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"/>
      </View>

      {/* Input de senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#fff"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true} // Ativa o modo de segurança
        />
      </View>

      {/* Esqueceu sua senha */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPage')}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Separator */}
      <Text style={styles.orText}>or</Text>

      {/* Botão Criar Conta */}
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')} style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Crie uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2158",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#F2B705",
  },
  subtitle: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#45307B",
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
  },
  forgotPassword: {
    color: "#B1A5D0",
    fontSize: 14,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  loginButton: {
    backgroundColor: "#4E387E",
    borderRadius: 25,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#B1A5D0",
    fontSize: 16,
    marginVertical: 20,
  },
  createAccountButton: {
    backgroundColor: "#B1A5D0",
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  createAccountText: {
    color: "#4E387E",
    fontSize: 16,
    fontWeight: "bold",
  },
});
