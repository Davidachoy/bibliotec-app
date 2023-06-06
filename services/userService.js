import React from "react";
import { db } from "../database/firebase-config";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import qrcode from "qrcode";
import emailjs from "emailjs-com";
const usuariosCollectionRef = collection(db, "usuarios");
const reservationsCollectionRef = collection(db, "reservaciones");
const cubiculosCollectionRef = collection(db, "cubiculos");

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
  async getStudents() {
    try {
      const q = query(
        usuariosCollectionRef,
        where("eliminado", "==", false),
        where("admin", "==", false)
      );
      const querySnapshot = await getDocs(q);
      const usuarios = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return usuarios;
    } catch (error) {
      console.error("Error al traer usuarios: ", error);
    }
  },
  async getUser(email, password) {
    try {
      var user = {};
      const data = await getDocs(usuariosCollectionRef);
      const usuarios = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((user) => !user.eliminado);
      for (let i in usuarios) {
        if (usuarios[i].correo == email && usuarios[i].contraseña == password) {
          user = {
            id: usuarios[i].id,
            nombre: usuarios[i].nombre,
            apellido1: usuarios[i].apellido,
            apellido2: usuarios[i].segundoApellido,
            carnee: usuarios[i].carnee,
          };
          break;
        }
      }
      return user;
    } catch (error) {
      console.error("Error al traer usuarios: ", error);
    }
  },
  async deleteStudent(id) {
    try {
      const usuaroDoc = doc(db, "usuarios", id);
      await updateDoc(usuaroDoc, { eliminado: true });
      return true;
    } catch (error) {
      console.error("Error al borrar usuario: ", error);
    }
  },

  async deleteReservation(id) {
    try {
      const usuaroDoc = doc(db, "reservaciones", id);
      await updateDoc(usuaroDoc, { activa: false });
      return true;
    } catch (error) {
      console.error("Error al borrar reservacion: ", error);
    }
  },

  async deleteCubiculo(id) {
    try {
      const usuaroDoc = doc(db, "cubiculos", id);
      await updateDoc(usuaroDoc, { eliminado: true });
      return true;
    } catch (error) {
      console.error("Error al borrar el cubiculo: ", error);
    }
  },

  async confirmReservation(id) {
    try {
      const usuaroDoc = doc(db, "reservaciones", id);
      await updateDoc(usuaroDoc, { confirmada: true });
      return true;
    } catch (error) {
      console.error("Error al confirmar reservacion: ", error);
    }
  },

  async sendEmail(
    qrcodeData,
    hora,
    horaFinal,
    cubiculo,
    fecha,
    nombre,
    correo
  ) {
    const emailParams = {
      to_name: nombre,
      qrimagen: qrcodeData,
      cliente: correo,
      hora: hora,
      horaFinal: horaFinal,
      cubiculo: cubiculo,
      fecha: fecha,
    };
    emailjs
      .send(
        "service_719vdkn",
        "template_6rmafow",
        emailParams,
        "NUDhBCc5PbaQ9mPz3"
      )
      .then(
        function (response) {
          console.log("SUCCESS", response);
        },
        function (error) {
          console.log("FAILED", error);
        }
      );
  },

  async getApartadosUser(student) {
    try {
      const data = await getDocs(reservationsCollectionRef);
      const apartados = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (apartado) =>
            apartado.activa &&
            !apartado.confirmada &&
            apartado.carnee == student
        );
      console.log(apartados);
      return apartados;
    } catch (error) {
      console.error("Error al buscar apartados de usuario: ", error);
      throw error;
    }
  },

  async getApartadosConfirmadosUser(student) {
    try {
      const data = await getDocs(reservationsCollectionRef);
      const apartados = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (apartado) =>
            apartado.activa && apartado.confirmada && apartado.carnee == student
        );
      console.log(apartados);
      return apartados;
    } catch (error) {
      console.error(
        "Error al buscar apartados confirmados de usuario: ",
        error
      );
      throw error;
    }
  },

  async getApartados() {
    try {
      const data = await getDocs(reservationsCollectionRef);
      const apartados = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((apartado) => apartado.activa && !apartado.confirmada);
      console.log(apartados);
      return apartados;
    } catch (error) {
      console.error("Error al buscar apartados de usuario: ", error);
      throw error;
    }
  },

  async getCubiculos() {
    try {
      const data = await getDocs(cubiculosCollectionRef);
      const cubiculos = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((cubiculos) => !cubiculos.eliminado);
      //console.log(cubiculos)
      return cubiculos;
    } catch (error) {
      console.error("Error al buscar los cubiculos: ", error);
      throw error;
    }
  },

  async getApartadosNumber(number) {
    try {
      const data = await getDocs(reservationsCollectionRef);
      const apartados = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (apartado) =>
            apartado.activa &&
            !apartado.confirmada &&
            apartado.cubiculo.includes(number)
        );
      console.log(apartados);
      return apartados;
    } catch (error) {
      console.error("Error al buscar apartados de usuario: ", error);
      throw error;
    }
  },
  async editStudent(studentData) {
    const { id, carnee, cedula, correo } = studentData;
    const email = "estudiantec.cr";
    const emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@" + email + "$");
    const datos = await getDocs(usuariosCollectionRef);
    const usuarios = datos.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const usuario = doc(db, "usuarios", id);

    if (!emailRegex.test(correo)) {
      alert("Solo se permiten correos con el dominio estudiantec.cr");
    } else {
      let error = false;
      for (let i in usuarios) {
        console.log(usuarios[i].id);
        console.log(id);

        if (
          (usuarios[i].correo == correo ||
            usuarios[i].cedula == cedula ||
            usuarios[i].carnee == carnee) &&
          usuarios[i].id != id
        ) {
          console.log("Conflicto con usuario: ", usuarios[i]);
          console.log(typeof usuarios[i]);

          console.log("mi usuario: ", id);
          console.log(typeof id);

          error = true;
        }
      }
      if (error) {
        alert(
          "Alguno de los siguientes datos coincide con los de otro usuario:\n-Correo Institucional\n-Carnee Estudiantil\n-Cedula"
        );
        return 0;
      } else {
        await updateDoc(usuario, studentData);
        return 1;
      }
    }
  },

  async updateCubiculo(cubiculeData) {
    const { id, numeroCubiculo, capacidad, disponible, maximoTiempoUso } =
      cubiculeData;
    const cubiculo = doc(db, "cubiculos", id);

    if (!/^\d+$/.test(numeroCubiculo)) {
      alert("El número de cubículo solo debe contener números.");
      return 0;
    }
    console.log(parseInt(maximoTiempoUso));
    if (!(parseInt(maximoTiempoUso) >= 0 && parseInt(maximoTiempoUso) <= 100)) {
      alert(
        "El maximo tiempo de uso de cubículo debe ser positivo y menor que 100."
      );
      return 0;
    }
    if (0 > numeroCubiculo) {
      alert("El número de cubículo  debe ser positivo.");
      return 0;
    }

    if (0 > capacidad) {
      alert("El número de capacidad debe de ser positivos.");
      return 0;
    }

    if (capacidad <= 0 || capacidad > 10) {
      alert("El número de capacidad mínimo es 1 y máximo 10.");
      return 0;
    }
    if (
      disponible !== "Disponible" &&
      disponible !== "Mantenimiento" &&
      disponible !== "Ocupado"
    ) {
      alert("El estado solo puede ser Disponible,Mantenimiento u Ocupado");
      return 0;
    }

    if (numeroCubiculo == null || "") {
      alert("El campo de número de cubículo no puede estar vacío");
      return 0;
    } else {
      const cubiculo = doc(db, "cubiculos", id);
      await updateDoc(cubiculo, cubiculeData);
      console.log("cubiculo data");
      console.log(cubiculeData);
      console.log("ID:" + id);
      return 1;
    }
  },
};
export default userService;
