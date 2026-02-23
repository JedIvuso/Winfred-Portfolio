import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from './tool.entity';

@Injectable()
export class ToolsService implements OnModuleInit {
  constructor(
    @InjectRepository(Tool)
    private repo: Repository<Tool>,
  ) {}

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

  async findOne(id: number) {
    const t = await this.repo.findOne({ where: { id } });
    if (!t) throw new NotFoundException(`Tool #${id} not found`);
    return t;
  }

  create(dto: Partial<Tool>) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: Partial<Tool>) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Tool deleted' };
  }
}
