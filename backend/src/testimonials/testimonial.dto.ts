import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  quote: string;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateTestimonialDto {
  @IsString()
  @IsOptional()
  quote?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;
}
