import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/commun/entities/user/user';
import { LevelModule } from '../level/level.module';
import { RoleModule } from '../role/role.module';
import { EventModule } from '../event/event.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => RoleModule),
    forwardRef(() => LevelModule),
    forwardRef(()=>EventModule)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
