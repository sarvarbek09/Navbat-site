// Sodda, xotirada (in-memory) ishlaydigan pub/sub — bron/band-vaqt o'zgarganda
// shu orqali xabar tarqatiladi, SSE endpoint (modules/realtime) esa shu xabarlarni
// tinglovchi brauzerlarga uzatadi.
//
// MUHIM CHEKLOV (Next.js tarafidagi src/lib/realtime.ts bilan bir xil):
// bu — bitta Node process ichidagi oddiy Map, xotirada saqlanadi. Agar backend
// bir nechta instansiyada (masalan PM2 cluster, Docker replicas, load balancer
// orqasida bir nechta server) ishga tushirilsa, bitta instansiyaga ulangan
// mijoz boshqa instansiyadagi o'zgarishni ESHITMAYDI. Ko'p-instansli muhitga
// o'tilganda buni Redis pub/sub yoki shunga o'xshash tashqi broker bilan
// almashtirish kerak bo'ladi — hozircha yagona process uchun yetarli.
type Listener = (event: RealtimeEvent) => void;

export type RealtimeEvent = {
  type:
    | "booking_created"
    | "booking_updated"
    | "booking_cancelled"
    | "slot_blocked"
    | "slot_unblocked";
  salonId: string;
  bookingId?: string;
  slotId?: string;
  data?: Record<string, unknown>;
};

const listeners = new Map<string, Set<Listener>>();

/** Berilgan salon uchun xabarlarni tinglashni boshlaydi; unsubscribe funksiyasini qaytaradi */
export function subscribe(salonId: string, listener: Listener) {
  if (!listeners.has(salonId)) {
    listeners.set(salonId, new Set());
  }
  listeners.get(salonId)!.add(listener);

  return () => {
    listeners.get(salonId)?.delete(listener);
  };
}

/** Servis qatlamidan chaqiriladi — masalan bron yaratilgach yoki bekor qilingach */
export function publish(event: RealtimeEvent) {
  const salonListeners = listeners.get(event.salonId);
  if (!salonListeners) return;

  for (const listener of salonListeners) {
    listener(event);
  }
}
