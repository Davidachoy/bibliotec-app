import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import userService from "../../services/userService";

const CubiculeDetailScreen = ({ route, navigation }) => {
  const { cubiculeData } = route.params;
  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };

  const deleteCubicule= async () => {
 // falta de hacer
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textBold}>
          Cubiculo:{" "}
          <Text style={styles.text}>
            {" "}
            {cubiculeData.numeroCubiculo}
          </Text>
        </Text>
        <Text style={styles.textBold}>
          Capacidad:<Text style={styles.text}> {cubiculeData.capacidad}</Text>
        </Text>
        <Text style={styles.textBold}>
          Disponible: <Text style={styles.text}>{cubiculeData.disponible}</Text>
        </Text>
        <Text style={styles.textBold}>
          Eliminado: <Text style={styles.text}>{cubiculeData.eliminado}</Text>
        </Text>
        <Text style={styles.textBold}>
          Máximo tiempo de uso:{" "}
          <Text style={styles.text}>{cubiculeData.maximoTiempoUso}</Text>
        </Text>
          <Text style={styles.textBold}>
          Tipo:{" "}
          <Text style={styles.text}>{cubiculeData.tipo}</Text>
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("CubiculeDashboardScreen")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteStudent()}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("CubiculeDashboardScreen")}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CubiculeDetailScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: "100%",
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
  text: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "normal",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  bottonView: {
    marginTop: 20,
  },
});
