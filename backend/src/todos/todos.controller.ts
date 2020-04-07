import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAll() {
    return this.todosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.todosService.getOne(id);
  }

  @Post()
  async create(@Body() todo: Todo) {
    return await this.todosService.create(todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return (await (await this.todosService.delete(id)).affected) > 0;
  }
}
