import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyD3xxN1cgs5ZH2ZSyGh5fY3dFf6fhboJS4",
  authDomain: "tenedores-a06da.firebaseapp.com",
  databaseURL: "https://tenedores-a06da.firebaseio.com",
  projectId: "tenedores-a06da",
  storageBucket: "tenedores-a06da.appspot.com",
  messagingSenderId: "795973904206",
  appId: "1:795973904206:web:4239bd622fb9793f16a01f"
}


export const firebaseApp = firebase.initializeApp(firebaseConfig);