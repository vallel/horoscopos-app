import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import AlarmsNavigation from './AlarmsNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginScreen} options={{
                title: 'Iniciar sesión',
            }} />
            <Tab.Screen name="Register" component={RegisterScreen} options={{
                title: 'Registro',
            }} />
            <Tab.Screen name="Alarms" component={AlarmsNavigation} options={{
                title: 'Alarmas',
            }} />
        </Tab.Navigator>
    )
}