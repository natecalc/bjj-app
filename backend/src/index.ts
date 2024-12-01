import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { note } from "./note";
import { config } from "dotenv";

config();

const app = new Elysia();

app.use(swagger()).get("/ping", "pong").use(note).listen(3000);

console.log(`Server is running on port ${process.env.PORT || 3000}`);

export type App = typeof app;
