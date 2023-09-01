import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCreateDTO } from 'src/commun/dto/task/task';
import { TaskEntity } from 'src/commun/entities/task/task';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository : Repository<TaskEntity>,
        private  readonly userService : UserService
    ){}
    async all(): Promise<TaskEntity[]> {
        return await this.taskRepository.find();
      }
    async createLevel(dto: TaskCreateDTO): Promise<TaskEntity> {
        try {
          const taskFound = await this.findTaskByName(dto.nom);
          if (taskFound) {
            throw new ConflictException('Cette task existe déjà.');
          }
          const user = await this.userService.findOneById(dto.userId); // Récupérez le programme associé
          console.log
          const task = new TaskEntity();
          task.name=dto.nom
          task.dateDebut=dto.dateDebut
          task.dateFin=dto.dateFin
          task.user=user
          
    
          const savedTask = await this.taskRepository.save(task);
    
          console.log('in service', savedTask);
          return savedTask;
        } catch (error) {
          throw new InternalServerErrorException(
            error,
            'Une erreur est survenue lors de la création du task.',
          );
        }
      }
    //   async findLevelById(id: number): Promise<LevelEntity | undefined> {
    //     return this.levelRepository.findOne({ where: { id } });
    //   }
    
    
    //   async update(id: number, data): Promise<any> {
    //     return this.levelRepository.update(id, data);
    //   }
    
    //   async delete(id: number): Promise<any> {
    //     return this.levelRepository.delete(id);
    //   }

      async findTaskByName(name : string): Promise<TaskEntity | undefined> {
        return this.taskRepository.findOne({ where: { name } });
      }
}
