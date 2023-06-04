import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, NativeBaseProvider } from "native-base";
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import style from "react-native-datepicker/style";

const reserveCubiculeScreen = ({ navigation }) => {
    /*const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [usuarios, setUsuarios] = useState([]);*/

    const [newFecha, setFecha] = useState("");
    const [searchInputCapacidad, setSearchInputCapacidad] = useState("");
    const [searchInputSE, setSearchInputSE] = (""); 
    const [newHoraInicio, setHoraInicio] = useState(""); 
    const [newHoraFinal, setHoraFinal] = useState("");


    /*const {studentData, reservationData} = route.params;*/


    const [hhInicio, sethhInicio] = useState('');
    const [mmInicio, setmmInicio] = useState('');

    const x = hhInicio + ':' + mmInicio;
    console.log(x);


    const [hhFinal, sethhFinal] = useState('');
    const [mmFinal, setmmFinal] = useState('');

    const y = hhFinal + ':' + mmFinal;
    console.log(y);


    //console.log('fecha: ',newFecha, 'horas: ',newHoraInicio, ' ',newHoraFinal);
    


    return (
    <NativeBaseProvider>  
      <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Reservar Cubículo</Text>

            <DatePicker 
              style={{ width: 200, marginBottom: 10 }}
              date={newFecha}
              mode="date"
              placeholder="Seleccionar fecha"
              format="YYYY-MM-DD"
              minDate="2020-01-01"
              maxDate="2023-12-31"
              onDateChange={date => setFecha(date)}
            />
            

            <TextInput
                onChangeText={setSearchInputCapacidad}
                style={styles.searchInput}
                placeholder="Capacidad"
                value={searchInputCapacidad}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Servicios Especiales"
                onChangeText={setSearchInputSE}
                value={searchInputSE}
            />

            <Text style={styles.label}>Hora Inicio:</Text>
            <View style={{flexDirection: 'row',alignItems: 'center', marginBottom: 10}}>
              <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8, marginRight: 20}}
                      value={hhInicio}
                      placeholder="Digite horas"
                      maxLength={2} // Limit the input to 2 characters (hh)
                      onChangeText={text => sethhInicio(text)}
              />
              <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8}}
                      value={mmInicio}
                      placeholder="Digite minutos"
                      maxLength={2} // Limit the input to 2 characters (mm)
                      onChangeText={text => setmmInicio(text)}
              />
            </View>


            <Text style={styles.label}>Hora Final:</Text>
            <View style={{flexDirection: 'row',alignItems: 'center', marginBottom: 10}}>
              <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8, marginRight: 20}}
                      value={hhFinal}
                      placeholder="Digite horas"
                      maxLength={2} // Limit the input to 2 characters (hh)
                      onChangeText={text => sethhFinal(text)}
              />
              <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8}}
                      value={mmFinal}
                      placeholder="Digite minutos"
                      maxLength={2} // Limit the input to 2 characters (mm)
                      onChangeText={text => setmmFinal(text)}
              />
            </View>
            


            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Volver</Text>
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
    searchInput: {
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 5,
      padding: 8,
      marginBottom: 10,
    },
    label: {
      fontSize: 18,
      marginBottom: 20,
    },
  });

  export default reserveCubiculeScreen



  /*
  
  const handleHoraInicio = (hora) => {
      if(hora.target.value !== undefined){
        setHoraInicio(hora.target.value);
        setShowPicker(false);
      }
    };

    const handleHoraFinal = (hora) => {
      if(hora.target.value !== undefined){
        setHoraFinal(hora.target.value);
        setShowPicker(false);
      }
    };
  
  
  
  
  <View>
              <Button style={styles.button} title="Hora Inicio" onPress={ShowTimePickerInicio} />
              {showPicker && (
                <DateTimePicker 
                  value={new Date()}
                  mode="time" // Set the mode to 'time' for time picking
                  display="default"
                  onChange={handleHoraInicio}
                />
              )}
            </View>

            <View>
              <Button style={styles.button} title="Hora Final" onPress={ShowTimePickerFinal} />
              {showPicker && (
                <DateTimePicker 
                  value={new Date()}
                  mode="time" // Set the mode to 'time' for time picking
                  display="default"
                  onChange={handleHoraFinal}
                />
              )}
            </View>*/