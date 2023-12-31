import { Body, Controller, Get, Post } from '@nestjs/common';
import { LieuService } from './lieu.service';
import { LieuEntity } from 'src/commun/entities/lieu/lieu';
import { CreateLieuDto } from 'src/commun/dto/lieu/lieu-create.dto';

@Controller('lieu')
export class LieuController {
    constructor(
        private readonly lieuService : LieuService
    ){}

    @Get()
    async all():Promise<LieuEntity[]>{
        return await this.lieuService.all()
    }
    @Post()
    async create(@Body() dto : CreateLieuDto): Promise<LieuEntity> {
      console.log(dto)
      return await this.lieuService.createLevel(dto);
    }
}
