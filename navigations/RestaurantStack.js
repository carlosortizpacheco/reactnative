import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Restaurants from "../app/screens/Restaurants/Restaurants"
import AddRestaurant from "../app/screens/Restaurants/AddRestaurants"



const Stack = createStackNavigator()

export default function RestaurantStack () {
  return (
    <Stack.Navigator>
    <Stack.Screen
    name="restaurants"
    component={Restaurants}
    options={{title:"Restaurants"}}
    />
    <Stack.Screen
    name="add-restaurant"
    component={AddRestaurant}
    options={{title:"Add Restaurant"}}
    />

    </Stack.Navigator>
  )
}