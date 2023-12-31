import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/shared/security/decorators/current-user.decorator';
import { SignUpDTO } from 'src/commun/dto/auth/signup.dto';
import { UserEntity } from 'src/commun/entities/user/user';
import { LoginDTO } from 'src/commun/dto/auth/login.dto';
import { UserDTO } from 'src/commun/dto/user/user.dto';
import { SignInDTO, signInMapper } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }
    //Register a new user
    @Post('register')
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<UserEntity> {
        return this.authService.signup(
            signUpDTO
        );
    }
//     //signin user
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<SignInDTO> {
    
    const { token, user } = await this.authService.login(loginDTO);

    return signInMapper(token, user)
  }

//Get current user
  @Get('user')
  @UseGuards(AuthGuard())
  async profil(@CurrentUser() user:UserEntity ):Promise<UserDTO>  {
    
    console.log('curent user',user);
    return await {
      ...user,
      role: user.roles,
      grade: user.level
    };
  }
}
