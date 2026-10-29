import Elysia from "elysia";
import { publicRoutes } from "./public-api.routes";

export const routes = new Elysia().use(publicRoutes);
