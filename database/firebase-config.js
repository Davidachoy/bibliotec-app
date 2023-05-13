import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUHP2xZvPot6i2BbqSQ0GSWhkbXanwdiE",
    authDomain: "bibliotec-82bbd.firebaseapp.com",
    projectId: "bibliotec-82bbd",
    storageBucket: "bibliotec-82bbd.appspot.com",
    messagingSenderId: "320535906573",
    appId: "1:320535906573:web:0d3c304f3f87324b0b0844",
    measurementId: "G-R7EZKK5TXX"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);