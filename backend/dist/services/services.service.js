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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("./service.entity");
let ServicesService = class ServicesService {
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        const count = await this.repo.count();
        if (count === 0) {
            await this.repo.save([
                { title: 'Administrative Support', description: 'Streamline your operations with expert email management, document preparation, data organization, and general administrative tasks that keep your business running smoothly.', icon: 'clipboard-list', isVisible: true, order: 1 },
                { title: 'Customer Service & Communication', description: 'Maintain exceptional client relationships with professional email support, inquiry management, and timely follow-ups that leave lasting positive impressions.', icon: 'headphones', isVisible: true, order: 2 },
                { title: 'Scheduling & Calendar Management', description: 'Never miss an appointment again. I handle meeting coordination, calendar organization, reminder systems, and scheduling to optimize your time.', icon: 'calendar', isVisible: true, order: 3 },
                { title: 'Data Entry & Research', description: 'Accurate data entry, thorough market research, competitor analysis, and information gathering to support your strategic decisions with reliable insights.', icon: 'database', isVisible: true, order: 4 },
            ]);
        }
    }
    findAll() { return this.repo.find({ where: { isVisible: true }, order: { order: 'ASC' } }); }
    findAllAdmin() { return this.repo.find({ order: { order: 'ASC' } }); }
    async findOne(id) {
        const s = await this.repo.findOne({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException(`Service #${id} not found`);
        return s;
    }
    create(dto) { return this.repo.save(this.repo.create(dto)); }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
        return { message: 'Service deleted' };
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesService);
//# sourceMappingURL=services.service.js.map