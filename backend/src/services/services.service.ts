import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private repo: Repository<Service>,
  ) {}

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

  async findOne(id: number) {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException(`Service #${id} not found`);
    return s;
  }

  create(dto: Partial<Service>) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: Partial<Service>) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Service deleted' };
  }
}
