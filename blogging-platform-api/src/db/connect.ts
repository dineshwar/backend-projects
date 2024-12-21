import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const databaseUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const db = drizzle(databaseUrl!);

export { db };
