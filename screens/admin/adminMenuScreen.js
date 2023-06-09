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
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Gestion de estudiantes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("CubiculeDashboardScreen")}
        >
          <Text style={styles.buttonText}>Gestion de cubiculos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("TimeUsageManager")}
        >
          <Text style={styles.buttonText}>Gestión de Tiempo de uso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("ReservationsManagementScreen")}
        >
          <Text style={styles.buttonText}>Gestión de Reservaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Login")}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
