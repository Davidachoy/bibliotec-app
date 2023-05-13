import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const AdminMenuScreen = ({ navigation }) => {
  const handleButtonPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Menú de Administrador</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Opción1")}
        >
          <Text style={styles.buttonText}>Opción 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Opción2")}
        >
          <Text style={styles.buttonText}>Opción 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Opción3")}
        >
          <Text style={styles.buttonText}>Opción 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Opción4")}
        >
          <Text style={styles.buttonText}>Opción 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Opción5")}
        >
          <Text style={styles.buttonText}>Opción 5</Text>
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
    marginBottom: 20,
    alignSelf: "center",
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

export default AdminMenuScreen;
