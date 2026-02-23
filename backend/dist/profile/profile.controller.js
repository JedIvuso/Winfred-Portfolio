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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const profile_service_1 = require("./profile.service");
const imageStorage = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
    },
});
const imageFilter = (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return cb(new common_1.BadRequestException('Only image files are allowed'), false);
    }
    cb(null, true);
};
let ProfileController = class ProfileController {
    constructor(service) {
        this.service = service;
    }
    get() { return this.service.get(); }
    update(dto) { return this.service.update(dto); }
    async uploadImage(field, file) {
        if (!file)
            throw new common_1.BadRequestException('No file uploaded');
        if (!['heroImage', 'aboutImage'].includes(field))
            throw new common_1.BadRequestException('Invalid field');
        const imageUrl = `/uploads/${file.filename}`;
        await this.service.update({ [field]: imageUrl });
        return { url: imageUrl };
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('upload/:field'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: imageStorage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } })),
    __param(0, (0, common_1.Param)('field')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadImage", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map