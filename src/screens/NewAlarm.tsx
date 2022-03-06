import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckField from "../components/CheckField";
import Checkbox from "expo-checkbox";
import * as Notifications from "expo-notifications";
import { Alarm as AlarmDto } from "../dtos/Alarm";
import { Days as DaysDto } from "../dtos/Days";
import { saveAlarm } from "../api/Alarms";
import { formatTime, getWeekDayNumber } from "../utils/time";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NewAlarm(props: any) {
  const { navigation } = props;

  const [name, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [horoscope, setHoroscope] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [music, setMusic] = useState(false);
  const [days, setDays] = useState<DaysDto>({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  });

  const onTimePickerFocus = () => {
    setShowPicker(true);
  };

  const onTimePickerChange = (event: Object, selected: any) => {
    if (selected) {
      setTime(selected);
    }
    setShowPicker(false);
  };

  const onDaySelected = (
    day:
      | "lunes"
      | "martes"
      | "miercoles"
      | "jueves"
      | "viernes"
      | "sabado"
      | "domingo",
    selected: boolean
  ) => {
    let dayValues = days;
    dayValues[day] = selected;
    setDays(dayValues);
  };

  const onAddAlarm = async () => {
    const alarm: AlarmDto = {
      id: Date.now().toString(),
      name: name,
      time: time,
      days: days,
      isHoroscope: horoscope,
      isVibration: vibration,
      isMusic: music,
    };

    await saveAlarm(alarm);

    Object.keys(alarm.days).forEach(async (dayName) => {
      if (alarm.days[dayName]) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: alarm.name,
            body: "Esta es una prueba!",
          },
          trigger: {
            weekday: getWeekDayNumber(dayName),
            hour: alarm.time.getHours(),
            minute: alarm.time.getMinutes(),
            repeats: true,
          },
        });
      }
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear alarma:</Text>

      <TextInput
        style={styles.input}
        maxLength={50}
        placeholder="Nombre de alarma"
        value={name}
        onChangeText={(nameValue) => setName(nameValue)}
      />
      <TextInput
        style={styles.hour}
        placeholder="7:00 AM"
        value={formatTime(time)}
        onFocus={onTimePickerFocus}
        onKeyPress={() => false}
      />
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          onChange={onTimePickerChange}
        />
      )}

      <View style={styles.daysContainer}>
        <CheckField name="lunes" onSelection={onDaySelected} />
        <CheckField name="martes" onSelection={onDaySelected} />
        <CheckField name="miercoles" onSelection={onDaySelected} />
        <CheckField name="jueves" onSelection={onDaySelected} />
        <CheckField name="viernes" onSelection={onDaySelected} />
        <CheckField name="sabado" onSelection={onDaySelected} />
        <CheckField name="domingo" onSelection={onDaySelected} />
      </View>

      <View style={styles.checks}>
        <View style={styles.checkContainer}>
          <Text>Horoscopo</Text>
          <Checkbox
            value={horoscope}
            color="#349beb"
            onValueChange={(value) => setHoroscope(value)}
          />
        </View>

        <View style={styles.checkContainer}>
          <Text>Vibracion</Text>
          <Checkbox
            value={vibration}
            color="#349beb"
            onValueChange={(value) => setVibration(value)}
          />
        </View>

        <View style={styles.checkContainer}>
          <Text>Música relax</Text>
          <Checkbox
            value={music}
            color="#349beb"
            onValueChange={(value) => setMusic(value)}
          />
        </View>
      </View>

      <Button title="Crear Alarma" onPress={onAddAlarm} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    fontSize: 16,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  hour: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
  },
  daysContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  checks: {
    marginVertical: 10,
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    marginVertical: 5,
  },
});
