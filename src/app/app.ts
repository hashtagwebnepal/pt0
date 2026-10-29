import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import openapi from "@elysia/openapi";
import { toJSONSchema as zodToJSONSchema } from "zod";
import { logger as routeLogger } from "@tqman/nice-logger";
import { routes } from "./routes";

export const app = new Elysia({ prefix: "/v1" })
	.use(cors())
	.use(routeLogger({ withTimestamp: true, withBanner: true }))
	.use(
		openapi({
			specPath: "/openapi.json",
			mapJsonSchema: {
				zod: zodToJSONSchema,
			},
			// @ts-expect-error scalar config
			scalar: {
				layout: "classic",
			},
			documentation: {
				info: {
					title: "Period Tracking API",
					version: "1.0.0",
				},
				// @ts-expect-error x-tagGroups is an OpenAPI extension
				"x-tagGroups": [
					{
						name: "Auth",
						tags: ["Public Auth"],
						description: "Authentication and authorization routes for users.",
					},
				],
			},
		}),
	)
	.get("/", () => "Working")
	.use(routes);
