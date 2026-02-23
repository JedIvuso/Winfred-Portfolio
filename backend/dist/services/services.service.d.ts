import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
export declare class ServicesService implements OnModuleInit {
    private repo;
    constructor(repo: Repository<Service>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Service[]>;
    findAllAdmin(): Promise<Service[]>;
    findOne(id: number): Promise<Service>;
    create(dto: Partial<Service>): Promise<Service>;
    update(id: number, dto: Partial<Service>): Promise<Service>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
