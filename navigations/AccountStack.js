import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import Account from "../app/screens/Account/Account"
import Login from "../app/screens/Account/Login"
import Register from "../app/screens/Account/Register"


const Stack = createStackNavigator()

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="account"
      component={Account}
      options={{title:"Account"}}
      />
      <Stack.Screen
      name="login"
      component={Login}
      options={{title:"LOGIN FORM"}}
      />
      <Stack.Screen
      name="register"
      component={Register}
      options={{title:"REGISTER"}}
      />
    </Stack.Navigator>
  )
}