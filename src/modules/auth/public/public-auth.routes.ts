import Elysia from "elysia";
import { signup } from "./routes/signup";
import { login } from "./routes/login";
import { me } from "./routes/me";

export const publicAuthRoutes = new Elysia({
	tags: ["Public Auth"],
	prefix: "/auth",
})
	.use(signup)
	.use(login)
	.use(me);
