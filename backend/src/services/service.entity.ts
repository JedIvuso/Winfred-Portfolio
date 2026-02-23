import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'clipboard-list' })
  icon: string;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  order: number;
}
