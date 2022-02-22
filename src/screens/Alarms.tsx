import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { getAlarms } from "../api/Alarms";

export default function AlarmsNavigation(props: any) {
  const { navigation } = props;

  const [alarms, setAlarms] = useState([]);

  const onAddAlarm = () => {
    navigation.navigate("NewAlarm");
  };

  useEffect(() => {
    (async () => {
      const alarmsList = await getAlarms();
      setAlarms(alarmsList);

      console.log(alarmsList);
    })();
  }, []);

  return (
    <View>
      <Text>Bienvenid@ %fulanit@%.</Text>
      <Text>%Frase motivadora%</Text>

      <Text>Alarmas</Text>
      <Button title="Agregar" onPress={onAddAlarm} />
    </View>
  );
}
