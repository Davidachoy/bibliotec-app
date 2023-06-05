import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { db } from "../database/firebase-config";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

import userService from "../services/userService";

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [carnee, setCarnee] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const email = "estudiantec.cr";
  const emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@" + email + "$");
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$"
  );
  const usuariosCollectionRef = collection(db, "usuarios");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const checkEmails = async (email) => {
    const querySnapshot = await getDocs(
      query(collection(db, "usuarios"), where("correo", "==", email))
    );
    return !querySnapshot.empty;
  };

  const checkCarnee = async (carnee) => {
    const querySnapshot = await getDocs(
      query(collection(db, "usuarios"), where("carnee", "==", carnee))
    );
    return !querySnapshot.empty;
  };

  const checkCedula = async (cedula) => {
    const querySnapshot = await getDocs(
      query(collection(db, "usuarios"), where("cedula", "==", cedula))
    );
    return !querySnapshot.empty;
  };

  const handleRegister = async () => {
    if (
      !nombre ||
      !apellido ||
      !segundoApellido ||
      !carnee ||
      !cedula ||
      !fechaNacimiento ||
      !correo ||
      !contraseña
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }
    const repeatedEmail = await checkEmails(correo);
    const repeatedCarnee = await checkCarnee(carnee);
    const repeatedCedula = await checkCedula(cedula);

    if (!emailRegex.test(correo)) {
      alert("Solo se permiten correos con el dominio estudiantec.cr");
    } else if (!passwordRegex.test(contraseña)) {
      alert(
        "La constraseña no cumple con el formato solicitado, debe tener un mínimo de 8 carácteres, una mayúscula y minúscula y un carácter especial #?!@$%^&*-_"
      );
    } else if (repeatedEmail) {
      alert("Ya existe una cuenta con ese correo registrada");
    } else if (repeatedCarnee) {
      alert("Ya existe este carnee");
    } else if (repeatedCedula) {
      alert("Ya existe esta cedula");
    } else {
      await addDoc(usuariosCollectionRef, {
        nombre: nombre,
        apellido: apellido,
        segundoApellido: segundoApellido,
        carnee: carnee,
        cedula: cedula,
        fechaNacimiento: fechaNacimiento,
        correo: correo,
        admin: false,
        eliminado: false,
        estado: "Activo",
        contraseña: contraseña,
      });
      navigation.navigate("Login");
    }
  };
  const handleReturn = () => {
    navigation.navigate("Login");
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePicker(false);
    setFechaNacimiento(currentDate.toISOString().split("T")[0]);
  };

  const DateInput = () => {
    return (
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text style={styles.dateInputText}>
          {fechaNacimiento
            ? `Fecha de nacimiento: ${fechaNacimiento}`
            : "Seleccionar fecha de nacimiento"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={setApellido}
          value={apellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Segundo Apellido"
          onChangeText={setSegundoApellido}
          value={segundoApellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Carné"
          onChangeText={setCarnee}
          value={carnee}
        />
        <TextInput
          style={styles.input}
          placeholder="Cédula"
          onChangeText={setCedula}
          value={cedula}
        />
        <DateInput />
        {showDatePicker && (
          <DateTimePicker
            value={new Date(fechaNacimiento || Date.now())}
            mode="date"
            display="default"
            onChange={handleDateChange}
            style={{ alignSelf: "center", marginBottom: 10 }}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={setCorreo}
          value={correo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={setContraseña}
          value={contraseña}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReturn}>
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
    marginBottom: 20,
    alignSelf: "center",
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
  error: {
    color: "red",
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  dateInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  dateInputText: {
    color: "black",
  },
});

export default RegisterScreen;
