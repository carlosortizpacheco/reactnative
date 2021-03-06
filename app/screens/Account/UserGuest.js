import React from "react"
import { StyleSheet, ScrollView, Image, View, Text } from "react-native"
import { Button } from "react-native-elements"
import {useNavigation} from "@react-navigation/native"

export default function UserGuest() {


  const navigation = useNavigation()

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image 
      source={require("../../../assets/img/original.jpg")}
      resizeMode="contain"
      style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de 5tenedores</Text>
      <Text style={styles.description}>
        Descubre tu mejor restaurante, busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado mas y
        comenta como ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button 
        buttonStyle={styles.btnstyles}
        containerStyle={styles.btncontainer}
        title="Ver tu perfil"
        onPress={ () => navigation.navigate("login") }
        />
      </View>
    </ScrollView>
   )
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft:38,
    marginRight:30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center"
  },
  description:{
    textAlign:"center",
    marginBottom:20,
  },
  viewBtn:{
    flex:1,
    alignItems:"center"
  },
  btnstyles:{
    backgroundColor:"#00a680"
  },
  btncontainer:{
    width:"70%"
  }

})