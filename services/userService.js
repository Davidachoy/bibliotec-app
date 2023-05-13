import React from "react";
import { db } from "../database/firebase-config";
import { getDocs, collection, query, where } from "firebase/firestore";
const usuariosCollectionRef = collection(db, "usuarios");

const userService = {
  async signIn(email, password) {
    console.log(email);
    console.log(password);

    try {
      const q = query(
        usuariosCollectionRef,
        where("correo", "==", email),
        where("contraseña", "==", password),
        where("eliminado", "==", false)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Inicio de sesión fallido. Intente nuevamente");
        return { success: false };
      }

      const usuario = querySnapshot.docs[0].data();

      if (usuario.admin) {
        console.log("Inicio de sesión Administrador exitoso");
        return { success: true, isAdmin: true };
      } else {
        const { id, carnee, nombre, apellido } = usuario;
        console.log("Inicio de sesión Estudiante exitoso");
        return { success: true, isAdmin: false, id, carnee, nombre, apellido };
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      return { success: false };
    }
  },
  async signUp(
    nombre,
    apellido,
    segundoApellido,
    carnee,
    cedula,
    fechaNacimiento,
    correo,
    contraseña
  ) {},
};

export default userService;
