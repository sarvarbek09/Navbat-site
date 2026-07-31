import type { RealtimeEvent } from "@/types";

type Listener = (event: RealtimeEvent) => void;

const listeners = new Map<string, Set<Listener>>();

export function subscribe(salonId: string, listener: Listener) {
  if (!listeners.has(salonId)) {
    listeners.set(salonId, new Set());
  }
  listeners.get(salonId)!.add(listener);

  return () => {
    listeners.get(salonId)?.delete(listener);
  };
}

export function publish(event: RealtimeEvent) {
  const salonListeners = listeners.get(event.salonId);
  if (!salonListeners) return;

  for (const listener of salonListeners) {
    listener(event);
  }
}
