import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import userService from "../../services/userService";

function StudentEditScreen({ route, navigation }) {
  const { studenData } = route.params;
  const [nombre, setNombre] = useState(studenData.nombre);
  const [apellido, setApellido] = useState(studenData.apellido);
  const [segundoApellido, setSegundoApellido] = useState(
    studenData.segundoApellido
  );
  const [carnee, setCarnee] = useState(studenData.carnee);
  const [cedula, setCedula] = useState(studenData.cedula);
  const [fechaNacimiento, setFechaNacimiento] = useState(
    studenData.fechaNacimiento
  );
  const [correo, setCorreo] = useState(studenData.correo);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [estado, setEstado] = useState(studenData.estado);

  console.log(studenData);
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(fechaNacimiento);
    setShowDatePicker(false);
    setFechaNacimiento(currentDate.toISOString().split("T")[0]);
  };

  const update = async () => {
    const data = {
      id: studenData.id,
      nombre: nombre,
      apellido: apellido,
      segundoApellido: segundoApellido,
      carnee: carnee,
      cedula: cedula,
      fechaNacimiento: fechaNacimiento,
      correo: correo,
      estado: estado,
    };
    const studentEdited = await userService.editStudent(data);
    if (studentEdited == 1) {
      navigation.navigate("StudentDetailScreen", { studenData: data });
    }
  };

  const handleEstadoChange = (newEstado) => {
    setEstado(newEstado);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Editar estudiante</Text>
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
        <View style={{ flexDirection: "row" }}>
          <View style={styles.radioContainer}>
            <Text style={styles.text}>Activo</Text>
            <RadioButton
              value="Activo"
              status={estado === "Activo" ? "checked" : "unchecked"}
              onPress={() => handleEstadoChange("Activo")}
            />
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.text}>Suspendido</Text>
            <RadioButton
              value="Suspendido"
              status={estado === "Suspendido" ? "checked" : "unchecked"}
              onPress={() => handleEstadoChange("Suspendido")}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            update();
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default StudentEditScreen;

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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
