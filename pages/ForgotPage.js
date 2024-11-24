import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { supabase } from '../supabase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#FF0000"); // Cor padrão para mensagens de erro

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage("Por favor, preencha o campo de e-mail.");
      setMessageColor("#FF0000"); // Vermelho para erro
      return;
    }

    try {
      // Exemplo de integração com backend para enviar o email de recuperação
      const result = await supabase.auth.resetPasswordForEmail(email);

      if (result.error) {
        setMessage("Erro ao enviar o email: " + result.error.message);
        setMessageColor("#FF0000"); // Vermelho para erro
      } else {
        setMessage("Instruções enviadas para o seu email!");
        setMessageColor("#008000"); // Verde para sucesso
      }
    } catch (error) {
      setMessage("Ops, tivemos um problema: " + error.message);
      setMessageColor("#FF0000"); // Vermelho para erro
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícone de Cadeado */}
      <Ionicons name="lock-closed-outline" size={60} color="#4E387E" style={styles.iconLock} />

      {/* Texto de título */}
      <Text style={styles.title}>Esqueceu a senha?</Text>
      <Text style={styles.subtitle}>
        Não se preocupe, te enviaremos as informações necessárias.
      </Text>

      {/* Mensagem de retorno */}
      {message ? <Text style={[styles.message, { color: messageColor }]}>{message}</Text> : null}

      {/* Input de Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#4E387E" style={styles.icon} />
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#4E387E"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Botão de Alterar Senha */}
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Alterar senha</Text>
      </TouchableOpacity>

      {/* Voltar para o Login */}
      <Text style={styles.footerText}>
        <Text style={styles.link} onPress={() => navigation.navigate("LoginPage")}>
          Voltar para o login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconLock: {
    marginBottom: 20,
  },

  sucess:{
    color: "green",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E387E",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6E6E6E",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#4E387E",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#4E387E",
  },
  resetButton: {
    backgroundColor: "#4E387E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#6E6E6E",
    textAlign: "center",
  },
  link: {
    color: "#4E387E",
    textDecorationLine: "underline",
  },
  message: {
    fontSize: 14,
    color: "#FF0000",
    marginBottom: 20,
    textAlign: "center",
  },
});
