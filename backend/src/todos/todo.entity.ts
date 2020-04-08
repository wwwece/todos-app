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
  priority?: 1 | 2 | 3;

  @Column()
  date: Date;

  @Column({ default: false, nullable: true })
  isDone?: boolean;
}

export type TodoPatch = {
  id?: number;
  title?: string;
  desc?: string;
  priority?: 1 | 2 | 3;
  date?: Date;
  isDone?: boolean;
};
