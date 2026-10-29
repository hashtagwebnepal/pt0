import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { logger as routeLogger } from "@tqman/nice-logger";
import { routes } from "./routes";

export const app = new Elysia({ prefix: "/v1" })
	.use(cors())
	.use(routeLogger({ withTimestamp: true, withBanner: true }))
	.get("/", () => "Working")
	.use(routes);
