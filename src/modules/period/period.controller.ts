import { Body, Controller, Get, Post } from '@nestjs/common';
import { PeriodService } from './period.service';
import { PeriodEntity } from 'src/commun/entities/period/period';
import { PeriodCreateDTO } from 'src/commun/dto/period/period-create.dto';
import { PeriodUserAddDTO } from 'src/commun/dto/period/period-user-add.dto';
import { PeriodRoleAddDTO } from 'src/commun/dto/period/period-role-add.dto';


@Controller('period')
export class PeriodController {
    constructor(
        private readonly periodService : PeriodService
    ){}

    @Get()
    async all():Promise<PeriodEntity[]>{
        return await this.periodService.all()
    }

    @Post()
    async createPeriod(@Body() dto : PeriodCreateDTO): Promise<PeriodEntity | null> {
        return this.periodService.createPeriod(dto);
    }

    @Post('user')
    async addPeriodUser(@Body() dto :PeriodUserAddDTO):Promise<any>{
        await this.periodService.addPeriodUser(dto)
    }
    
    @Post('role')
    async addPeriodRole(@Body() dto : PeriodRoleAddDTO):Promise<any>{
        await this.periodService.addPeriodRole(dto)
    }
}
