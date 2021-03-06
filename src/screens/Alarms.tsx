import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { getAlarms } from "../api/Alarms";
import { formatTime } from "../utils/DateTime";
import { getRandomQuote } from "../api/Quotes";
import { Alarm } from "../dtos/Alarm";
import useAuth from "../hooks/useAuth";

export default function Alarms(props: any) {
  const { navigation } = props;

  const { auth, logIn } = useAuth();

  const [alarms, setAlarms] = useState([]);
  const [quote, setQuote] = useState("");

  const isScreenFocused = useIsFocused();

  const onAddAlarm = () => {
    navigation.navigate("Alarm");
  };

  useEffect(() => {
    if (isScreenFocused) {
      if (!auth) {
        console.log("not logged in!");
        navigation.navigate("Login");
      }

      (async () => {
        const alarmsList = await getAlarms();
        setAlarms(alarmsList);
      })();

      if (!quote) {
        setQuote(getRandomQuote());
      }
    }
  }, [isScreenFocused]);

  const onAlarmSelection = (id: number) => {
    navigation.navigate("Alarm", { id: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenida(o) {auth.name}.</Text>
        <Text style={styles.message}>{quote}</Text>
      </View>

      {alarms.map((alarm: Alarm) => (
        <View
          style={styles.alarm}
          key={alarm.id}
          onTouchEnd={() => onAlarmSelection(alarm.id)}
        >
          <Text style={styles.alarmTitle}>{alarm.name}</Text>
          <Text style={styles.alarmTime}>
            {formatTime(new Date(alarm.time))}
          </Text>
        </View>
      ))}

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
    fontSize: 22,
    marginBottom: 3,
  },
  message: {
    textAlign: "center",
    marginVertical: 5,
    padding: 5,
    fontStyle: "italic",
    fontSize: 15,
    color: "#0f67bf",
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
