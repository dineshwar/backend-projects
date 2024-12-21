import express from "express";
import morgan from "morgan";
import "dotenv/config";
import helmet from "helmet";
import { routes } from "./routes";

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export { app };
