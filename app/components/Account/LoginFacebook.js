import React, { useState } from "react"
import {SocialIcon} from "react-native-elements"
import * as firebase from "firebase"
import * as Facebook from "expo-facebook"
import {FacebookApi} from "../../utils/social"
import {useNavigation} from "@react-navigation/native"
import Loading from "../Loading"


export default function LoginFacebook(props){
  const {toastRef} = props
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation()

  const login = async () => {
    await Facebook.initializeAsync(FacebookApi)
  
    const {type,token} = await Facebook.logInWithReadPermissionsAsync({
      permissions:FacebookApi.permissions
    })
  
    Console.log(result)

    if(type==="success"){
      setLoading(true)
      const credentials = firebase.auth().facebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credentials)
      .then(s=>{
        setLoading(false)
        navigation.navigate("account")
      })
      .catch(e=>{
        toastRef.current.show("credenciales incorrectas")
      })
    } else if(type==="cancel") {
      setLoading(false)
      toastRef.current.show("No se pudo acceder")
    } else {
      setLoading(false)
      toastRef.current.show("error desconodido intentelo mas tarde")
    }
    
  }
  
  return (
    <>
    <SocialIcon
    title="iniciar sesion con facebook"
    button
    type="facebook"
    onPress={login}
    />
    <Loading isVisible={loading} text="iniciando sesion"/>
    </>
  )
}