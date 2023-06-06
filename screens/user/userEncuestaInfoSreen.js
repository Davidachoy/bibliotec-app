import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import userService from "../../services/userService";
import { useFocusEffect } from "@react-navigation/native";
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

function UserEncuestaInfoScreen({ route, navigation }) {
    const [reservations, setReservations] = useState([]);
    const { studentData, reservationData } = route.params;
    const studentID = studentData.id;
    const carnee = studentData.carnee;
    const studentName = studentData.nombre;
    const studentLastName = studentData.apellido1;
    const student2NDLastName = studentData.apellido2;

    const cubiculo = reservationData.cubiculo;
  
    const [respuestas, setRespuestas] = useState(Array(5).fill(null));
    const [comentarios, setComentarios] = useState("");

    const handleRespuesta = (preguntaIndex, respuestaIndex) => {
        const newRespuestas = [...respuestas];
        newRespuestas[preguntaIndex] = respuestaIndex;
        setRespuestas(newRespuestas); 
    };

    const handleGuardar = () => {
        console.log('GUARDADO!', respuestas, comentarios);

        const encuestaCollectionRef = collection(db, "encuesta");
        const data = {
          carnee: carnee,
          comentario: comentarios,
          cubiculo: cubiculo,
          respuestas: respuestas
      };
      alert("Reservacion realizada exitosamente")
      addDoc(encuestaCollectionRef, data);
      navigation.navigate("UserMenuScreen", { studentData: studentData})
    };

    const handleVolver = () =>{
      navigation.navigate("UserMenuScreen", { studentData: studentData});
    };


    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>Cuestionario</Text>

          <Text>¿Cómo calificarías la disponibilidad de los cubículos?</Text>
          <TouchableOpacity onPress={() => handleRespuesta(0, 'A')}>
            <Text style={styles.buttonText}>A. Excelente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(0, 'B')}>
            <Text style={styles.buttonText}>B. Buena</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(0, 'C')}>
            <Text style={styles.buttonText}>C. Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(0, 'D')}>
            <Text style={styles.buttonText}>D. Mala</Text>
          </TouchableOpacity>
    
          <Text>¿Cómo calificarías la limpieza de los cubículos?</Text>
          <TouchableOpacity onPress={() => handleRespuesta(1, 'A')}>
            <Text style={styles.buttonText}>A. Excelente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(1, 'B')}>
            <Text style={styles.buttonText}>B. Buena</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(1, 'C')}>
            <Text style={styles.buttonText}>C. Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(1, 'D')}>
            <Text style={styles.buttonText}>D. Mala</Text>
          </TouchableOpacity>

          <Text>¿Cómo calificarías la comodidad de los cubículos?</Text>
          <TouchableOpacity onPress={() => handleRespuesta(2, 'A')}>
            <Text style={styles.buttonText}>A. Excelente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(2, 'B')}>
            <Text style={styles.buttonText}>B. Buena</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(2, 'C')}>
            <Text style={styles.buttonText}>C. Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(2, 'D')}>
            <Text style={styles.buttonText}>D. Mala</Text>
          </TouchableOpacity>

          <Text>¿Cómo calificarías la facilidad para reservar un cubículo?</Text>
          <TouchableOpacity onPress={() => handleRespuesta(3, 'A')}>
            <Text style={styles.buttonText}>A. Excelente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(3, 'B')}>
            <Text style={styles.buttonText}>B. Buena</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(3, 'C')}>
            <Text style={styles.buttonText}>C. Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(3, 'D')}>
            <Text style={styles.buttonText}>D. Mala</Text>
          </TouchableOpacity>

          <Text>¿Recomendarías los cubículos de la biblioteca a otros usuarios?</Text>
          <TouchableOpacity onPress={() => handleRespuesta(4, 'A')}>
            <Text style={styles.buttonText}>A. Excelente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(4, 'B')}>
            <Text style={styles.buttonText}>B. Buena</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(4, 'C')}>
            <Text style={styles.buttonText}>C. Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRespuesta(4, 'D')}>
            <Text style={styles.buttonText}>D. Mala</Text>
          </TouchableOpacity>

          <Text style={{marginTop:10, marginBottom: 10}}>¿Tienes algún comentario adicional o sugerencia para mejorar los cubículos de la biblioteca?</Text>
          <TextInput
                      value={comentarios}
                      placeholder="Comentarios o Sugerencias"
                      onChangeText={text => setComentarios(text)}
                      style={{marginBottom:10, color: 'blue'}}
              />
    
          <TouchableOpacity style={styles.button} onPress={handleGuardar}>
            <Text style={{color: 'white', fontSize: 18}}>Guardar respuestas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleVolver}>
            <Text style={{color: 'white', fontSize: 18}}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "100%",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        marginBottom: 10,
      },
      button: {
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
      },
      buttonText: {
        color: "blue",
        fontSize: 18,
      },
    
      addButton: {
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 1,
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
        fontSize: 18,
        alignSelf: "flex-start",
      },
      searchInput: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
      },
    });

export default UserEncuestaInfoScreen;