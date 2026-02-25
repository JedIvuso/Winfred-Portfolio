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
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tool_entity_1 = require("./tool.entity");
let ToolsService = class ToolsService {
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        const count = await this.repo.count();
        if (count === 0) {
            await this.repo.save([
                { name: 'Google Workspace', category: 'Productivity', order: 1 },
                { name: 'Microsoft 365', category: 'Productivity', order: 2 },
                { name: 'Slack', category: 'Communication', order: 3 },
                { name: 'Zoom', category: 'Communication', order: 4 },
                { name: 'Trello', category: 'Project Management', order: 5 },
                { name: 'Asana', category: 'Project Management', order: 6 },
                { name: 'Notion', category: 'Organization', order: 7 },
                { name: 'ClickUp', category: 'Project Management', order: 8 },
                { name: 'CRM Tools', category: 'Customer Management', order: 9 },
            ]);
        }
    }
    findAll() { return this.repo.find({ where: { isVisible: true }, order: { order: 'ASC' } }); }
    findAllAdmin() { return this.repo.find({ order: { order: 'ASC' } }); }
    async findOne(id) {
        const t = await this.repo.findOne({ where: { id } });
        if (!t)
            throw new common_1.NotFoundException(`Tool #${id} not found`);
        return t;
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
        return { message: 'Tool deleted' };
    }
};
exports.ToolsService = ToolsService;
exports.ToolsService = ToolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tool_entity_1.Tool)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ToolsService);
//# sourceMappingURL=tools.service.js.map