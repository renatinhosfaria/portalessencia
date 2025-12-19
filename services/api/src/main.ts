import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import { closeDb } from "@essencia/db";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  // Register Fastify cookie plugin
  await app.register(fastifyCookie as any, {
    secret: process.env.COOKIE_SECRET ?? "dev-secret-change-in-production",
  } as FastifyCookieOptions);

  // Enable CORS for the frontend apps
  app.enableCors({
    origin: [
      "http://localhost:3000", // web
      "http://localhost:3002", // admin
    ],
    credentials: true, // Allow cookies
  });

  const port = process.env.API_PORT ?? 3001;
  const host = process.env.API_HOST ?? "0.0.0.0";

  await app.listen(port, host);
  console.log(`API running on http://${host}:${port}`);

  // Graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down...");
    await closeDb();
    await app.close();
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

bootstrap();
