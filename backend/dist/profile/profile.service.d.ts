import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
export declare class ProfileService implements OnModuleInit {
    private repo;
    constructor(repo: Repository<Profile>);
    onModuleInit(): Promise<void>;
    get(): Promise<Profile>;
    update(dto: Partial<Profile>): Promise<Profile>;
}
