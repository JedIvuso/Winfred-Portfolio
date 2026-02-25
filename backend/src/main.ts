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
    origin: [
      "http://localhost:4200",
      "http://localhost:4201",
      process.env.FRONTEND_URL || "https://your-frontend.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Serve uploaded images as static files at /uploads/filename
  app.useStaticAssets(uploadsDir, { prefix: "/uploads" });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("api");

  // Use PORT from environment or default to 3000
  const port = process.env.PORT || 3000;

  await app.listen(port, "0.0.0.0"); // Important: listen on all interfaces
  console.log(`🚀 Winfred Mwikali API running on port ${port}`);
  console.log(`🖼️  Uploads served at /uploads/`);
}
bootstrap();
