import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());
type LengthUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mi";
type WeightUnit = "mg" | "g" | "kg" | "oz" | "lb";
type TemperatureUnit = "C" | "F" | "K";

const port = 3000;

interface PayloadRequest {
  input: number;
  from: LengthUnit;
  to: LengthUnit;
}

interface PayloadWeightRequest {
  input: number;
  from: WeightUnit;
  to: WeightUnit;
}

interface PayloadTemperatureRequest {
  input: number;
  from: TemperatureUnit;
  to: TemperatureUnit;
}
app.get("/", (req: Request, res: Response) => {
  res.send("Backend Working!!!");
});
app.post("/api/convert/length", (req: Request, res: Response) => {
  const conversionRates: Record<LengthUnit, number> = {
    // Conversion to meters (base unit)
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  };
  const { input, from, to }: PayloadRequest = req.body;
  if (from == to) {
    res.json({
      result: input,
    });
  }
  // Convert the value to meters first
  const valueInMeters = input * conversionRates[from];

  // Convert from meters to the target unit
  const convertedValue = valueInMeters / conversionRates[to];

  res.json({
    result: convertedValue,
  });
});

app.get("/api/convert/weight", (req: Request, res: Response) => {
  const conversionRates: Record<WeightUnit, number> = {
    mg: 0.001, // 1 mg = 0.001 g
    g: 1, // base unit is grams
    kg: 1000, // 1 kg = 1000 g
    oz: 28.3495, // 1 oz = 28.3495 g
    lb: 453.592, // 1 lb = 453.592 g
  };

  const { input, from, to }: PayloadWeightRequest = req.body;
  if (from == to) {
    res.json({
      result: input,
    });
  }
  // Convert the value to grams first
  const valueInGrams = input * conversionRates[from];

  // Convert from grams to the target unit
  const convertedValue = valueInGrams / conversionRates[to];
  res.json({
    result: convertedValue,
  });
});

app.get("/api/convert/temperature", (req: Request, res: Response) => {
  const { input, from, to }: PayloadTemperatureRequest = req.body;
  if (from == to) {
    res.json({
      result: input,
    });
  }
  let convertedValue: number;

  // Convert the input value to Celsius first
  if (from === "F") {
    convertedValue = (input - 32) * (5 / 9); // Fahrenheit to Celsius
  } else if (from === "K") {
    convertedValue = input - 273.15; // Kelvin to Celsius
  } else {
    convertedValue = input; // Value is already in Celsius
  }

  // Convert from Celsius to the target unit
  if (to === "F") {
    convertedValue = (convertedValue * 9) / 5 + 32; // Celsius to Fahrenheit
  } else if (to === "K") {
    convertedValue = convertedValue + 273.15; // Celsius to Kelvin
  }
  res.json({
    result: convertedValue,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
