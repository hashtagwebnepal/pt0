import { object, string } from "zod";

const envSchema = object({
	JWT_SECRET: string().min(32, "JWT_SECRET must be at least 32 characters"),
	DATABASE_URL: string().min(1, "DATABASE_URL is required"),
});

export const env = envSchema.parse(process.env);
