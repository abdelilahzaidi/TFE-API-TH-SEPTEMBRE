import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypeEventService } from './type-event.service';
import { TypeEventEntity } from 'src/commun/entities/typeEvent/type-event';
import { EventTypeCreateDTO } from 'src/commun/dto/event-type/event-type-create.dto';

@Controller('type-event')
export class TypeEventController {
    constructor(private readonly typeEventService: TypeEventService) {}
    @Get()
    async all(): Promise<TypeEventEntity[]> {
      return await this.typeEventService.all();
    }
    @Post()
    async create(@Body() dto : EventTypeCreateDTO):Promise<TypeEventEntity>{
        const typeEvent = await this.typeEventService.createTypeEvent(dto)
        console.log(typeEvent)
      return typeEvent
    }
}
