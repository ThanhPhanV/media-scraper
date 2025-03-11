export function formatLocalTime(date?: Date | string) {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleString();
}
