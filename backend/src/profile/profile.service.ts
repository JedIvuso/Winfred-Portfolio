import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(
    @InjectRepository(Profile)
    private repo: Repository<Profile>,
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.repo.save({
        name: 'Winfred Mwikali',
        tagline: 'Helping you stay organized, productive, and stress-free',
        title: 'Professional Business Operations Consultant',
        aboutParagraph1: "I'm Winfred Mwikali, a dedicated Business Operations Consultant with extensive experience supporting entrepreneurs, coaches, and busy professionals in managing their daily operations more efficiently.",
        aboutParagraph2: "My mission is simple: to take the administrative burden off your shoulders so you can focus on what truly matters, growing your business and serving your clients. With a keen eye for detail and a passion for organization, I ensure that nothing falls through the cracks.",
        aboutParagraph3: "Whether it's managing your calendar, handling customer inquiries, or coordinating projects, I bring reliability, professionalism, and a proactive approach to every task. Let me be the support system that helps you work smarter, not harder.",
        email: 'winfredmwikali@gmail.com',
        phone: '+254 723 179 394',
        linkedinUrl: 'https://linkedin.com/in/winfredmwikali',
      });
    }
  }

  async get() {
    const profiles = await this.repo.find();
    return profiles[0];
  }

  async update(dto: Partial<Profile>) {
    const profile = await this.get();
    await this.repo.update(profile.id, dto);
    return this.get();
  }
}
