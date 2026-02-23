import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tagline: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  aboutParagraph1: string;

  @Column({ type: 'text' })
  aboutParagraph2: string;

  @Column({ type: 'text' })
  aboutParagraph3: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  heroImage: string;

  @Column({ nullable: true })
  aboutImage: string;
}
