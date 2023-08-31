import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';1
import { UserEntity } from 'src/commun/entities/user/user';
import { UserCreateDTO } from 'src/commun/dto/user/user-create.dto';
import { UserRoleDTO } from 'src/commun/dto/user/user-role.dto';
import { UserEventDTO } from 'src/commun/dto/user/user-event.dto';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService
    ){}
    @Get()
    async all():Promise<UserEntity[]>{
        return await this.userService.all()
    }

    @Post()
    async createUser(@Body() dto : UserCreateDTO):Promise<UserEntity>{        
        console.log('DTO in controler ',dto)
       return  await this.userService.createUser(dto);
    }

    @Delete(':id')   
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }

    @Put(':id')    
    async update(
        @Param('id') id: number,
        @Body() body
    ) {
        const { ...data} = body;
        
        await this.userService.update(id, {
            ...data,
           
        });

        return this.userService.findOneById(id);
    }

    @Post('role')
    async addRole(@Body() dto :UserRoleDTO):Promise<any>{
        await this.userService.addRole(dto)
    }
   
    @Post('event')
    async addEvent(@Body() dto :UserEventDTO):Promise<any>{
        await this.userService.addEvent(dto)
    }
}
