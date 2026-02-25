"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const uploadsDir = (0, path_1.join)(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });
    app.enableCors({
        origin: ["http://localhost:4200", "http://localhost:4201"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    app.useStaticAssets(uploadsDir, { prefix: "/uploads" });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.setGlobalPrefix("api");
    await app.listen(3000);
    console.log("🚀 Winfred Mwikali API running on http://localhost:3000/api");
    console.log("🖼️  Uploads served at http://localhost:3000/uploads/");
}
bootstrap();
//# sourceMappingURL=main.js.map