import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Ensure uploads folder exists
  const uploadsDir = join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  app.enableCors({
    origin: ["http://localhost:4200", "http://localhost:4201"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Serve uploaded images as static files at /uploads/filename
  app.useStaticAssets(uploadsDir, { prefix: "/uploads" });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("api");

  await app.listen(3000);
  console.log("🚀 Winfred Mwikali API running on http://localhost:3000/api");
  console.log("🖼️  Uploads served at http://localhost:3000/uploads/");
}
bootstrap();
