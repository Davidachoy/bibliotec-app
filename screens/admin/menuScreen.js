import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Bienvenido a la página de inicio</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
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
});

export default MenuScreen;
