import { Days as DaysDto } from "./Days";

export interface Alarm {
  id: string;
  name: string;
  time: Date;
  days: DaysDto;
  isHoroscope: boolean;
  isVibration: boolean;
  isMusic: boolean;
  notifications: Array<string>;
}
