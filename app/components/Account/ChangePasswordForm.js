import React, { useState } from "react"
import {StyleSheet,View,Text} from "react-native"
import {Input, Button} from "react-native-elements"
import {size} from "lodash"
import * as firebase from "firebase"
import {reauthenticate} from "../../utils/api"


export default function ChangePasswordForm(props) {
  const {setShowModal,toastRef} = props
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState(defaultValue())
  const [error,setError] = useState({})
  const [isLoading,setIsLoading] = useState(false)

  const onChange = (e,name) => {
    setFormData({...formData},[name]=e.nativeEvent.text)
 }


 const onSubmit = async () => {
  let isSetError = true
  let errorTemp = {} 
  setError({})

    if(!formData.password || !formData.newPassword || !formData.repeatNewPassword) {
      errorTemp = {
        password: !formData.password ? "contraseña no puede estar vacia" : "",
        newPassword: !formData.newPassword ? "contraseña no puede estar vacia": "",
        repeatNewPassword: !formData.repeatNewPassword ?"cotnraseña no puede estar vacia" : ""
      }
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorTemp = {
        newPassword :"las contraseñas no son iguales",
        repeatNewPassword : "las contraseñas no son iguales"
      }
    } else if (size(formData.newPassword)<6) {
      errorTemp = {
        newPassword:"contaseña no puede ser menos a 6 caracteres",
        repeatNewPassword: "contraseña no puede ser menor a 6 caracteres"
      }
    } else {
      setIsLoading(true)
      await reauthenticate(formData.password)
        .then( async () => { 
          await firebase.auth().currentUser.updatePassword(formData.newPassword)
          .then( () => {
            isSetError = false
            setIsLoading(false)
            setShowModal(false)
            firebase.auth().signOut()
          })
          .catch(()=>{
            errorTemp={
              other:"Error actualizar la contraseña"
            }
            setIsLoading(false)
          })

          console.log("OK") })
        .catch(()=>{
          setIsLoading(false)
          errorTemp={
            password:"contraseña no es correcta"
          }
          console.log("BAD")
        })
    }


    isSetError && setError(errorTemp)
 }

  return (
    <View style={styles.view}>
      <Input
      onChange={ e => onChange(e,"password") }
      placeholder="Contraseña actual"
      containerStyle={styles.input}
      password
      secureTextEntry = {showPassword ? false : true}
      rightIcon={{
        type: "material-community",
        name: showPassword ? "eye-off-outline":"eye-outline",
        color: "#c2c2c2",
        onPress: () => setShowPassword(!showPassword)
      }}
      errorMessage={error.password}
      />
      <Input
      onChange={ e => onChange(e,"newPassword") }
      placeholder="nueva contraseña"
      containerStyle={styles.input}
      password
      secureTextEntry = {showPassword ? false : true}
      rightIcon={{
        type:"material-community",
        name: showPassword ? "eye-off-outline":"eye-outline",
        color:"#c2c2c2",
        onPress: () => setShowPassword(!showPassword)
      }}
      errorMessage={error.newPassword}
      />
      <Input
      onChange= { e => onChange(e,"repeatNewPassword") }
      placeholder="repetir nueva contraseña"
      containerStyle={styles.input}
      password
      secureTextEntry = {showPassword ? false : true}
      rightIcon={{
        type:"material-community",
        name: showPassword ? "eye-off-outline":"eye-outline",
        color:"#c2c2c2",
        onPress: () => setShowPassword(!showPassword)
      }}
      errorMessage={error.repeatNewPassword}
      />
      <Button
      loading={isLoading}
      title="cambiar contraseña"
      containerStyle={styles.btnContainer}
      buttonStyle={styles.btn}
      onPress={onSubmit}
      />
      <Text>{error.other}</Text>
    </View>
  )
}

function defaultValue() {
  return {
    password:"",
    newPassword:"",
    repeatNewPassword:""
  }
}


const styles = StyleSheet.create({
  view:{
    alignItems:"center",
    paddingTop:10,
    paddingBottom:10
  },
  input: {
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