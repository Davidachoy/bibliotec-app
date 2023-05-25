import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, NativeBaseProvider } from "native-base";
import {DatePicker} from 'react-native-datepicker';

const reserveScreen = ({ navigation }) => {
    /*const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [usuarios, setUsuarios] = useState([]);*/

    const [capacidad, setCapacidad] = useState("");
    const [serviciosEspeciales, setServicios] = ("");  

    return (
    <NativeBaseProvider>  
      <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Reservar Cubículo</Text>
            
            <TextInput
                onChangeText={setCapacidad}
                style={styles.input}
                placeholder="Capacidad"
                value={capacidad}
            />
            <TextInput
                style={styles.input}
                placeholder="Servicios Especiales"
                secureTextEntry
                onChangeText={setServicios}
                value={serviciosEspeciales}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      </NativeBaseProvider>
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

  export default reserveScreen