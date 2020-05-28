import React, { useState } from "react"
import {StyleSheet,View} from "react-native"
import {ListItem} from "react-native-elements"
import {map} from "lodash"
import Modal from "../Modal"
import ChangeDisplayName from "../Account/ChangeDisplayNameForm"
import ChangeEmailName from "../Account/ChangeEmailForm"
import ChangePassword from "../Account/ChangePasswordForm"

export default function AccountOptions(props){
  const {userInfo,toastRef,setReloadUserInfo} = props
  const [showModal,setShowModal] = useState(false)
  const [renderComponent,setRenderComponent] = useState(null)



  const selectedComponent = (componentName) => {
    console.log(componentName)
    switch(componentName) {
      case "displayName":
        setRenderComponent(
        <ChangeDisplayName 
        displayName={userInfo.displayName} 
        setShowModal={setShowModal} 
        toastRef={toastRef} 
        setReloadUserInfo={setReloadUserInfo}/>)
        setShowModal(true)  
      break
      case "email":
        setRenderComponent(
        <ChangeEmailName 
        displayEmail={userInfo.email}
        setShowModal={setShowModal}
        toastRef={toastRef} 
        setReloadUserInfo={setReloadUserInfo}/>)
        setShowModal(true)
      case "password":
        setRenderComponent(
        <ChangePassword 
        setShowModal={setShowModal} 
        toastRef={toastRef}/>)
        setShowModal(true)
      default:
        setRenderComponent(null)
        setShowModal(false)
        break
    }
  }

  const menuOptions = generateOptions(selectedComponent)


  return (
    <View>
      {map(menuOptions,(menu,index)=>(
        <ListItem
        key={index}
        title={menu.title}
        leftIcon={{
          type: menu.iconType,
          name: menu.iconNameLeft,
          color: menu.iconColorLeft
        }}
        rightIcon={{
          type: menu.iconType,
          name: menu.iconNameRight,
          color: menu.iconColorRight
        }}
        containerStyle={styles.menuItem}
        onPress={menu.onPress}
        />
      ))}
      { renderComponent 
      &&  <Modal isVisible={showModal} setIsVisible={setShowModal}>
            {renderComponent}
          </Modal>
      }
    </View>
  )
}

function generateOptions(selectedComponent) {
  return [
    {
      title:"Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: ()=> selectedComponent("displayName")
    },
    {
      title:"cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: ()=> selectedComponent("email")
    },
    {
      title:"cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: ()=> selectedComponent("password")
    }
  ]
}

const styles = StyleSheet.create({
  menuItem:{
    borderBottomWidth:1,
    borderBottomColor: "#e3e3e3"
  }
})