import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './testimonial.dto';
export declare class TestimonialsController {
    private readonly service;
    constructor(service: TestimonialsService);
    findAll(): Promise<import("./testimonial.entity").Testimonial[]>;
    findAllAdmin(): Promise<import("./testimonial.entity").Testimonial[]>;
    findOne(id: number): Promise<import("./testimonial.entity").Testimonial>;
    create(dto: CreateTestimonialDto): Promise<import("./testimonial.entity").Testimonial>;
    update(id: number, dto: UpdateTestimonialDto): Promise<import("./testimonial.entity").Testimonial>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
