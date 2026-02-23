import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quote: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}
