import { Elysia, t } from "elysia";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const feedback = new Elysia({ prefix: "/feedback" }).post(
  "/submit",
  async ({ body }) => {
    const { gymId, rating, positives, improvements, comment } = body;

    const result = await pool.query(
      'INSERT INTO feedback (id, gymId, rating, positives, improvements, comment, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        crypto.randomUUID(),
        gymId,
        rating,
        positives,
        improvements,
        comment,
        new Date(),
        new Date(),
      ]
    );

    return {
      success: true,
      feedback: result.rows[0],
    };
  },
  {
    body: t.Object({
      gymId: t.String(),
      rating: t.Number({ minimum: 1, maximum: 5 }),
      positives: t.Array(t.String()),
      improvements: t.Array(t.String()),
      comment: t.Optional(t.String()),
    }),
  }
);
