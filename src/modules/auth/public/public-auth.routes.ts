import Elysia from "elysia";
import { signupRoute } from "./routes/signup";
import { loginRoute } from "./routes/login";
import { meRoute } from "./routes/me";

export const publicAuthRoutes = new Elysia({
	prefix: "/auth",
})
	.use(signupRoute)
	.use(loginRoute)
	.use(meRoute);
