import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatScreen from "./Chat";
import { Settings } from "./Settings";
import { Ionicons } from "@expo/vector-icons"; 
import {Platform, StatusBar } from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <>
      {
            Platform.OS === "android" &&<StatusBar barStyle="light-content" backgroundColor='#231a55' />
      }

    <Drawer.Navigator
      initialRouteName="MitChat"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#231a55",
        },
        headerTitleAlign: "left",
        headerTintColor: "#fff",
        headerTitleStyle:{
            fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: "#131220",
        },
        drawerActiveTintColor: '#7cc',  
        drawerInactiveTintColor: '#ccc' 
      
      }}
      
    >
      <Drawer.Screen
        name="MitChat"
        component={ChatScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>

      </>
  );
}
