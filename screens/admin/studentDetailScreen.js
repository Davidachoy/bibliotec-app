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

const StudentDetailScreen = ({ route, navigation }) => {
  const { studenData } = route.params;
  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };

  const deleteStudent = async () => {
    const studentDeleted = userService.deleteStudent(studenData.id);
    if (studentDeleted) {
      console.log("estudiante eliminado con exito");
      navigation.navigate("StudentDashboardScreen");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textBold}>
          Estudiante:{" "}
          <Text style={styles.text}>
            {" "}
            {studenData.nombre} {studenData.apellido}{" "}
            {studenData.segundoApellido}
          </Text>
        </Text>
        <Text style={styles.textBold}>
          Carnee:<Text style={styles.text}> {studenData.carnee}</Text>
        </Text>
        <Text style={styles.textBold}>
          Cedula: <Text style={styles.text}>{studenData.cedula}</Text>
        </Text>
        <Text style={styles.textBold}>
          Correo: <Text style={styles.text}>{studenData.correo}</Text>
        </Text>
        <Text style={styles.textBold}>
          Fecha de nacimiento:{" "}
          <Text style={styles.text}>{studenData.fechaNacimiento}</Text>
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteStudent()}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StudentDetailScreen;

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
