import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/homeScreen";
import Films from "./screens/films";
import Starships from "./screens/starships";
import Vehicles from "./screens/vehicles";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Films"
          component={Films}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="StarShips"
          component={Starships}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Vehicles"
          component={Vehicles}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
