import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getApiInfo() {
    return {
      service: "Winfred Mwikali Portfolio API",
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  }
}
