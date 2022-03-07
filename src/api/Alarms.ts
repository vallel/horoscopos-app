import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Alarm } from "../dtos/Alarm";
import { getWeekDayNumber } from "../utils/time";

const ALARMS_STORAGE = "alarmslist";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const addNotificationAlarm = (alarm: Alarm) => {
  let notificationIds: Array<string> = [];

  Object.keys(alarm.days).forEach(async (dayName) => {
    if (alarm.days[dayName]) {
      let id = await Notifications.scheduleNotificationAsync({
        content: {
          title: alarm.name,
        },
        trigger: {
          weekday: getWeekDayNumber(dayName),
          hour: alarm.time.getHours(),
          minute: alarm.time.getMinutes(),
          repeats: true,
        },
      });

      notificationIds.push(id);
    }
  });

  return notificationIds;
};

const cancelNotificationAlarm = (alarm: Alarm) => {
  alarm.notifications.forEach(async notificationId => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  });
};

export async function getAlarms() {
  const response = await AsyncStorage.getItem(ALARMS_STORAGE);
  return JSON.parse(response || "[]");
}

export async function getAlarmById(id: string, alarms?: Array<Alarm>)  {
  if (typeof alarms === 'undefined') {
    alarms = await getAlarms();
  }
  const result = alarms.filter(item => {return item.id === id});
  return result.length === 1 ? result[0] : null;
}

export async function saveAlarm(alarm: Alarm) {
  try {
    alarm.notifications = addNotificationAlarm(alarm);
    const alarms = await getAlarms();
    alarms.push(alarm);
    await AsyncStorage.setItem(ALARMS_STORAGE, JSON.stringify(alarms));
  } catch (error) {
    cancelNotificationAlarm(alarm);
    throw error;
  }
}

export async function updateAlarm(alarm: Alarm) {
  try {
    const alarms = await getAlarms();
    const oldAlarm = await getAlarmById(alarm.id, alarms);
    
    if (oldAlarm) {
      cancelNotificationAlarm(oldAlarm);
    }

    alarm.notifications = addNotificationAlarm(alarm);

    const newAlarms = alarms.filter(item => {return item.id !== alarm.id});
    newAlarms.push(alarm);
    await AsyncStorage.setItem(ALARMS_STORAGE, JSON.stringify(newAlarms));
  } catch (error) {
    cancelNotificationAlarm(alarm);
    throw error;
  }
}

export async function deleteAlarm(id: string) {
  const alarms = await getAlarms();
  const oldAlarm = await getAlarmById(id);
  if (oldAlarm) {
    cancelNotificationAlarm(oldAlarm);
  }
  const newAlarms = alarms.filter(alarm => {return alarm.id !== id});
  await AsyncStorage.setItem(ALARMS_STORAGE, JSON.stringify(newAlarms));
}
