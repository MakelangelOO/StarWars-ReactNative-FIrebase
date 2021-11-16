import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/homeScreen";
import Films from "./screens/films";
import Starships from "./screens/starships";
import Vehicles from "./screens/vehicles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (Constants.isDevice && Platform.OS !== "web") {
      registerForPushNotificationsAsync().then((token) => {
        axios.post(`https://nativenotify.com/api/expo/key`, {
          appId: 515,
          appToken: "FelFdyoHLFQRgTdGk4ED2B",
          expoToken: token,
        });
      });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) =>
          console.log(response)
        );
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  });

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="film" color={color} size={size} />
            ),
          }}
          name="Films"
          component={Films}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="airplane"
                color={color}
                size={size}
              />
            ),
          }}
          name="StarShips"
          component={Starships}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="car-sports"
                color={color}
                size={size}
              />
            ),
          }}
          name="Vehicles"
          component={Vehicles}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
