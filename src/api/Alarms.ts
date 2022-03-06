import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alarm } from "../dtos/Alarm";

const ALARMS_STORAGE = "alarmslist";

export async function getAlarms() {
  const response = await AsyncStorage.getItem(ALARMS_STORAGE);
  return JSON.parse(response || "[]");
}

export async function saveAlarm(alarm: Alarm) {
  const alarms = await getAlarms();
  alarms.push(alarm);
  await AsyncStorage.setItem(ALARMS_STORAGE, JSON.stringify(alarms));
}
