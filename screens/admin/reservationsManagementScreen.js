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

function reservationsManagementScreen({ route, navigation }) {
    const [reservations, setReservations] = useState([]);
    const [filtro, setFiltro] = useState('');
  
    const Item = ({ id, cubiculo, fecha, carnee, onPress }) => (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={styles.itemText}>#: {cubiculo}</Text>
        <Text style={styles.itemText}>Fecha: {fecha} </Text>
        <Text style={styles.itemText}>Carnee: {carnee} </Text>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item
        cubiculo={item.cubiculo}
        fecha={((item.hora).toDate()).toLocaleDateString()}
        carnee={item.carnee}
        onPress={() =>
          navigation.navigate("ReservationInfoScreen", { reservationData: item })
        }
      />
    );
    const handleButtonPress = (route, params) => {
      navigation.navigate(route, { ...params });
    };
  
    const getReservations = async () => {
      const reservations = await userService.getApartados();
      setReservations(reservations);
      console.log(reservations);
    };
  
    const getReservationsFiltered = async (filter) => {
        if (filter==""){
            const reservations = await userService.getApartados();
            setReservations(reservations);
            console.log(reservations);
        }
        else{
            const reservations = await userService.getApartadosNumber(filter);
            setReservations(reservations);
            console.log(reservations);
        }
      };

    useFocusEffect(
      useCallback(() => {
        getReservations();
        return () => {};
      }, [])
    );

    useFocusEffect(
        useCallback(() => {
        getReservationsFiltered(filtro);
          return () => {};
        }, [filtro])
      );

return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Cubículos Apartados</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={text => setFiltro(text)}
          value={filtro}
          keyboardType="numeric"
          placeholder="Filtrar por cubiculo"
        />
        <FlatList
          data={reservations}
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
    fontSize: 14,
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

export default reservationsManagementScreen;