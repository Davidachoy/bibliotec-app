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
import QRCode from 'react-native-qrcode-svg';
import { encode as base64Encode } from 'base-64';

const userReservationInfoScreen = ({ route, navigation }) => {
  const { studentData, reservationData } = route.params;
  console.log(studentData);
  console.log(reservationData);
  const [qrContent, setQrContent] = useState('');

  
  const handleButtonPress = (route, params) => {
    navigation.navigate(route, { ...params });
  };

  const cancelReservation = async () =>{
    userService.deleteReservation(reservationData.id);
    navigation.navigate("UserReservationScreen", {studentData: studentData});
  };

  const callEmail = async (qrcodeData,hora,horaFinal,cubiculo,fecha) =>{
    console.log('enviando');
    userService.sendEmail(qrcodeData,hora,horaFinal,cubiculo,fecha,studentData.nombre,studentData.correo);
    navigation.navigate("UserReservationScreen", {studentData: studentData});
  };


  const callConfirm = async () =>{
    userService.confirmReservation(reservationData.id);
    const data = `ID de reserva: ${reservationData.id}\nFecha: ${((reservationData.hora).toDate()).toLocaleDateString()}\nHora de Inicio: ${((reservationData.hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}\nHora de Fin: ${((reservationData.horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}\nCarnee: ${reservationData.carnee}`;
    console.log('datos creados');

    const qrCodeSize = 200; // Adjust the size of the QR code as needed

    const qrCodeSvg = (
      <QRCode
        value={data}
        backgroundColor='#FFFFFF'
        color='#000000'
        size={qrCodeSize}
      />
    );

    //const qrCodeUrl = await QRCode.toDataURL(data);
    console.log('qr creado');
    setQrContent(qrCodeSvg);
    var hora = ((reservationData.hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })
    var horaFinal= ((reservationData.horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })
    var cubiculo = reservationData.cubiculo
    var fecha = ((reservationData.hora).toDate()).toLocaleDateString()
    callEmail(qrCodeSvg,hora,horaFinal,cubiculo,fecha);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textBold}>
          Cubículo:<Text style={styles.text}> {reservationData.cubiculo}</Text>
        </Text>
        <Text style={styles.textBold}>
          Fecha:<Text style={styles.text}> {((reservationData.hora).toDate()).toLocaleDateString()}</Text>
        </Text>
        <Text style={styles.textBold}>
          Inicio: <Text style={styles.text}>{((reservationData.hora).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </Text>
        <Text style={styles.textBold}>
          Fin: <Text style={styles.text}>{((reservationData.horaFinal).toDate()).toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => callConfirm()}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => cancelReservation()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("UserReservationScreen", {studentData: studentData})}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default userReservationInfoScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "normal",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  bottonView: {
    marginTop: 20,
  },
});
