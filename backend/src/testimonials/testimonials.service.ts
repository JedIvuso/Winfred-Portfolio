import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';
import { CreateTestimonialDto, UpdateTestimonialDto } from './testimonial.dto';

@Injectable()
export class TestimonialsService implements OnModuleInit {
  constructor(
    @InjectRepository(Testimonial)
    private repo: Repository<Testimonial>,
  ) {}

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

  async findOne(id: number) {
    const t = await this.repo.findOne({ where: { id } });
    if (!t) throw new NotFoundException(`Testimonial #${id} not found`);
    return t;
  }

  create(dto: CreateTestimonialDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateTestimonialDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Testimonial deleted' };
  }
}
