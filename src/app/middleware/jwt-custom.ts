import { jwt } from "@elysia/jwt";
import { env } from "../config/env";

export const jwtCustom = jwt({ name: "jwt", secret: env.JWT_SECRET });
