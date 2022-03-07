import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alarm } from "../dtos/Alarm";

const ALARMS_STORAGE = "alarmslist";

export async function getAlarms() {
  const response = await AsyncStorage.getItem(ALARMS_STORAGE);
  return JSON.parse(response || "[]");
}

export async function getAlarmById(id: number) {
  const alarms = await getAlarms();
  const result = alarms.filter(item => {return item.id === id});
  return result.length === 1 ? result[0] : null;
}

export async function saveAlarm(alarm: Alarm) {
  const alarms = await getAlarms();
  alarms.push(alarm);
  await AsyncStorage.setItem(ALARMS_STORAGE, JSON.stringify(alarms));
}

export async function deleteAlarm(id: number) {
  const alarms = await getAlarms();
  const newAlarms = alarms.filter(alarm => {return alarm.id !== id});
  await AsyncStorage.setItem(ALARMS_STORAGE, JSON.stringify(newAlarms));
}
