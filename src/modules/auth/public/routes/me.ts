import { authGuard } from "@/app/middleware/auth-guard";
import { errorResponses } from "@/shared/errors/app-error";
import Elysia from "elysia";

export const meRoute = new Elysia().use(authGuard).get(
	"/me",
	({ user, status }) => {
		if (!user) return status(401, { error: "Unauthorized" });

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			status: user.status,
		};
	},
	{ response: { ...errorResponses } },
);
