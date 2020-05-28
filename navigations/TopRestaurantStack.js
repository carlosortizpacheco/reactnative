import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import TopRestaurants from "../app/screens/TopRestaurant"

const Stack = createStackNavigator()

export default function TopRestaurantsStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="toprestaurants"
      component={TopRestaurants}
      options={{title:"Top Restaurants"}}
      />
    </Stack.Navigator>
  )
}