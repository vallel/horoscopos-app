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
