import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";
import { getAlarms } from "../api/Alarms";
import { formatTime } from "../utils/time";

export default function AlarmsNavigation(props: any) {
  const { navigation } = props;

  const [alarms, setAlarms] = useState([]);
  const isScreenFocused = useIsFocused();

  const onAddAlarm = () => {
    navigation.navigate("NewAlarm");
  };

  useEffect(() => {
    if (isScreenFocused) {
      (async () => {
        const alarmsList = await getAlarms();
        setAlarms(alarmsList);
      })();
    }
  }, [isScreenFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenida(o) %fulanit@%.</Text>
        <Text style={styles.message}>%Frase motivadora%</Text>
      </View>

      {/* <Text style={styles.alarmsTitle}>Alarmas:</Text> */}

      <FlatList
        style={styles.alarms}
        data={alarms}
        renderItem={({ item }) => (
          <View style={styles.alarm}>
            <Text style={styles.alarmTitle}>{item.name}</Text>
            <Text style={styles.alarmTime}>
              {formatTime(new Date(item.time))}
            </Text>
          </View>
        )}
      />

      <Button title="Agregar" onPress={onAddAlarm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    marginBottom: 10,
  },
  welcome: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 3,
  },
  message: {
    textAlign: "center",
    marginVertical: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  alarmsTitle: {
    textAlign: "center",
    marginBottom: 10,
  },
  alarms: {
    marginTop: 15,
    marginBottom: 10,
  },
  alarm: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 10,
  },
  alarmTitle: {
    fontSize: 16,
  },
  alarmTime: {
    fontSize: 16,
  },
});
