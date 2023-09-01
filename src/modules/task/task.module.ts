import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/commun/entities/task/task';
import { UserEntity } from 'src/commun/entities/user/user';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([TaskEntity,UserEntity]),forwardRef(()=>UserModule)],
  providers: [TaskService],
  controllers: [TaskController],
  exports:[TaskService]
})
export class TaskModule {}
