import React, { useState } from "react"
import {StyleSheet,View} from "react-native"
import * as firebase from "firebase"
import {Input, Button} from "react-native-elements"
import {validateEmail} from "../../utils/validations"
import {reauthenticate} from "../../utils/api"

export default function ChangeEmailForm(){
  const {email,setShowModal,toastRef,setReloadUserInfo} = props
  const [formData,setFormData]= useState(defaultValue())
  const [showPassword,setShowPassword] = useState(false)
  const [error,setError] = useState({})
  const [isLoading,setIsLoading] = useState(false)

  const onChange = (e,name) => setFormData({...formData,[name]:e.nativeEvent.text})
  

  const onSubmit = _=> {
    setError({})
    if( !formData.email || email === formData.password) {
      setError({"el email no ha cambiado"})
    } else if (!validateEmail(formData.email)) {
      setError({email:"email incorrecto"})
    } else if (!formData.password) {
      setError({password:"contraseña no puede estar vacia"})
    } else {
      setIsLoading(true)
      console.log("OK")
      reauthenticate(formData.password)
        .then(s=>{
          firebase.auth().currentUser.updateEmail(formData.email)
            .then(_=>{
              setIsLoading(false)
              setReloadUserInfo(true)
              toastRef.current.show("email actualizado correctamente")
              setShowModal(false)
            })
            .catch(()=>{
              setError({error:"error al actualizar email"})
            })
          console.log(s)
        })
        .catch(e=>{
          setIsLoading(false)
          setError({password:"contraseña no correcta"})
          console.log(e)
        })
    }
    console.log("formulario enviado")
  }
  
  return(
    <View style={styles.view}>
      <Input
      onChange={e=>onChange(e,"email")}
      placeholder="correoelectronico"
      containerStyle={styles.input}
      defaultValue={email}
      errorMessage={error.email}
      rightIcon={{
        type:"material-community",
        name:"at",
        color:"#c2c2c2"
      }}
      />
      <Input
      onChange={e=>onChange(e,"password")}
      placeholder="contraseña"
      containerStyle={styles.input}
      password 
      secureTextEntry = { showPassword ? false : true }
      errorMessage = {error.password}
      rightIcon={{
        type:"material-community",
        name: showPassword ? "eye-off-outline" : "eye-outline",
        color:"#c2c2c2",
        onPress= _=> setShowPassword(!showPassword)
      }}
      />
      <Button
      onPress={onSubmit}
      title="cambiar email"
      containerStyle={styles.btnContainer}
      buttonStyle={styles.btn}
      loading={isLoading}
      />
    </View>
  )
}


function defaultValue(){
  return {
    email:"",
    password:""
  }
}

const styles= StyleSheet.create({
  view:{
    alignItems:"center",
    paddingBottom:10,
    paddingTop:10
  },
  input:{
    marginBottom:10
  },
  btnContainer:{
    marginTop:20,
    width:"95%"
  },
  btn:{
    backgroundColor:"#00a680"
  }
})