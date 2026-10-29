import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/infrastructure/database/database.schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
