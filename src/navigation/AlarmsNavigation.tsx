import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlarmsScreen from '../screens/Alarms';
import NewAlarmScreen from '../screens/NewAlarm';

const Stack = createStackNavigator();

export default function AlarmsNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='AlarmsList' component={AlarmsScreen} options={{
                title: 'Alarmas'
            }} />
            <Stack.Screen name='NewAlarm' component={NewAlarmScreen} options={{
                title: 'Alarma'
            }} />
        </Stack.Navigator>
    );
}