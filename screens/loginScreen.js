import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import userService from "../services/userService";
const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const handleLogin = async () => {
    const lowerCaseEmail = correo.toLowerCase();
    try {
      const loginResult = await userService.signIn(lowerCaseEmail, contraseña);
      if (loginResult.success) {
        if (loginResult.isAdmin) {
          navigation.navigate("AdminMenuScreen"); // Navegar a la pantalla de administrador
        } else {
          navigation.navigate("userMenuScreen"); // Navegar a la pantalla de cliente
        }
      } else {
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("registerScreen");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          onChangeText={setCorreo}
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={setContraseña}
          value={contraseña}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default LoginScreen;
