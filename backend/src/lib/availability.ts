// Bron vaqti bo'sh yoki bandligini tekshiruvchi SOF funksiyalar (bazaga
// murojaat qilmaydi — shuning uchun test yozish oson). Chaqiruvchi tomon
// (modules/bookings/bookings.service.ts) avval bazadan band slotlar va
// mavjud bronlarni o'qib, shu funksiyaga uzatadi.
//
// Next.js ilovasidagi src/lib/availability.ts bilan 1:1 bir xil mantiq —
// ataylab shunday saqlangan, chunki ikkala tomon ham "bir vaqt band yoki yo'q"
// degan bitta haqiqatga tayanishi kerak.
import type { BlockedSlot, Booking } from "../db/schema";

/** Ikki vaqt oralig'i bir-biri bilan kesishadimi */
export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart;
}

/**
 * Berilgan [start, end) oraliq bo'shmi — ya'ni na band slot (blockedSlots),
 * na bekor qilinmagan boshqa bron bilan kesishmaydimi.
 */
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

    const bookingEnd = new Date(booking.date.getTime() + serviceDurationMin * 60_000);
    if (overlaps(start, end, booking.date, bookingEnd)) {
      return false;
    }
  }

  return true;
}
