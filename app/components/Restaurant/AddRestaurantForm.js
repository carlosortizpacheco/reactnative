import React, { useState } from "react"
import {StyleSheet, View,ScrollView,Alert,Dimensions, Text} from "react-native"
import {Icon,Avatar, Image,Input,Button} from "react-native-elements"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import {map,size,filter} from "lodash"

export default function AddRestaurantForm (props) {
  const {toastRef,setIsLoading,navigation} = props
  const [restaurantName, setRestaurantName] = useState("")
  const [restaurantAddress,setRestaurantAddress] = useState("")
  const [restaurantDescription,setRestaurantDescription] = useState("")
  const [imageSelected, setImageSelected] = useState([])
  

  const addRestaurant = () => {

  }  
  
  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
      setRestaurantName={setRestaurantName}
      setRestaurantAddress={setRestaurantAddress}
      setRestaurantDescription={setRestaurantDescription}
      />
      <UploadImage toastRef={toastRef} imageSelected={imageSelected} setImageSelected={setImageSelected}/>
      <Button
      title="Crear Restaurante"
      onPress={addRestaurant}
      buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  )
}


function FormAdd(props){
  const {setRestaurantName,setRestaurantAddress,setRestaurantDescription} = props
  return(
    <View style={style.viewForm}>
      <Input
      placeholder="nombre del restaurant"
      containerStyle={styles.input}
      onChange= { e => setRestaurantName(e.nativeEvent.text) }
      />
      <Input
      placeholder="direccion del restaurante"
      containerStyle={styles.input}
      onChange= { e => setRestaurantAddress(e.nativeEvent.text) }
      />
      <Input
      placeholder="descripcion de restaurant"
      multiline
      inputContainerStyle={styles.textArea}
      onChange= { e => setRestaurantDescription(e.nativeEvent.text) }
      />
      
    </View>
  )
}


function UploadImage (props) {
  const {toastRef, imageSelected, setImageSelected} = props
  
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if(resultPermissions === "denied") {
      toastRef.current.show("Permisos denegados anteriormente, activalos manualmente",3000)
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect:[4,3]
      })
      console.log(result)
      if(result.cancelled) {
        toastRef.current.show("has cerrado la galeria sin seleccionar una imagen",2000)
      } else {
        setImageSelected([...imageSelected,result.uri])
        console.log("OK")
      }
    }

    console.log("select image")
  }

  const removeImage = (image) => {
    console.log(image)

    Alert.alert(
      "Eliminar Imagen",
      "estas seguro de eliminar la imagen?",
      [
        {
          text:"Cancel",
          style:"cancel"
        },
        {
          text:"eliminar",
          onPress= () => {
            setImageSelected(
              filter(imageSelected,(imageUrl)=>imageUrl!==image)
            )
          }
        }
        
      ],
      { cancelable: false }
      )

  }


  return (
    <View style={styles.viewImage}>
      { size(imageSelected) < 4 
      &&
      <Icon
      type="material-community"
      name="camera"
      color="#7a7a7a"
      containerStyle={styles.containerIcon}
      onPress={imageSelect}
      />
      }
      
      { map(imageSelected,(imageRestaurant,index)=>(
        <Avatar
        key={index}
        style={styles.miniatureStyle}
        source={{uri:imageRestaurant}}
        onPress={ () => removeImage(imageRestaurant) }
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView:{
    height:"100%"
  },
  viewForm:{
    marginLeft:10,
    marginRight:10
  },
  input:{
    marginBottom:10
  },
  textArea:{
    height:100,
    width:"100%",
    padding:0,
    margin:0
  },
  btnAddRestaurant:{
    backgroundColor:"#00a680",
    margin:20
  }, 
  viewImage:{
    flexDirection:"row",
    marginLeft:20,
    marginRight:20,
    marginTop:30
  },
  containerIcon:{
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    height:70,
    width:70,
    backgroundColor:"#e3e3e3"
  },
  miniatureStyle:{
    width:70,
    height:70,
    marginRight:10
  }
})