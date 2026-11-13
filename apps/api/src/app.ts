import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool } from "pg";
import { env } from "./config/env.js";
import { authRouter } from "./features/auth/auth.routes.js";
import { exampleRouter } from "./features/examples/example.routes.js";
import { requireAuth } from "./middleware/require-auth.js";
import { HttpError } from "./shared/http-error.js";

const pgPool = new Pool({ connectionString: env.DATABASE_URL });
const PgSession = connectPgSimple(session);
const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(express.json({ limit: "32kb" }));
app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      createTableIfMissing: true,
      tableName: "user_sessions",
    }),
    name: "app.sid",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.COOKIE_SECURE,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    },
  }),
);

app.get("/health", (_request, response) => response.json({ status: "ok" }));
app.use("/auth", authRouter);
app.get("/api/me", requireAuth, (request, response) => {
  response.json({ user: request.session.user });
});
app.use("/api/examples", exampleRouter);

const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({ error: error.message });
    return;
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);

export { app, pgPool };
