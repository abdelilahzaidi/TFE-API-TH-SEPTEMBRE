import { Module, forwardRef } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from 'src/commun/entities/team/team';
import { UserEntity } from 'src/commun/entities/user/user';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleService } from '../role/role.service';
import { RoleEntity } from 'src/commun/entities/role/role';

@Module({
  imports:[
    TypeOrmModule.forFeature([TeamEntity,UserEntity,RoleEntity]),
    UserModule
  ],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [TeamService]
})
export class TeamModule {}
