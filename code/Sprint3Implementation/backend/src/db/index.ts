import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in environment variables")
}

const pool = new Pool({ connectionString: ENV.DATABASE_URL });


pool.on("connect", () => {
    console.log("Database connected successfuly");
})

pool.on("error", (err) => {
    console.error("Database connected error:", err);
})

export const db = drizzle({ client:pool, schema });

