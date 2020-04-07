import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  getOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  async create(todo: Todo): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.todoRepository.delete(id);
  }
}
