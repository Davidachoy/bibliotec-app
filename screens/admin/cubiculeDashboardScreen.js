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
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

import userService from "../../services/userService";
import { useFocusEffect } from "@react-navigation/native";

const CubiculeDashboardScreen = ({ navigation }) => {
  const [cubiculos, setCubiculos] = useState([]);


  const Item = ({ numeroCubiculo, cubiculo, capacidad,tipo,onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.itemText}>Cubículo: {cubiculo}</Text>
      <Text style={styles.itemText}>Capacidad: {capacidad} </Text>
      <Text style={styles.itemText}>Tipo: {tipo} </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      cubiculo={item.numeroCubiculo}
      capacidad={item.capacidad}
      tipo={item.tipo}
      onPress={() =>
          navigation.navigate("", {})
        }
    />
  );
  const handleButtonPress = (route, params) => {
    navigation.navigate(route, { ...params });
  };

  const getCubiculos = async () => {
    const cubiculos = await userService.getCubiculos();
    setCubiculos(cubiculos);
    console.log(cubiculos);
  };

  useFocusEffect(
    useCallback(() => {
      getCubiculos();
      return () => {};
    }, [])
  );

return (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de cubiculos</Text>
      <FlatList
        data={cubiculos}
        renderItem={renderItem}
        keyExtractor={(item) => item.numeroCubiculo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress()}
      >
        <Text style={styles.buttonText}>Atras</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  justifyContent: "center",
  paddingHorizontal: 20,
  height: "100%",
},
title: {
  fontSize: 24,
  fontWeight: "bold",
  alignSelf: "center",
  textAlign: "center",
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

addButton: {
  padding: 10,
  alignItems: "center",
  marginBottom: 10,
  marginTop: 20,
  borderRadius: 20,
  borderWidth: 1,
},
item: {
  marginBottom: 10,
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 20,
  borderWidth: 1,
  padding: 8,
  flexDirection: "row",
},
itemText: {
  fontSize: 18,
  alignSelf: "flex-start",
},
searchInput: {
  borderWidth: 1,
  borderColor: "grey",
  borderRadius: 5,
  padding: 8,
  marginBottom: 10,
},
});

export default CubiculeDashboardScreen;
