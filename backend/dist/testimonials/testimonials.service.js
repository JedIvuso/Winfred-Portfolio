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
exports.TestimonialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const testimonial_entity_1 = require("./testimonial.entity");
let TestimonialsService = class TestimonialsService {
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        const count = await this.repo.count();
        if (count === 0) {
            await this.repo.save([
                {
                    quote: 'Winfred has been an absolute lifesaver for our team. Her organizational skills and attention to detail have transformed how we manage our daily operations. Highly reliable!',
                    name: 'Sarah Mitchell',
                    title: 'Operations Manager',
                    company: 'Kai Concept',
                    isVisible: true,
                    order: 1,
                },
                {
                    quote: 'Working with Winfred means never having to worry about the small things that make a big difference. She\'s proactive, professional, and always delivers on time.',
                    name: 'David Kimani',
                    title: 'Founder & CEO',
                    company: 'Kazo Fits',
                    isVisible: true,
                    order: 2,
                },
                {
                    quote: 'Winfred\'s ability to juggle multiple projects while maintaining quality is impressive. She has become an indispensable part of our workflow and project coordination.',
                    name: 'Michael Ochieng',
                    title: 'Project Director',
                    company: 'Construction Materials Ltd',
                    isVisible: true,
                    order: 3,
                },
            ]);
        }
    }
    findAll() {
        return this.repo.find({ where: { isVisible: true }, order: { order: 'ASC' } });
    }
    findAllAdmin() {
        return this.repo.find({ order: { order: 'ASC' } });
    }
    async findOne(id) {
        const t = await this.repo.findOne({ where: { id } });
        if (!t)
            throw new common_1.NotFoundException(`Testimonial #${id} not found`);
        return t;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
        return { message: 'Testimonial deleted' };
    }
};
exports.TestimonialsService = TestimonialsService;
exports.TestimonialsService = TestimonialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(testimonial_entity_1.Testimonial)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TestimonialsService);
//# sourceMappingURL=testimonials.service.js.map