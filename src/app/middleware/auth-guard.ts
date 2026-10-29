import { Elysia } from "elysia";
import { bearer } from "@elysia/bearer";
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database/database.client";
import { users } from "@/infrastructure/database/database.schema";
import { jwtCustom } from "./jwt-custom";

export type AuthUser = {
	id: string;
	name: string;
	email: string;
	status: string;
};

export const authGuard = new Elysia({ name: "authGuard" })
	.use(bearer())
	.use(jwtCustom)
	.derive(
		{ as: "global" },
		async ({ jwt, bearer }): Promise<{ user: AuthUser }> => {
			if (!bearer) return { user: undefined as unknown as AuthUser };
			const payload = await jwt.verify(bearer);

			if (!payload || !("id" in payload) || !payload.id) {
				return { user: undefined as unknown as AuthUser };
			}

			const [user] = await db
				.select({
					id: users.id,
					name: users.name,
					email: users.email,
					status: users.status,
				})
				.from(users)
				.where(eq(users.id, payload.id as string))
				.limit(1);

			if (!user) return { user: undefined as unknown as AuthUser };

			return { user };
		},
	)
	.onBeforeHandle({ as: "scoped" }, ({ user, status }) => {
		if (!user) return status(401, { error: "Unauthorized" });
		if (user.status !== "ACTIVE") {
			return status(403, { error: "User is blocked" });
		}
	});
