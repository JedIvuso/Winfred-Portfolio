import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: 0 })
  order: number;
}
