"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const utils_1 = require("./utils");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new utils_1.ExceptionsFilter());
    const corsOrigin = configService.get("CORS_ORIGIN");
    app.enableCors({
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        origin: corsOrigin ? corsOrigin.split(",") : [],
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 API is running on: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map