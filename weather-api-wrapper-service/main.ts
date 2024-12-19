import { serveDir } from "@std/http";

export default {
  fetch(req) {
    const url = new URL(req.url);
    const redis = '';

    if (url.pathname === "/") {
      return Response.json({
        weather: "Rainy",
      });
    }
    return new Response("Not found", { status: 404 });
  },
} satisfies Deno.ServeDefaultExport;
