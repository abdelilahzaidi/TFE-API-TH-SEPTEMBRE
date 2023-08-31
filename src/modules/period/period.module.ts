import { Module, forwardRef } from '@nestjs/common';
import { PeriodService } from './period.service';
import { PeriodController } from './period.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodEntity } from 'src/commun/entities/period/period';
import { UserEntity } from 'src/commun/entities/user/user';
import { UserModule } from '../user/user.module';
import { RoleEntity } from 'src/commun/entities/role/role';
import { RoleModule } from '../role/role.module';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([PeriodEntity,UserEntity,RoleEntity]),
    forwardRef(()=>UserModule),
    forwardRef(()=>RoleModule)
  ],
  providers: [PeriodService],
  controllers: [PeriodController],
  exports: [PeriodService]
})
export class PeriodModule {}
