import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as Schema from "./database.schema";
import { env } from "@/app/config/env";

const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, {
	schema: Schema,
});
