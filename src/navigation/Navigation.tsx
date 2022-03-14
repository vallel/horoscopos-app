import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import AlarmsNavigation from "./AlarmsNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: "Iniciar sesión",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarLabel: "Registro",
          tabBarIcon: ({ color, size }) => (
            <Icon name="pen" color={color} size={size} />
          ),
        }}
      />
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
