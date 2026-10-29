import Elysia from "elysia";
import { signupBody, signupResponse } from "@modules/auth/auth.model";
import { signup } from "@modules/auth/auth.service";
import { AppError, errorResponses } from "@/shared/errors/app-error";
import { logger } from "@/infrastructure/observability/logger";

export const signupRoute = new Elysia().post(
	"/signup",
	async ({ body, status }) => {
		try {
			const result = await signup(body);
			return result;
		} catch (err) {
			if (err instanceof AppError) {
				logger.warn("Signup failed", {
					email: body.email,
					status: err.status,
					error: err.message,
				});
				return status(err.status, {
					error: err.message,
				});
			}
			logger.error("Unexpected error in signup", {
				email: body.email,
				error: err instanceof Error ? err.message : String(err),
			});
			throw err;
		}
	},
	{
		body: signupBody,
		response: {
			200: signupResponse,
			...errorResponses,
		},
	},
);
