import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { gym } from "./routes/gym";
import { feedback } from "./routes/feedback";
import { config } from "dotenv";

config();

const app = new Elysia()
  .use(swagger())
  .get("/ping", "pong")
  .use(gym)
  .use(feedback)
  .listen(3000);

console.log(`Server is running on port ${process.env.PORT || 3000}`);

export type App = typeof app;
