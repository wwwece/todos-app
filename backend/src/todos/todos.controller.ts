import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Post()
  async create(@Body() todo: Todo) {
    return await this.todosService.create(todo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return (await (await this.todosService.remove(id)).affected) > 0;
  }
}
