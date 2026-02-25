import { ToolsService } from './tools.service';
import { Tool } from './tool.entity';
export declare class ToolsController {
    private readonly service;
    constructor(service: ToolsService);
    findAll(): Promise<Tool[]>;
    findAllAdmin(): Promise<Tool[]>;
    findOne(id: number): Promise<Tool>;
    create(dto: Partial<Tool>): Promise<Tool>;
    update(id: number, dto: Partial<Tool>): Promise<Tool>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
