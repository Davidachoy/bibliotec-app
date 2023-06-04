import React, { useState, useEffect, useCallback } from "react";
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

const reservationInfoScreen = ({ route, navigation }) => {
  const { reservationData } = route.params;
  console.log(reservationData);

  
  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };

  const cancelReservation = async () =>{
    userService.deleteReservation(reservationData.id);
    navigation.navigate("ReservationsManagementScreen");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textBold}>
          Estudiante:<Text style={styles.text}> {reservationData.estudiante}</Text>
        </Text>
        <Text style={styles.textBold}>
          Carnee:<Text style={styles.text}> {reservationData.carnee}</Text>
        </Text>
        <Text style={styles.textBold}>
          Cubículo:<Text style={styles.text}> {reservationData.cubiculo}</Text>
        </Text>
        <Text style={styles.textBold}>
          Fecha:<Text style={styles.text}> {((reservationData.hora).toDate()).toLocaleDateString()}</Text>
        </Text>
        <Text style={styles.textBold}>
          Inicio: <Text style={styles.text}>{((reservationData.hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </Text>
        <Text style={styles.textBold}>
          Fin: <Text style={styles.text}>{((reservationData.horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => cancelReservation()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("ReservationsManagementScreen")}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default reservationInfoScreen;

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
