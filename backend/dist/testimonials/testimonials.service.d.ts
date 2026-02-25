import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';
import { CreateTestimonialDto, UpdateTestimonialDto } from './testimonial.dto';
export declare class TestimonialsService implements OnModuleInit {
    private repo;
    constructor(repo: Repository<Testimonial>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Testimonial[]>;
    findAllAdmin(): Promise<Testimonial[]>;
    findOne(id: number): Promise<Testimonial>;
    create(dto: CreateTestimonialDto): Promise<Testimonial>;
    update(id: number, dto: UpdateTestimonialDto): Promise<Testimonial>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
