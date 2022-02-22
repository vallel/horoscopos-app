import { Days as DaysDto } from "./Days";

export interface Alarm {
  name: String;
  time: Date;
  days: DaysDto;
  isHoroscope: Boolean;
  isVibration: Boolean;
  isMusic: Boolean;
}
