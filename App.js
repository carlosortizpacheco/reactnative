import React, { useEffect } from 'react';
import {YellowBox} from "react-native"
import { StyleSheet, Text, View } from 'react-native';
import {firebaseApp} from "./app/utils/firebase"
import * as firebase from "firebase"
import Navigation from "./navigations/Navigation"

YellowBox.ignoreWarnings(["Setting a timer"])

export default function App() {

  useEffect( _=> {
    firebase.auth().onAuthStateChanged( user => {
      console.log(user)
    })
  },[])

  return (
    <Navigation/>
  )
}
