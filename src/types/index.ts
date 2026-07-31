export type UserRole = "client" | "owner";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type SessionUser = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type RealtimeEventType =
  | "booking_created"
  | "booking_updated"
  | "booking_cancelled"
  | "slot_blocked"
  | "slot_unblocked";

export type RealtimeEvent = {
  type: RealtimeEventType;
  salonId: string;
  bookingId?: string;
  slotId?: string;
  data?: Record<string, unknown>;
};

export type ActionResult<T> =
  | { data: T; error?: never }
  | { error: string | Record<string, string[]>; data?: never };
