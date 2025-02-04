import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (message: string) => {
        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      };

      // Keep connection open for real-time updates
      sendEvent("connected");

      // Store this stream in memory so we can trigger updates later
      globalThis.sseClients = globalThis.sseClients || [];
      globalThis.sseClients.push(controller);

      // Handle connection close
      req.signal.addEventListener("abort", () => {
        globalThis.sseClients = globalThis.sseClients.filter(
          (c) => c !== controller
        );
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
