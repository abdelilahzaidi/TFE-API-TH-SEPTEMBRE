import { Body, Post, Get, Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateDTO } from 'src/commun/dto/role/role-create.dto';
import { RoleEntity } from 'src/commun/entities/role/role';

@Controller('role')
export class RoleController {
    constructor(
        private roleService : RoleService
    ){}
    
    @Get()
    async getAllRoles(): Promise<RoleEntity[]> {
        return this.roleService.getAllRoles();
    }

    @Post()
    async createRole(@Body() roleDto: RoleCreateDTO): Promise<RoleEntity | null> {
        return this.roleService.createRole(roleDto);
    }
}
