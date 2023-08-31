import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/commun/entities/role/role';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([RoleEntity]),
],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
