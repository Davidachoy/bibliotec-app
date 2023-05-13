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

const Item = ({ id, name, studentId, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.itemText}>Nombre: {name}</Text>
    <Text style={styles.itemText}>carnee: {studentId} </Text>
  </TouchableOpacity>
);
function StudentDashboardScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");

  const renderItem = ({ item }) => (
    <Item
      name={item.nombre}
      studentId={item.carnee}
      onPress={() =>
        navigation.navigate("StudentDetailScreen", { studenData: item })
      }
    />
  );
  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };

  const getStudents = async () => {
    const students = await userService.getStudents();
    const filteredStudents = students.filter((student) =>
      student.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setUsuarios(filteredStudents);
    console.log(students);
  };

  useFocusEffect(
    useCallback(() => {
      getStudents();
      return () => {}; // función de limpieza vacía, aquí no es necesario realizar acciones de limpieza
    }, [searchText])
  );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Gestion de estudiantes</Text>
        <TextInput // Nuevo componente TextInput
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Buscar estudiantes..."
        />
        <FlatList
          data={usuarios}
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

export default StudentDashboardScreen;
