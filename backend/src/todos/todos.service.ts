import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo, TodoPatch } from './todo.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      order: {
        date: 'ASC',
        title: 'ASC',
      },
    });
  }

  getOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  async create(todo: Todo): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async update(id: number, todo: TodoPatch): Promise<UpdateResult> {
    return await this.todoRepository.update(id, todo);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.todoRepository.delete(id);
  }
}
