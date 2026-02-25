"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const testimonials_module_1 = require("./testimonials/testimonials.module");
const services_module_1 = require("./services/services.module");
const profile_module_1 = require("./profile/profile.module");
const tools_module_1 = require("./tools/tools.module");
const testimonial_entity_1 = require("./testimonials/testimonial.entity");
const service_entity_1 = require("./services/service.entity");
const profile_entity_1 = require("./profile/profile.entity");
const tool_entity_1 = require("./tools/tool.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite',
                url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : undefined,
                database: process.env.NODE_ENV === 'production' ? undefined : 'portfolio.db',
                entities: [testimonial_entity_1.Testimonial, service_entity_1.Service, profile_entity_1.Profile, tool_entity_1.Tool],
                synchronize: true,
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            }),
            testimonials_module_1.TestimonialsModule,
            services_module_1.ServicesModule,
            profile_module_1.ProfileModule,
            tools_module_1.ToolsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map