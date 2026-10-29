import { Elysia, status } from "elysia";
import { jwtCustom } from "@/app/middleware/jwt-custom";
import { loginBody, loginResponse } from "@modules/auth/auth.model";
import { errorResponses } from "@/shared/errors/app-error";
import { login as loginService } from "@modules/auth/auth.service";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "@/infrastructure/observability/logger";

export const login = new Elysia().use(jwtCustom).post(
	"/login",
	async ({ body, jwt }) => {
		const userResult = await loginService(body);

		if (userResult instanceof AppError) {
			logger.warn("Login failed", { error: userResult.message });
			return status(userResult.status, { error: userResult.message });
		}
		if (userResult.status === "BLOCKED") {
			return status(403, { error: "Account is blocked" });
		}

		const token = await jwt.sign({
			id: userResult.id,
		});

		return {
			token,
			id: userResult.id,
		};
	},
	{
		body: loginBody,
		response: {
			200: loginResponse,
			...errorResponses,
		},
	},
);
