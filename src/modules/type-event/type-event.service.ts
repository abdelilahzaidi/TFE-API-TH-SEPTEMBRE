import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEventEntity } from 'src/commun/entities/typeEvent/type-event';
import { Repository } from 'typeorm';
import { EventService } from '../event/event.service';
import { EventTypeCreateDTO } from 'src/commun/dto/event-type/event-type-create.dto';

@Injectable()
export class TypeEventService {
    constructor(
        @InjectRepository(TypeEventEntity)
        private typeEventRepository: Repository<TypeEventEntity>,
        private eventService : EventService
      ) {}
    
      async all(): Promise<TypeEventEntity[]> {
        return await this.typeEventRepository.find();
      }

      async createTypeEvent(dto: EventTypeCreateDTO): Promise<TypeEventEntity> {
        try {
            const event = await this.eventService.findEventById(dto.eventId);

            const eventType = new TypeEventEntity();
            eventType.typeEvent = dto.typeEvent;
            eventType.events = event; // Assuming events should be an array

            console.log(eventType);
            const eventTypeSaved = await this.typeEventRepository.save(eventType);

            return eventTypeSaved;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Duplicate Entry');
            }
            throw error;
        }
    }

















    //   async createTypeEvent(dto : EventTypeCreateDTO): Promise<TypeEventEntity> {
    //     try {
    //         const event = await this.eventService.findEventById(dto.eventId); 

    //         const eventType = new TypeEventEntity();
    //         eventType.typeEvent=dto.typeEvent
    //         eventType.events=event
            
    //         console.log(eventType )
    //         const eventTypeSaved = await this.typeEventRepository.save(event);

            
    //         return eventTypeSaved ;
    //     } catch (error) {
    //         if (error.code === '23505') {
    //             throw new ConflictException('Duplicate Entry');
    //         }
    //         throw error;
    //     }
    // }    
      async findTypeEventById(id: number): Promise<TypeEventEntity | undefined> {
        return this.typeEventRepository.findOne({ where: { id } });
      }
}
