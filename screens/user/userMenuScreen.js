import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, NativeBaseProvider } from "native-base";


const UserMenuScreen = ({navigation}) => {

  const handleButtonPress = (route) =>{
    navigation.navigate(route);
  };
  return(
    <NativeBaseProvider>
      <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Menú de Administrador</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Apartar un Cubículo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Lista de Apartados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Mi Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Button>Click Me</Button>

      </View>
    </SafeAreaView>
    </NativeBaseProvider>
  );
  /*
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Menú de Administrador</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Apartar un Cubículo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Lista de Apartados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Mi Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("StudentDashboardScreen")}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Button>Click Me</Button>

      </View>
    </SafeAreaView>
  );*/
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

export default UserMenuScreen