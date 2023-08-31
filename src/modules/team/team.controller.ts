import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamEntity } from 'src/commun/entities/team/team';
import { CreateTeamDto } from 'src/commun/dto/team/create-team.dto';
import { TeamUserAddDTO } from 'src/commun/dto/team/team-user-add.dto';

@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService : TeamService
    ){}
    @Get()
    async all():Promise<TeamEntity[]>{
        return await this.teamService.all();
    }
    @Post()
    async createTeam(@Body() dto : CreateTeamDto):Promise<TeamEntity>{
        return await this.teamService.createTeam(dto);
    }
    @Post('user')
    async addUserTeam(@Body() dto : TeamUserAddDTO):Promise<any>{
        await this.teamService.addUserTeam(dto)
    }
}
