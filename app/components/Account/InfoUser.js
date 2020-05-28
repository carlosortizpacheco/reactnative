import React from "react"
import {StyleSheet,View,Text} from "react-native"
import {Avatar} from "react-native-elements"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import * as firebase from "firebase"

export default function InfoUser (props) {
  const { 
    userInfo: {
      uid,
      photoURL,
      displayName,
      email
    },
    setLoadingText,
    setLoading,
    toastRef
   } = props

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    console.log(resultPermission)
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status
    if(resultPermissionCamera === "denied") {
      toastRef.current.show("Permiso Denegado")
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({allowsEditing:true,aspect:[4,3]})
      console.log(result,"RESULT")
      if(result.cancelled) {
        toastRef.current.show("Has Cerrado la seleccion de imagenes")
      } else {
        uploadImage(result.uri)
          .then( s => {
            console.log("DONE")
            updatePhotoUrl()
          })
          .catch(e=>toastRef.current.show("ERROR aL ACTUALIZAR AVATAR"))
      }
    }
  }


  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar")
    setLoading(true)

    const response = await fetch(uri)
    const blob = await response.blob
    const ref = firebase.storage().ref().child(`avatar/${uid}.jpg`)
    return ref.put(blob)
  }

  const updatePhotoUrl = () => {
    firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
    .then( async (r) => {
      const update = {
        photoURL: r
      }
      await firebase.auth().currentUser.updateProfile(update)
      setLoading(false)
    })
    .catch(e=>toastRef.current.show("ERROR AL CARGAR LA IMAGEN"))
  }

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
      rounded
      size="large"
      onEditPress={changeAvatar}
      showEditButton
      containerStyle={styles.userInfoAvatar}
      source={photoURL ? { uri : photoURL } : require("../../../assets/img/avatar.jpg") }
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo" }
        </Text>
        <Text>
          {email ? email : "Social Login"}
        </Text>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  viewUserInfo:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    backgroundColor:"#f2f2f2",
    paddingTop:30,
    paddingBottom:30
  },
  userInfoAvatar:{
    marginRight:20,
  },
  displayName:{
    fontWeight:"bold",
    paddingBottom:10
  }
})