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
import { Alarm as AlarmDto } from "../dtos/Alarm";
import { Days as DaysDto } from "../dtos/Days";
import { saveAlarm } from "../api/Alarms";

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

  const onDaySelected = (day: string, selected: boolean) => {
    let dayValues = days;
    dayValues[day] = selected;
    setDays(dayValues);
  };

  const onAddAlarm = async () => {
    const alarm: AlarmDto = {
      name: name,
      time: time,
      days: days,
      isHoroscope: horoscope,
      isVibration: vibration,
      isMusic: music,
    };

    await saveAlarm(alarm);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        maxLength={50}
        placeholder="Nombre de alarma"
        value={name}
        onChangeText={(nameValue) => setName(nameValue)}
      />
      <TextInput
        style={styles.input}
        placeholder="7:00 AM"
        value={time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
          hour12: true,
        })}
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

      <Button title="Agregar" onPress={onAddAlarm} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  input: {
    paddingHorizontal: 5,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  daysContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
});
