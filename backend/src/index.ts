import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { note } from "./note";

const app = new Elysia();

app.use(swagger()).get("/ping", "pong").use(note).listen(3000);
