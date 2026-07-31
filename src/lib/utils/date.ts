import { format, parseISO, isValid } from "date-fns";
import { uz } from "date-fns/locale";

export function formatDateTime(date: Date | string) {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "d MMMM yyyy, HH:mm", { locale: uz });
}

export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "d MMMM yyyy", { locale: uz });
}

export function formatTime(date: Date | string) {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, "HH:mm", { locale: uz });
}
