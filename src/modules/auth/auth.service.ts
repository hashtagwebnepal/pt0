import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database/database.client";
import { users } from "@/infrastructure/database/database.schema";
import { hashPassword, verifyPassword } from "@/shared/security/password";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "@/infrastructure/observability/logger";
import type { SignupBody, LoginBody } from "./auth.model";

export const signup = async (body: SignupBody) => {
	const [existing] = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.email, body.email))
		.limit(1);

	if (existing) {
		logger.warn("Signup failed: email already exists", {
			email: body.email,
		});
		throw new AppError("User with this email already exists", 409);
	}

	const passwordHash = await hashPassword(body.password);

	const [user] = await db
		.insert(users)
		.values({
			name: body.name,
			email: body.email,
			password: passwordHash,
		})
		.returning({ id: users.id });

	logger.info("User created successfully", {
		userId: user.id,
		email: body.email,
	});

	return {
		message: "Account created successfully",
		id: user.id,
	};
};

export const login = async (body: LoginBody) => {
	const [user] = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
			password: users.password,
			status: users.status,
		})
		.from(users)
		.where(eq(users.email, body.email))
		.limit(1);

	if (!user) {
		return new AppError("Invalid credentials", 401);
	}

	if (user.status === "BLOCKED") {
		return new AppError("Account is blocked", 403);
	}

	const valid = await verifyPassword(body.password, user.password);
	if (!valid) {
		return new AppError("Invalid credentials", 401);
	}

	return user;
};
