import Elysia from "elysia";
import { publicAuthRoutes } from "@modules/auth/public/public-auth.routes";

export const publicRoutes = new Elysia({ prefix: "/p" }).use(publicAuthRoutes);
