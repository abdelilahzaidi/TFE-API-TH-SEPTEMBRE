import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { EventEntity } from 'src/commun/entities/event/event';
import { EventCreateDTO } from 'src/commun/dto/event/event-create.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    @Get()
    async all(): Promise<EventEntity[]> {
      return await this.eventService.all();
    }
    @Post()
    async create(@Body() dto : EventCreateDTO):Promise<EventEntity>{
      return await this.eventService.createEvent(dto)
    }
}
