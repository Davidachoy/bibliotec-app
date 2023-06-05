import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import userService from "../../services/userService";
const CubiculeEditScreen = ({ route, navigation }) => {
  const { cubiculeData } = route.params;
  console.log("ASDADADADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  console.log(cubiculeData);
  const [numeroCubiculo, setNumeroCubiculo] = useState(cubiculeData.numeroCubiculo);
  const [capacidad, setCapacidad] = useState(cubiculeData.capacidad);
  const [disponible, setDisponible] = useState(cubiculeData.disponible);
  const [tipo, setTipo] = useState(cubiculeData.tipo);

  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };

  const handleNumeroCubiculoChange = (text) => {
    setNumeroCubiculo(text);
  };

  const handleCapacidadChange = (text) => {
    setCapacidad(text);
  };

  const handleDisponibleChange = (text) => {
    setDisponible(text);
  };

  const handleTipoChange = (text) => {
    setTipo(text);
  };

  const guardarCambios = async () => {

    const cubiculos = await userService.updateCubiculo(numeroCubiculo,capacidad,disponible,tipo);

    // Lógica para guardar los nuevos datos en tu base de datos o enviarlos a una API

    console.log("Nuevos datos guardados:", nuevosDatos);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textBold}>
          Cubiculo:{" "}
          <Text style={styles.text}>
            {numeroCubiculo}
          </Text>
        </Text>
        <Text style={styles.textBold}>
          Capacidad:<Text style={styles.text}> {capacidad}</Text>
        </Text>
        <Text style={styles.textBold}>
          Disponible: <Text style={styles.text}>{disponible}</Text>
        </Text>

        <Text style={styles.textBold}>
          Tipo:{" "}
          <Text style={styles.text}>{tipo}</Text>
        </Text>
        <TextInput
          value={numeroCubiculo}
          onChangeText={handleNumeroCubiculoChange}
          style={styles.input}
        />
        <TextInput
          value={capacidad}
          onChangeText={handleCapacidadChange}
          style={styles.input}
        />
        <TextInput
          value={disponible}
          onChangeText={handleDisponibleChange}
          style={styles.input}
        />
        <TextInput
          value={tipo}
          onChangeText={handleTipoChange}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("CubiculeDashboardScreen")}
        >
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CubiculeEditScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "center",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
