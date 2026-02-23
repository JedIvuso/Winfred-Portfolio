import {
  Controller, Get, Put, Body, Post, Param,
  UploadedFile, UseInterceptors, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';

const imageStorage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${extname(file.originalname)}`);
  },
});

const imageFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new BadRequestException('Only image files are allowed'), false);
  }
  cb(null, true);
};

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  get() { return this.service.get(); }

  @Put()
  update(@Body() dto: Partial<Profile>) { return this.service.update(dto); }

  @Post('upload/:field')
  @UseInterceptors(FileInterceptor('file', { storage: imageStorage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } }))
  async uploadImage(
    @Param('field') field: 'heroImage' | 'aboutImage',
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    if (!['heroImage', 'aboutImage'].includes(field)) throw new BadRequestException('Invalid field');
    const imageUrl = `/uploads/${file.filename}`;
    await this.service.update({ [field]: imageUrl });
    return { url: imageUrl };
  }
}
