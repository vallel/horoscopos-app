import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlarmsScreen from "../screens/Alarms";
import Alarm from "../screens/Alarm";
import Login from "../screens/Login";
import EmailLogin from "../screens/EmailLogin";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

export default function AlarmsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLogin}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AlarmsList"
        component={AlarmsScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Alarm"
        component={Alarm}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
