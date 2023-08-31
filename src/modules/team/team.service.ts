import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from 'src/commun/dto/team/create-team.dto';
import { TeamUserAddDTO } from 'src/commun/dto/team/team-user-add.dto';
import { TeamEntity } from 'src/commun/entities/team/team';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamRepository : Repository<TeamEntity>,

        private readonly userService : UserService
    ){

    }



    async all():Promise<TeamEntity[]>{
        return await this.teamRepository.find()
    }



    async createTeam(dto: CreateTeamDto): Promise<TeamEntity> {        
    
        try {
            
    
            const team = await this.teamRepository.save(
                dto
            );
    
            return team
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Duplicate Email!!');
            }
            throw error;
        }
    }


    async addUserTeam(dto: TeamUserAddDTO): Promise<any> {
        try {
          const team = await this.teamRepository
            .createQueryBuilder('team') // Utilisation de l'alias 'period' pour la table PeriodEntity
            .where('team.id = :id', { id: dto.teamId }) // Utilisation de 'periodId' au lieu de 'perioId'
            .leftJoinAndSelect('team.users', 't') // Utilisation de 'period' au lieu de 'pe'
            .getOne();
      
          if (!team) {
            throw new NotFoundException(`Team with ID ${dto.teamId} not found.`);
          }
      
          const user = await this.userService.findOneById(dto.userId); // Utilisation de 'roleService' au lieu de 'userService'
      
          if (!user) {
            throw new NotFoundException(`User with ID ${dto.userId} not found.`);
          }
      
          team.users.push(user); 
          await this.teamRepository.save(team);
      
          return team;
        } catch (error) {
          throw error;
        }
      }






    async findTeamById(id: number): Promise<TeamEntity | undefined> {
        return this.teamRepository.findOne({ where: { id } });
      }
}
