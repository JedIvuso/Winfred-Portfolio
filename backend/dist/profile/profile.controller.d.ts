import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
export declare class ProfileController {
    private readonly service;
    constructor(service: ProfileService);
    get(): Promise<Profile>;
    update(dto: Partial<Profile>): Promise<Profile>;
    uploadImage(field: 'heroImage' | 'aboutImage', file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
