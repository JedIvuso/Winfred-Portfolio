"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("./profile.entity");
let ProfileService = class ProfileService {
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        const count = await this.repo.count();
        if (count === 0) {
            await this.repo.save({
                name: 'Winfred Mwikali',
                tagline: 'Helping you stay organized, productive, and stress-free',
                title: 'Professional Business Operations Consultant',
                aboutParagraph1: "I'm Winfred Mwikali, a dedicated Business Operations Consultant with extensive experience supporting entrepreneurs, coaches, and busy professionals in managing their daily operations more efficiently.",
                aboutParagraph2: "My mission is simple: to take the administrative burden off your shoulders so you can focus on what truly matters, growing your business and serving your clients. With a keen eye for detail and a passion for organization, I ensure that nothing falls through the cracks.",
                aboutParagraph3: "Whether it's managing your calendar, handling customer inquiries, or coordinating projects, I bring reliability, professionalism, and a proactive approach to every task. Let me be the support system that helps you work smarter, not harder.",
                email: 'winfredmwikali@gmail.com',
                phone: '+254 723 179 394',
                linkedinUrl: 'https://linkedin.com/in/winfredmwikali',
            });
        }
    }
    async get() {
        const profiles = await this.repo.find();
        return profiles[0];
    }
    async update(dto) {
        const profile = await this.get();
        await this.repo.update(profile.id, dto);
        return this.get();
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map