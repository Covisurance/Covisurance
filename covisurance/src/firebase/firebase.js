import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyDlWBJxDBtvNwnxpTlCF4fNJmzdObGoV-E",
    authDomain: "covisurance.firebaseapp.com",
    databaseURL: "https://covisurance-default-rtdb.firebaseio.com",
    projectId: "covisurance",
    storageBucket: "covisurance.appspot.com",
    messagingSenderId: "899802696676",
    appId: "1:899802696676:web:fb8e0f4223c064d22cd5f1",
    measurementId: "G-VMSK2QW51H"
};


if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db1 = firebase.firestore();
const db = firebase.database();
const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, db1, auth, facebookProvider };
