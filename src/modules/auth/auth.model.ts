import { z } from "zod";

export const signupBody = z.object({
	name: z.string().min(1, "Name is required").max(255),
	email: z.email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupResponse = z.object({
	message: z.string(),
	id: z.string(),
});

export type SignupBody = z.infer<typeof signupBody>;

export const loginBody = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export const loginResponse = z.object({
	token: z.string(),
	id: z.string(),
});

export type LoginBody = z.infer<typeof loginBody>;
