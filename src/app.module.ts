import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BdModule } from './BD/bd.modules';
import { LevelModule } from './modules/level/level.module';
import { ProgramModule } from './modules/program/program.module';
import { RoleModule } from './modules/role/role.module';
import { PeriodModule } from './modules/period/period.module';
import { TeamModule } from './modules/team/team.module';
import { EventModule } from './modules/event/event.module';
import { TypeEventModule } from './modules/type-event/type-event.module';
import { LieuModule } from './modules/lieu/lieu.module';
import { CourModule } from './modules/cour/cour.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    BdModule,
    AuthModule,
    UserModule,
    LevelModule,
    ProgramModule,
    RoleModule,
    PeriodModule,
    TeamModule,
    EventModule,
    TypeEventModule,
    LieuModule,
    CourModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
