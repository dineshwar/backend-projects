import { createClient } from 'npm:redis';

export default {
  async fetch(req) {
    const url = new URL(req.url);
    const client = await createClient()
      .on('error', err => console.log('Redis Client Error',err)).connect();
    await client.set('testkey', 'testvalue')
    client.disconnect();
    if (url.pathname === "/") {
      return Response.json({
        weather: "Rainy",
      });
    }
    return new Response("Not found", { status: 404 });
  },
} satisfies Deno.ServeDefaultExport;
