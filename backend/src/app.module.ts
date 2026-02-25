import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { ServicesModule } from "./services/services.module";
import { ProfileModule } from "./profile/profile.module";
import { ToolsModule } from "./tools/tools.module";
import { Testimonial } from "./testimonials/testimonial.entity";
import { Service } from "./services/service.entity";
import { Profile } from "./profile/profile.entity";
import { Tool } from "./tools/tool.entity";
import { HealthController } from "./health/health.controller";
import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.NODE_ENV === "production" ? "postgres" : "sqlite",
      url:
        process.env.NODE_ENV === "production"
          ? process.env.DATABASE_URL
          : undefined,
      database:
        process.env.NODE_ENV === "production" ? undefined : "portfolio.db",
      entities: [Testimonial, Service, Profile, Tool],
      synchronize: true,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    } as any),
    TestimonialsModule,
    ServicesModule,
    ProfileModule,
    ToolsModule,
  ],
  controllers: [HealthController, AppController],
})
export class AppModule {}
