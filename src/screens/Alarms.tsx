import { Button, View, Text } from 'react-native';

export default function AlarmsNavigation(props: any) {

    const onAddAlarm = () => {
        props.navigation.navigate('NewAlarm');
    }

    return (
        <View>
            <Text>Bienvenid@ %fulanit@%.</Text>
            <Text>%Frase motivadora%</Text>

            <Text>Alarmas</Text>
            <Button title='Agregar' onPress={onAddAlarm}/>
        </View>
    );
}