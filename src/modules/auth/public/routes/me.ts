import { authGuard } from "@/app/middleware/auth-guard";
import { errorResponses } from "@/shared/errors/app-error";
import Elysia from "elysia";

export const me = new Elysia().use(authGuard).get(
	"/me",
	async ({ user, status }) => {
		try {
			if (!user) return status(401, { error: "Unauthorized" });

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				status: user.status,
			};
		} catch (_err) {
			return status(500, { error: "Failed to fetch profile" });
		}
	},
	{ response: { ...errorResponses } },
);
