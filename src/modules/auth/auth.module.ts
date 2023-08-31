import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/security/jwt.strategy';
import { RoleModule } from '../role/role.module';
import { StatusGuard } from 'src/shared/security/status.guard';



@Module({
  imports:[    
    PassportModule.register({
      defaultStrategy :'jwt'
    }),
    JwtModule.register({
          secret:'14101983',
          signOptions : {expiresIn:'1d'}
          })
    ,
    forwardRef(() => UserModule), 
    forwardRef(()=> RoleModule)  
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService,JwtStrategy,PassportModule]
})
export class AuthModule {}
