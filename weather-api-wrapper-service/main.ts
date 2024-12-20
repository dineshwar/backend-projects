import "jsr:@std/dotenv/load";
import { createClient } from 'npm:redis';

export default {
  async fetch(req) {
    const url = new URL(req.url);
      const client = await createClient()
    .on('error', err => console.log('Redis Client Error',err)).connect();
    if (url.pathname === "/") {
      const cityName = url.searchParams.get("city");
      if ( !cityName ) {
        return Response.json({error: "City name required. Send 'city' param"}, { status: 400 });
      }
      const weatherDataExist = await client.get(cityName);
      if (weatherDataExist) {
        client.disconnect();
        return Response.json(JSON.parse(weatherDataExist));
      }
      const weatherApiKey = Deno.env.get("WEATHER_API_KEY");
      if ( !weatherApiKey ) {
        return Response.json({error: "Unable to fetch weather now."}, { status: 400 });
      }
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&include=current%2Cdays%2Chours%2Calerts&key=${weatherApiKey}&contentType=json`;
      const apiCall = await fetch(apiUrl);
      if (!apiCall.ok) {
          return Response.json({error: "Unable to fetch weather now."}, { status: 400 });
      }
      const apiResponse = await apiCall.json();
      console.log(apiResponse);
      await client.set(cityName, JSON.stringify(apiResponse), 'EX', 12 * 60 * 60 );
      client.disconnect();
      return Response.json(apiResponse);
    }
    return new Response("Not found", { status: 404 });
  },
} satisfies Deno.ServeDefaultExport;
