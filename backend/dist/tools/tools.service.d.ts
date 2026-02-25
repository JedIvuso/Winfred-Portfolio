import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tool } from './tool.entity';
export declare class ToolsService implements OnModuleInit {
    private repo;
    constructor(repo: Repository<Tool>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Tool[]>;
    findAllAdmin(): Promise<Tool[]>;
    findOne(id: number): Promise<Tool>;
    create(dto: Partial<Tool>): Promise<Tool>;
    update(id: number, dto: Partial<Tool>): Promise<Tool>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
