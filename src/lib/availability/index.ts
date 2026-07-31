import type { BlockedSlot, Booking } from "@/lib/db/schema";

export function overlaps(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export function isTimeAvailable(
  start: Date,
  end: Date,
  blocked: BlockedSlot[],
  existingBookings: Pick<Booking, "date" | "status">[],
  serviceDurationMin: number
): boolean {
  for (const slot of blocked) {
    if (overlaps(start, end, slot.startTime, slot.endTime)) {
      return false;
    }
  }

  for (const booking of existingBookings) {
    if (booking.status === "cancelled") continue;

    const bookingEnd = new Date(
      booking.date.getTime() + serviceDurationMin * 60_000
    );
    if (overlaps(start, end, booking.date, bookingEnd)) {
      return false;
    }
  }

  return true;
}
