import React, { useState, useCallback } from "react";
import { parse, format } from "date-fns";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../database/firebase-config";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import userService from "../../services/userService";

function BlockCubicule({ route, navigation }) {
  const { cubiculeData } = route.params;
  const [bloqueos, setBloqueos] = useState([]);
  const coleccionBloqueos = collection(db, "horarioBloqueos");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerFin, setShowDatePickerFin] = useState(false);

  const [fechaIni, setFechaIni] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [hhInicio, sethhInicio] = useState("");
  const [mmInicio, setmmInicio] = useState("");

  const [newFechaIni, setNewFechaIni] = useState("");
  const [newFechaFin, setNewFechaFin] = useState("");

  const x = hhInicio + ":" + mmInicio;

  const [hhFinal, sethhFinal] = useState("");
  const [mmFinal, setmmFinal] = useState("");

  const y = hhFinal + ":" + mmFinal;

  const DateInput = () => {
    return (
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text style={styles.dateInputText}>
          {fechaIni
            ? `Inicio del bloque: ${fechaIni.toLocaleDateString()}`
            : "Seleccionar fecha de inicio de bloqueo"}
        </Text>
      </TouchableOpacity>
    );
  };
  function convertDateFormat(input) {
    // Parsea la fecha
    const date = parse(input, "M/d/yyyy", new Date());

    // Formatea la fecha en el nuevo formato
    const formattedDate = format(date, "yyyy-MM-dd");

    return formattedDate;
  }

  const DateInputFin = () => {
    return (
      <TouchableOpacity
        onPress={() => setShowDatePickerFin(true)}
        style={styles.dateInput}
      >
        <Text style={styles.dateInputText}>
          {fechaFin
            ? `Final del bloque: ${fechaFin.toLocaleDateString()}`
            : "Seleccionar fecha de final de bloqueo"}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(fechaIni);
    setShowDatePicker(false);
    setFechaIni(currentDate);
  };

  const handleDateChangeFin = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(fechaFin);
    setShowDatePickerFin(false);
    setFechaFin(currentDate);
  };
  const bloquearCubiculo = async () => {
    const coleccionBloqueos = collection(db, "horarioBloqueos");
    const datos = await getDocs(coleccionBloqueos);
    const bloqueos = datos.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const fechaINI = convertDateFormat(fechaIni.toLocaleDateString());
    const fechaFIN = convertDateFormat(fechaFin.toLocaleDateString());

    let error = false;

    const newHoraInicio = hhInicio + ":" + mmInicio;
    const newHoraFinal = hhFinal + ":" + mmFinal;

    const isoString_start = fechaINI + "T" + newHoraInicio + ":00";
    const isoString_end = fechaFIN + "T" + newHoraFinal + ":00";

    const timestamp_start = new Date(isoString_start);
    const timestamp_end = new Date(isoString_end);

    const timestampGT_start = timestamp_start.getTime();
    const timestampGT_end = timestamp_end.getTime();

    const horaInicio_aux = Timestamp.fromMillis(timestampGT_start);
    const horaFinal_aux = Timestamp.fromMillis(timestampGT_end);
    console.log("---------------------------------");
    console.log("brr");
    console.log(horaInicio_aux);
    console.log(horaFinal_aux);
    console.log("brr");

    for (let i in bloqueos) {
      console.log(bloqueos[i].fechaInicio);
      if (bloqueos[i].cubiculo == cubiculeData.numeroCubiculo) {
        if (
          (horaInicio_aux >= bloqueos[i].fechaInicio &&
            horaInicio_aux <= bloqueos[i].fechaFin) ||
          (horaFinal_aux >= bloqueos[i].fechaInicio &&
            horaFinal_aux <= bloqueos[i].fechaFin) ||
          (horaInicio_aux <= bloqueos[i].fechaInicio &&
            horaFinal_aux >= bloqueos[i].fechaFin)
        ) {
          console.log("entro al error");
          error = true;
        }
      }
    }
    if (error == true) {
      alert("Hubo un choque con las fechas ingresadas");
    } else {
      const data = {
        fechaInicio: horaInicio_aux,
        fechaFin: horaFinal_aux,
        cubiculo: cubiculeData.numeroCubiculo,
      };
      addDoc(coleccionBloqueos, data);
      alert("El bloqueo fue registrado con éxito");
      navigation.navigate("TimeUsageManager");
    }
  };

  const getBloqueos = async () => {
    const data = await getDocs(coleccionBloqueos);
    const bloqueos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBloqueos(bloqueos);
  };

  useFocusEffect(
    useCallback(() => {
      getBloqueos();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Bloquear cubiculo#{cubiculeData.numeroCubiculo}
        </Text>

        <DateInput />
        {showDatePicker && (
          <DateTimePicker
            value={new Date(fechaIni || Date.now())}
            mode="date"
            display="default"
            onChange={handleDateChange}
            style={{ alignSelf: "center", marginBottom: 10 }}
          />
        )}

        <Text style={styles.label}>Hora Inicio:</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
              marginRight: 20,
            }}
            value={hhInicio}
            keyboardType="numeric"
            placeholder="Digite horas"
            maxLength={2} // Limit the input to 2 characters (hh)
            onChangeText={(text) => sethhInicio(text)}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
            }}
            value={mmInicio}
            keyboardType="numeric"
            placeholder="Digite minutos"
            maxLength={2} // Limit the input to 2 characters (mm)
            onChangeText={(text) => setmmInicio(text)}
          />
        </View>

        <DateInputFin />
        {showDatePickerFin && (
          <DateTimePicker
            value={new Date(fechaFin || Date.now())}
            mode="date"
            display="default"
            onChange={handleDateChangeFin}
            style={{ alignSelf: "center", marginBottom: 10 }}
          />
        )}

        <Text style={styles.label}>Hora Final:</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
              marginRight: 20,
            }}
            value={hhFinal}
            keyboardType="numeric"
            placeholder="Digite horas"
            maxLength={2} // Limit the input to 2 characters (hh)
            onChangeText={(text) => sethhFinal(text)}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
            }}
            value={mmFinal}
            keyboardType="numeric"
            placeholder="Digite minutos"
            maxLength={2} // Limit the input to 2 characters (mm)
            onChangeText={(text) => setmmFinal(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            bloquearCubiculo();
          }}
        >
          <Text style={styles.buttonText}>Guardar</Text>
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

export default BlockCubicule;

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
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
});
