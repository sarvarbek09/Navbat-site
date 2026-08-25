// REALTIME MODULI — SSE (Server-Sent Events) orqali brauzerga "nimadir
// o'zgardi" signalini yuboradi. Mijoz JS tarafida oddiy `new EventSource(...)`
// bilan ulanadi. Bu yerda controller/service qatlamlariga bo'lish shart emas —
// mantiq juda kichik va faqat HTTP streaming bilan bog'liq, shuning uchun
// to'g'ridan-to'g'ri shu faylda.
//
// Next.js tarafidagi src/app/api/realtime/route.ts bilan bir xil mantiq,
// Express uchun ReadableStream o'rniga res.write() ishlatiladi.
import { Router, type Request, type Response } from "express";
import { subscribe, type RealtimeEvent } from "../../lib/realtime";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const salonId = req.query.salonId;
  if (typeof salonId !== "string") {
    res.status(400).json({ error: "salonId query parametri kerak" });
    return;
  }

  // SSE uchun kerakli sarlavhalar
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const send = (data: unknown) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  send({ type: "connected", salonId });

  const unsubscribe = subscribe(salonId, (event: RealtimeEvent) => send(event));

  // Mijoz ulanishni uzganda (brauzer tab yopilganda) obunani tozalaymiz —
  // aks holda xotirada "eskirgan" listenerlar yig'ilib qoladi (memory leak).
  req.on("close", () => {
    unsubscribe();
    res.end();
  });
});

export default router;
