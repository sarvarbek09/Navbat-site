import { subscribe } from "@/lib/realtime";

export async function GET(request: Request) {
  const salonId = new URL(request.url).searchParams.get("salonId");
  if (!salonId) {
    return new Response("salonId kerak", { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send({ type: "connected", salonId });

      const unsubscribe = subscribe(salonId, (event) => send(event));

      request.signal.addEventListener("abort", () => {
        unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
