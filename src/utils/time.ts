export function formatTime(date: Date) {
  return (
    (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
      .toString()
      .padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    " " +
    (date.getHours() < 12 ? "AM" : "PM")
  );
}

export function getWeekDayNumber(weekday: string) {
  const weekdays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  weekday = weekday.toLowerCase();
  const weekdayNumber = weekdays.indexOf(weekday) +1;

  return weekdayNumber;
}