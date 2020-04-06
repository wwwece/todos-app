import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: 3, nullable: true })
  priority: 1 | 2 | 3;

  @Column()
  date: Date;

  @Column({ default: false, nullable: true })
  isDone: boolean;
}
