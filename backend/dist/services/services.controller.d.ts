import { ServicesService } from './services.service';
import { Service } from './service.entity';
export declare class ServicesController {
    private readonly service;
    constructor(service: ServicesService);
    findAll(): Promise<Service[]>;
    findAllAdmin(): Promise<Service[]>;
    findOne(id: number): Promise<Service>;
    create(dto: Partial<Service>): Promise<Service>;
    update(id: number, dto: Partial<Service>): Promise<Service>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
