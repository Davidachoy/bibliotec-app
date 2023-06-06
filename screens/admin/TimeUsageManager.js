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
import { useFocusEffect } from "@react-navigation/native";

const Item = ({ id, numero, disponible, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.itemText}>Cubiculo# {numero}</Text>
      <Text style={styles.itemText}>{disponible}</Text>
    </TouchableOpacity>
  );
};

const TimeUsageManager = ({ navigation }) => {
  const [cubiculos, setCubiculos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Item
        numero={item.numeroCubiculo}
        disponible={item.disponible}
        onPress={() =>
          navigation.navigate("TimeManagerDetail", { cubiculeData: item })
        }
      />
    );
  };

  const getCubiculos = async () => {
    const cubiculos = await userService.getCubiculos();
    const fileredCubiculos = cubiculos.filter((cubiculos) =>
      cubiculos.numeroCubiculo.includes(searchText)
    );
    setCubiculos(fileredCubiculos);
  };

  useFocusEffect(
    useCallback(() => {
      getCubiculos();
      return () => {}; // función de limpieza vacía, aquí no es necesario realizar acciones de limpieza
    }, [searchText])
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Tiempo de uso</Text>
        <TextInput // Nuevo componente TextInput
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Buscar Cubiculo..."
        />
        <FlatList
          data={cubiculos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("AdminMenuScreen")}
        >
          <Text style={styles.buttonText}>Atras</Text>
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

export default TimeUsageManager;
