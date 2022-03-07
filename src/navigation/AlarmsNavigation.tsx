import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlarmsScreen from "../screens/Alarms";
import Alarm from "../screens/Alarm";

const Stack = createNativeStackNavigator();

export default function AlarmsNavigation() {
  return (
    <Stack.Navigator>
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
