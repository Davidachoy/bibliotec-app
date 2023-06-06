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
import { db } from "../../database/firebase-config";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

function TimeManagerDetail({ route, navigation }) {
  const { cubiculeData } = route.params;
  const [disponible, setDisponible] = useState(cubiculeData.disponible);
  const [maximoTiempo, setMaximoTiempo] = useState(
    cubiculeData.maximoTiempoUso
  );

  const handleButtonPress = (route, params) => {
    navigation.navigate(route, { ...params });
  };

  const handleEstadoChange = () => {
    if (disponible == "Disponible") {
      setDisponible("Mantenimiento");
    } else {
      setDisponible("Disponible");
    }
  };
  const update = async () => {
    const data = {
      id: cubiculeData.id,
      disponible: disponible,
      maximoTiempoUso: maximoTiempo,
    };
    const cubiculo_aux = doc(db, "cubiculos", cubiculeData.id);
    await updateDoc(cubiculo_aux, data);

  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textBold}>
          Cubiculo numero: {cubiculeData.numeroCubiculo}
          <Text style={styles.text}> </Text>
        </Text>
        <View style={styles.stateContainer}>
          <Text style={styles.textBold}>
            Estado: {disponible}
            <Text style={styles.text}> </Text>
          </Text>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => handleEstadoChange()}
          >
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textBold}>
          Maximo tiempo de uso:{" "}
          {maximoTiempo == 0 ? "Indefinido" : maximoTiempo}{" "}
          <Text style={styles.text}></Text>
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={maximoTiempo}
          onChangeText={(text) => {
            const cleanedText = text.replace(/^0+/, "0");
            setMaximoTiempo(cleanedText);
          }}
          placeholder="Ingrese el máximo tiempo de uso..."
        />
        <TouchableOpacity style={styles.button} onPress={() => update()}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            handleButtonPress("BlockCubicule", { cubiculeData: cubiculeData })
          }
        >
          <Text style={styles.buttonText}>Bloquear cubiculo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("TimeUsageManager")}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default TimeManagerDetail;

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
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    borderColor: "grey",
  },
  stateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  changeButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    width: 120,
  },
});
