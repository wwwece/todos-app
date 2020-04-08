import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo, TodoPatch } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAll(): Promise<Todo[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.getOne(id);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return await this.todosService.create(todo);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() todo: Todo): Promise<boolean> {
    return (await this.todosService.update(id, todo)).affected > 0;
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: number,
    @Body() todoPatch: TodoPatch,
  ): Promise<boolean> {
    return (await this.todosService.update(id, todoPatch)).affected > 0;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return (await this.todosService.delete(id)).affected > 0;
  }
}
