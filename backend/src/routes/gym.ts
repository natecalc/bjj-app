import { Elysia, t } from "elysia";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const gym = new Elysia({ prefix: "/gym" })
  .get("/setup", async () => {
    console.log("Hit the setup endpoint");
    await pool.query(/*sql*/ `
      CREATE TABLE IF NOT EXISTS gyms (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        digest_day VARCHAR(10),
        digest_enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return { success: true, message: "Gyms table created" };
  })
  .post(
    "/register",
    async ({ body }) => {
      console.log("Hit the register endpoint", body);
      const { name, email, password } = body;

      try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
          /*sql*/ `
        INSERT INTO gyms (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email;
      `,
          [name, email, hashedPassword]
        );

        return {
          success: true,
          gym: result.rows[0],
        };
      } catch (error: any) {
        if (error.code === "23505") {
          // Unique violation error code
          throw new Error("Email already registered");
        }
        throw error;
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
    }
  )
  .post(
    "/login",
    async ({ body }) => {
      const { email, password } = body;

      const result = await pool.query(
        /*sql*/ `
      SELECT * FROM gyms 
      WHERE email = $1;
    `,
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error("Invalid credentials");
      }

      const gym = result.rows[0];
      const validPassword = await bcrypt.compare(password, gym.password);

      if (!validPassword) {
        throw new Error("Invalid credentials");
      }

      return {
        success: true,
        gym: {
          id: gym.id,
          name: gym.name,
          email: gym.email,
        },
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  );
