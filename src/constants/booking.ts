import type { BookingStatus } from "@/types";

export const BOOKING_STATUS: Record<BookingStatus, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlangan",
  cancelled: "Bekor qilingan",
  completed: "Yakunlangan",
};

export const ACTIVE_BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
];
