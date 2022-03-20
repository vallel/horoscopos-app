import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckField from "../components/CheckField";
import Checkbox from "expo-checkbox";
import { Alarm as AlarmDto } from "../dtos/Alarm";
import { Days as DaysDto } from "../dtos/Days";
import {
  saveAlarm,
  getAlarmById,
  updateAlarm,
  deleteAlarm,
} from "../api/Alarms";
import { formatTime } from "../utils/DateTime";

export default function Alarm(props: any) {
  const {
    navigation,
    route: { params },
  } = props;

  const isNewAlarm = !(params && params.id);

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

  useEffect(() => {
    if (params && params.id) {
      (async () => {
        const alarm = await getAlarmById(params.id);

        setName(alarm.name);
        setTime(new Date(alarm.time));
        setHoroscope(alarm.isHoroscope);
        setVibration(alarm.isVibration);
        setMusic(alarm.isMusic);
        setDays(alarm.days);
      })();
    }
  }, [params]);

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

  const onSaveAlarm = async () => {
    const alarmId = isNewAlarm ? Date.now().toString() : params.id;

    const alarm: AlarmDto = {
      id: alarmId,
      name: name,
      time: time,
      days: days,
      isHoroscope: horoscope,
      isVibration: vibration,
      isMusic: music,
      notifications: [],
    };

    if (isNewAlarm) {
      await saveAlarm(alarm);
    } else {
      await updateAlarm(alarm);
    }

    navigation.goBack();
  };

  const onDeleteAlarm = async (id: string) => {
    await deleteAlarm(id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
        <CheckField
          name="lunes"
          onSelection={onDaySelected}
          selected={days.lunes}
        />
        <CheckField
          name="martes"
          onSelection={onDaySelected}
          selected={days.martes}
        />
        <CheckField
          name="miercoles"
          onSelection={onDaySelected}
          selected={days.miercoles}
        />
        <CheckField
          name="jueves"
          onSelection={onDaySelected}
          selected={days.jueves}
        />
        <CheckField
          name="viernes"
          onSelection={onDaySelected}
          selected={days.viernes}
        />
        <CheckField
          name="sabado"
          onSelection={onDaySelected}
          selected={days.sabado}
        />
        <CheckField
          name="domingo"
          onSelection={onDaySelected}
          selected={days.domingo}
        />
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

      <Button title="Guardar Alarma" onPress={onSaveAlarm} />
      {!isNewAlarm && (
        <View style={styles.deleteButtonContainer}>
          <Button
            title="Eliminar Alarma"
            color={"red"}
            onPress={() => {
              onDeleteAlarm(params.id);
            }}
          />
        </View>
      )}
    </View>
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
    borderRadius: 10,
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
  deleteButtonContainer: {
    marginTop: 10,
  },
});
