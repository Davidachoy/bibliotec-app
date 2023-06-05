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

function UserEncuesta({ route, navigation }) {
    const [reservations, setReservations] = useState([]);
    const { studentData } = route.params;
    const studentID = studentData.id;
    const studentIdentification = studentData.carnee;
    const studentName = studentData.nombre;
    const studentLastName = studentData.apellido1;
    const student2NDLastName = studentData.apellido2
  
    const Item = ({ id, cubiculo, fecha, onPress }) => (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={styles.itemText}>Cubículo: {cubiculo}</Text>
        <Text style={styles.itemText}>Fecha: {fecha} </Text>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item
        cubiculo={item.cubiculo}
        fecha={((item.hora).toDate()).toLocaleDateString()}
        onPress={() =>
          navigation.navigate("UserReservationInfoScreen", { studentData: studentData ,reservationData: item })
        }
      />
    );
    const handleButtonPress = (route, params) => {
      navigation.navigate(route, { ...params });
    };
  
    const getReservations = async (id) => {
      const reservations = await userService.getApartadosConfirmadosUser;
      setReservations(reservations);
      console.log(reservations);
    };
  
    useFocusEffect(
      useCallback(() => {
        getReservations(studentIdentification);
        return () => {};
      }, [])
    );

return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Cubículos Apartados</Text>
        <FlatList
          data={reservations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("UserMenuScreen", { studentData: studentData })}
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

export default UserEncuesta;