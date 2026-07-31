"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ScheduleRealtime({ salonId }: { salonId: string }) {
  const router = useRouter();

  useEffect(() => {
    const es = new EventSource(`/api/realtime?salonId=${salonId}`);
    es.onmessage = () => router.refresh();
    return () => es.close();
  }, [salonId, router]);

  return null;
}
