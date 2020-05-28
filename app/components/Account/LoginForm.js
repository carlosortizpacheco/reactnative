import React, { useState } from "react"
import {StyleSheet,View} from "react-native"
import {Input,Icon,Button} from "react-native-elements"
import {isEmpty, size} from "lodash"
import {validateEmail} from "../../utils/validations"
import {useNavigation} from "@react-navigation/native"
import Loading from "../Loading"
import * as firebase from "firebase"

export default function LoginForm(props) {
  const {toastRef} = props
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState(defaultFormValue())
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()


  const onChange = (e,name) => {
    setFormData({...formData,[name]:e.nativeEvent.text})
  }

  const onSubmit = () => {
    console.log("wow")
    if(isEmpty(formData.email)||isEmpty(formData.password)) {
      console.log("datosvacios")
      toastRef.current.show("Campos vacios")
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Formato de email incorrecto")
    } else if (size(formData.password)<6) {
      toastRef.current.show("password debe ser mayor a 6 caracteres")
    } else {
      setLoading(true)
      firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
      .then( s => {
        console.log(s)
        setLoading(false)
        navigation.navigate("account")
      })
      .catch(e=>{
        setLoading(false)
        console.log(e)
        toastRef.current.show("usuario y/o contraseña invalido")
      })
    }
  }




  return (
    <View styles={styles.formContainer}>
      <Input
      onChange={(e)=>onChange(e,"email")}
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
      onChange={e=>onChange(e,"password")}
      placeholder="contraseña"
      containerStyle={styles.inputForm}
      password
      secureTextEntry={showPassword ? false : true}
      rightIcon={
        <Icon
        onPress={()=>setShowPassword(!showPassword)}
        type="material-community"
        name={showPassword ?  "eye-off-outline" : "eye-outline"}
        iconStyle={styles.iconRight}
        />
      }
      />
      <Button
      onPress={onSubmit}
      title="Iniciar Sesion"
      containerStyle={styles.btnContainerLogin}
      buttonStyle={styles.btnLogin}
      />
      <Loading isVisible={loading} text="Iniciando Sesion"/>
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
  btnContainerLogin:{
    marginTop:20,
    width:"95%"
  },
  btnLogin:{
    backgroundColor:"#00a680"  
  },
  iconRight:{
    color:"#c1c1c1"
  }
})