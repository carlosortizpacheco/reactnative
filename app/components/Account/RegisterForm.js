import React, { useState } from "react"
import {StyleSheet,View} from "react-native"
import {Input,Icon,Button} from "react-native-elements"
import {size,isEmpty} from "lodash"
import * as firebase from "firebase"
import {useNavigation} from "@react-navigation/native"
import Loading from "../Loading"
import {validateEmail} from "../../utils/validations"

export default function RegisterForm (props) {
  const {toastRef} = props
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [formData,setFormData]  = useState(defaultFormValue())
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation()

  const onChange = (e,name) => setFormData({...formData,[name]:e.nativeEvent.text})
  
  const onSubmit = () => {
    if(isEmpty(formData.email || formData.password || formData.repeatPassword)) {
      console.log("ERROR, CAMPOS VACIOS")
      toastRef.current.show("Todos los campos son obligatorios")
    } else if(!validateEmail(formData.email)) {
      console.log("email no valido")
      toastRef.current.show("Email incorrecto")
    } else if ( formData.repeatPassword !== formData.password) {
      console.log("contraseñas no iguales")
      toastRef.current.show("Contraseñas no son iguales")
    } else if(size(formData.password)<6){
      console.log(size(formData.password))
      console.log("contraseña menor a 6 caracteres")
      toastRef.current.show("contraseña debe de ser mayor a 6 caracteres")
    } else {
      setLoading(true)
      firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password)
        .then(s=>{
          setLoading(false)
          navigation.navigate("account")
        })
        .catch(e=>{
          setLoading(false)
          toastRef.current.show("usuairo registrado")
        })
    }
  }

  return (
    <View style={styles.formContainer}>
      <Input
      onChange={ e => onChange (e,"email")}
      name="email"
      placeholder="correo electronico"
      containerStyle={styles.inputForm}
      rightIcon={
        <Icon 
        type="material-community"
        name="at"
        iconStyle={styles.iconRight}
        />
      }
      />
      <Input
      onChange={ e => onChange (e,"password")}
      placeholder="Contraseña"
      containerStyle={styles.inputForm}
      password
      secureTextEntry={showPassword ? false : true}
      rightIcon={
        <Icon
        onPress={ _=> setShowPassword(!showPassword)}
        type="material-community"
        name={showPassword ?  "eye-off-outline" : "eye-outline"}
        iconStyle={styles.iconRight}
        />
      }
      />
      <Input
      onChange={ e => onChange (e,"repeatPassword")}
      placeholder="Repetir contraseña"
      containerStyle={styles.inputForm}
      password
      secureTextEntry={showRepeatPassword ? false : true}
      rightIcon={
        <Icon
        onPress={()=>setShowRepeatPassword(!showRepeatPassword)}
        type="material-community"
        name={showRepeatPassword ?  "eye-off-outline" : "eye-outline"}
        iconStyle={styles.iconRight}
        />
      }
      />
      <Button
       onPress={onSubmit}
      title="Unirse"
      containerStyle={styles.btnContainerRegister}
      buttonStyle={styles.btnRegister}
      />
      <Loading isVisible={loading} text="creando cuenta"/>
    </View>
  )
}

function defaultFormValue (){
  return {
    email:"",
    password:"",
    repeatPassword:""
  }
}


const styles = StyleSheet.create({
  formContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30
  },
  inputForm:{
     width:"100%",
     marginTop:20
  },
  btnContainerRegister:{
    marginTop:20,
    width:"100%"
  },
  btnRegister:{
    backgroundColor:"#00a680"
  },
  iconRight:{
    color:"#c1c1c1"
  }
})