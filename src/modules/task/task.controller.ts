import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from 'src/commun/entities/task/task';
import { TaskCreateDTO } from 'src/commun/dto/task/task';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        
      ) {}
      @Get()
      async all():Promise<TaskEntity[]>{
        return await this.taskService.all()
        
      }
    
      @Post()
      async create(@Body() dto : TaskCreateDTO): Promise<TaskEntity> {
        console.log(dto)
        return await this.taskService.createLevel(dto);
      }
}
