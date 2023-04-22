import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    // ...
    // Si el inicio de sesión es exitoso, navega a la pantalla "Home"
    navigation.navigate("MenuAdmin");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput style={styles.input} placeholder="Correo electrónico" />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
