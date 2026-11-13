import "dotenv/config";
import { app, pgPool } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

const server = app.listen(env.API_PORT, () => {
  console.log(`API listening on port ${env.API_PORT}`);
});

const shutdown = async () => {
  server.close();
  await Promise.all([prisma.$disconnect(), pgPool.end()]);
};

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
