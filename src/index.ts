import Elysia from "elysia";
import { app as api } from "@/app/app";

new Elysia({ prefix: "/api" }).use(api).listen(3000);
console.log("Server is running on http://localhost:3000");
