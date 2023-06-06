import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, NativeBaseProvider } from "native-base";
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  Timestamp
} from "firebase/firestore";
import { db } from "../../database/firebase-config";
import userService from "../../services/userService";

const reserveCubiculeScreen = ({ route, navigation }) => {
    
    const [cubiculos, setCubiculos] = useState([]);
    const cubiculosCollectionRef = collection(db, "cubiculos");
    const [reservaciones, setReservaciones] = useState([]);
    const reservacionesCollectionRef = collection(db, "reservaciones");
    const [bloqueos, setBloqueos] = useState([]);
    const coleccionBloqueos = collection(db, "horarioBloqueos");

    const {studentData} = route.params;
    const id = studentData.id;
    const carnee = studentData.carnee;
    const nombre = studentData.nombre;
    const apellido = studentData.apellido1;
    console.log(carnee, nombre, apellido);
    const nombreEstudiante= nombre+" "+apellido;


    const [newFecha, setFecha] = useState(new Date());
    const [searchInputCapacidad, setSearchInputCapacidad] = useState("");
    const [searchInputSE, setSearchInputSE] = useState(""); 
    

    const [hhInicio, sethhInicio] = useState('');
    const [mmInicio, setmmInicio] = useState('');

    const x = hhInicio + ':' + mmInicio;
    console.log(x);


    const [hhFinal, sethhFinal] = useState('');
    const [mmFinal, setmmFinal] = useState('');

    const y = hhFinal + ':' + mmFinal;
    console.log(y);


    const Item = ({id,cubiculo, capacidad, servEspeciales, onPress }) => (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={styles.itemText}>#: {cubiculo}</Text>
        <Text style={styles.itemText}>Capacidad: {capacidad} </Text>
        <Text style={styles.itemText}>S.E: {servEspeciales} </Text>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item
        cubiculo={item.numeroCubiculo}
        capacidad={item.capacidad}
        servEspeciales={item.tipo}
        onPress={() => ApartarCubiculo(item.numeroCubiculo)}
      />
    );

    const getCubiculos = async() => {
      const data = await getDocs(cubiculosCollectionRef);
      const cubiculos = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((cubiculos) => !cubiculos.eliminado);
      setCubiculos(cubiculos);
    };

    useFocusEffect(
      useCallback(() =>{
        getCubiculos();
        return () => {};
        
      },[])
    );

    const getReservaciones = async () => {
      const data = await getDocs(reservacionesCollectionRef);
      const reservaciones = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (reservacion) =>
            reservacion.activa
        );
      setReservaciones(reservaciones);
    };

    useFocusEffect(
      useCallback(() =>{
        getReservaciones();
        return () => {};
      },[])
    );

    const getBloqueos = async () => {
      const data = await getDocs(coleccionBloqueos);
      const bloqueos = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));
      setBloqueos(bloqueos);
    };

    useFocusEffect(
      useCallback(() =>{
        getBloqueos();
        return () => {};
      },[])
    );


    const handleChangeCapacidad = async (e) => {
    
      if (e === "") {
        const data = await getDocs(cubiculosCollectionRef);
        const cubiculos = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((cubiculos) => cubiculos.capacidad && !cubiculos.eliminado);
        setCubiculos(cubiculos);
      } else {
        const data = await getDocs(cubiculosCollectionRef);
        const cubiculos = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (cubiculos) =>
            cubiculos.disponible &&
            cubiculos.capacidad.toString().includes(e) &&
            !cubiculos.eliminado
          );
          setCubiculos(cubiculos);
      }
    };

    useFocusEffect(
      useCallback(() => {
      handleChangeCapacidad(searchInputCapacidad);
        return () => {};
      }, [searchInputCapacidad])
    );


    const handleChangeServiciosEspeciales = async (e) => {
      if (e === "") {
        const data = await getDocs(cubiculosCollectionRef);
        const cubiculos = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((cubiculos) => cubiculos.tipo && !cubiculos.eliminado);
        setCubiculos(cubiculos);
      } else {
        const data = await getDocs(cubiculosCollectionRef);
        const cubiculos = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (cubiculos) =>
            cubiculos.disponible &&
            cubiculos.tipo.toString().includes(e) &&
            !cubiculos.eliminado
          );
          setCubiculos(cubiculos);
      }
    };

    useFocusEffect(
      useCallback(() => {
        handleChangeServiciosEspeciales(searchInputSE);
        return () => {};
      }, [searchInputSE])
    );


    function ApartarCubiculo(numeroCubiculo){

      const reservacionesCollectionRef = collection(db, "reservaciones");

      // Obtener valor timestamp
      const newHoraInicio = hhInicio + ':' + mmInicio;
      const newHoraFinal = hhFinal + ':' + mmFinal;
      const isoString_start = newFecha + 'T' + newHoraInicio + ':00';
      const isoString_end = newFecha + 'T' + newHoraFinal + ':00';
      const timestamp_start = new Date(isoString_start);
      const timestamp_end = new Date(isoString_end);
      const timestampMs_start = timestamp_start.getTime();
      const timestampMs_end = timestamp_end.getTime();
      const difference = (timestampMs_end) - (timestampMs_start);
      const hours = Math.floor(difference / 3600000);
      console.log(hours);
      //Estos son los valores timestamp de las horas
      const horaInicio_aux= Timestamp.fromMillis(timestampMs_start);
      const horaFinal_aux= Timestamp.fromMillis(timestampMs_end);  

      let flag = false;
      if(newFecha == "" || hhInicio == "" || mmInicio == "" || hhFinal == "" || mmFinal == ""){
        flag = true;
      }

      let choque = false;
      let maximoUso = false;
      for(let i in reservaciones){
        if(reservaciones[i].cubiculo == numeroCubiculo){

          // Validar que no haya choque de input de horas con horarios existentes
          if((horaInicio_aux >= reservaciones[i].hora && horaInicio_aux <= reservaciones[i].horaFinal) ||
            (horaFinal_aux >= reservaciones[i].hora && horaFinal_aux <= reservaciones[i].horaFinal) || 
            (horaInicio_aux <= reservaciones[i].hora && horaFinal_aux >= reservaciones[i].horaFinal)){
              choque = true;
            } 
        }
      };
      for(let i in cubiculos){
        if(cubiculos[i].numeroCubiculo==numeroCubiculo){
          console.log(cubiculos[i].maximoTiempoUso);
          if(hours>cubiculos[i].maximoTiempoUso && cubiculos[i].maximoTiempoUso>0){
            maximoUso = true;
          }
        }
      };
      for(let i in bloqueos){
        if(bloqueos[i].cubiculo == numeroCubiculo){
          // Validar que no haya choque de input de horas con horarios existentes
          if((horaInicio_aux >= bloqueos[i].fechaInicio && horaInicio_aux <= bloqueos[i].fechaFin) ||
            (horaFinal_aux >= bloqueos[i].fechaInicio && horaFinal_aux <= bloqueos[i].fechaFin) || 
            (horaInicio_aux <= bloqueos[i].fechaInicio && horaFinal_aux >= bloqueos[i].fechaFin)){
              choque = true;
            }
            
        }
      };
      if(flag == true){
        alert('Debe ingresar una fecha, hora inicio y hora final, no pueden estar vacios');
      }
      else{
        if (choque==true || maximoUso==true) {
          if(maximoUso==true){
            alert("Su reservación sobrepasa la cantidad máxima de horas permitidas establecida.")
          }
          else{
            alert("Este horario NO está disponible para este cubículo.")
          }
        }
        else{
          const activaFlag = true;
          const confirmadaFlag = false;
          const data = {
              activa: activaFlag,
              carnee: carnee,
              confirmada: confirmadaFlag,
              cubiculo: numeroCubiculo,
              estudiante: nombreEstudiante,
              fecha: newFecha,
              hora: horaInicio_aux,
              horaFinal: horaFinal_aux,
          };
          alert("Reservacion realizada exitosamente")
          addDoc(reservacionesCollectionRef, data);
        }
        navigation.navigate("UserMenuScreen", {studentData: studentData})
      }
    };


    const handleButtonVolver = (route, params) => {
      navigation.navigate(route, { ...params });
    };


    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event, date) => {
      setShowPicker(false);
      if (date !== undefined) {
        setFecha(date);
        console.log(newFecha.toISOString().split('T')[0].replace(/-/g, '/'));
      }
    };

    const showDatePicker = () => {
      setShowPicker(true);
    };
    
/*<DateTimePicker 
              style={{ width: 200, marginBottom: 10 }}
              date={newFecha.toISOString()}
              mode="date"
              placeholder="Seleccionar fecha"
              format="YYYY-MM-DD"
              minDate="2020-01-01"
              maxDate="2023-12-31"
              onDateChange={date => setFecha(date)}
            /> */
            

    return (
    <NativeBaseProvider>  
      <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Reservar Cubículo</Text>

            <Button style={styles.button} title="Open Date Picker" onPress={showDatePicker} />
            {showPicker && (
              <DateTimePicker
                value={newFecha}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            

            <TextInput
                onChangeText={text => setSearchInputCapacidad(text)}
                style={styles.searchInput}
                placeholder="Filtrar por Capacidad"
                value={searchInputCapacidad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Filtrar por Servicios Especiales"
                onChangeText={text => setSearchInputSE(text)}
                value={searchInputSE}
                keyboardType="numeric"
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

            
            <FlatList
              data={cubiculos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />


            <TouchableOpacity style={styles.button} onPress={() => handleButtonVolver("UserMenuScreen", { studentData: studentData })}>
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
      color: "white"
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
  });

  export default reserveCubiculeScreen