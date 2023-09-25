import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDTO } from 'src/commun/dto/user/user.dto';

//import { UserEntity } from 'src/commun/entities/user/user';



export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) : UserDTO => {
    const request = ctx.switchToHttp().getRequest();    
    return  request.user;
  },
);