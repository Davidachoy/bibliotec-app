import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Checkbox from 'expo-checkbox';
import userService from "../../services/userService";
import { useFocusEffect } from "@react-navigation/native";

const CubiculeEditScreen = ({ route, navigation }) => {
  const { cubiculeData } = route.params;
  console.log(cubiculeData);
  const [numeroCubiculo, setNumeroCubiculo] = useState(cubiculeData.numeroCubiculo);
  const [capacidad, setCapacidad] = useState(cubiculeData.capacidad);
  const [disponible, setDisponible] = useState(cubiculeData.disponible);
  const [tipo, setTipo] = useState(cubiculeData.tipo);
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [stringService, setStringService] = useState("");

  const makeString = () => {
    if(isSelected1 && isSelected2 && isSelected3){
      setStringService('1,2,3');
    }
    else if(isSelected1 && !isSelected2 && !isSelected3){
      setStringService('1');
    }
    else if(!isSelected1 && isSelected2 && !isSelected3){
      setStringService('2');
    }
    else if(!isSelected1 && !isSelected2 && isSelected3){
      setStringService('3');
    }
    else if(isSelected1 && isSelected2 && !isSelected3){
      setStringService('1,2');
    }
    else if(isSelected1 && !isSelected2 && isSelected3){
      setStringService('1,3');
    }
    else if(!isSelected1 && isSelected2 && isSelected3){
      setStringService('2,3');
    }
    else{
      setStringService("");
    }
  };

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
  const update = async () => {
    const updatedata = {
            id: cubiculeData.id,
            num: numeroCubiculo,
            tipo: stringService,
            capacidad: capacidad,
            disponible: disponible
          };
    const newCubicule = {
      capacidad: capacidad,
      disponible: disponible,
      eliminado: cubiculeData.eliminado,
      id: cubiculeData.id,
      maximoTiempoUso: cubiculeData.maximoTiempoUso,
      numeroCubiculo: numeroCubiculo,
      tipo: stringService
    }
    const cubiculeEdited = await userService.updateCubiculo(updatedata);
    if (cubiculeEdited == 1) {
      navigation.navigate("CubiculeDetailScreen", { cubiculeData: newCubicule });
    }
  };

  useFocusEffect(
    useCallback(() => {
      makeString();
      return () => {};
    }, [isSelected1])
  );

  useFocusEffect(
    useCallback(() => {
      makeString();
      return () => {};
    }, [isSelected2])
  );

  useFocusEffect(
    useCallback(() => {
      makeString();
      return () => {};
    }, [isSelected3])
  );

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
          <Text style={styles.text}>{stringService}</Text>
        </Text>
        <TextInput
          value={numeroCubiculo}
          onChangeText={handleNumeroCubiculoChange}
          style={styles.input}
        />
        <TextInput
          value={capacidad}
          onChangeText={handleCapacidadChange}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          value={disponible}
          onChangeText={handleDisponibleChange}
          style={styles.input}
        />
        <Checkbox
          value={isSelected1}
          onValueChange={setIsSelected1}
          style={styles.checkbox}
        />
        <Text>NVDA</Text>
        <Checkbox
          value={isSelected2}
          onValueChange={setIsSelected2}
          style={styles.checkbox}
        />
        <Text>Lanbda 1.4</Text>
        <Checkbox
          value={isSelected3}
          onValueChange={setIsSelected3}
          style={styles.checkbox}
        />
        <Text>JAWS</Text>
        <TouchableOpacity style={styles.button} onPress={update}>
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
