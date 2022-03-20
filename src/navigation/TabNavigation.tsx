import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import AlarmsNavigation from "./AlarmsNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Alarms"
        component={AlarmsNavigation}
        options={{
          tabBarLabel: "Alarmas",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
