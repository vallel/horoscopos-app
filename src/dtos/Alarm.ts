import { Days as DaysDto } from "./Days";

export interface Alarm {
  id: string;
  name: string;
  time: Date;
  days: DaysDto;
  isHoroscope: Boolean;
  isVibration: Boolean;
  isMusic: Boolean;
  notifications: Array<string>;
}
