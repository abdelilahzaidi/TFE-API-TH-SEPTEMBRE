import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCreateDTO } from 'src/commun/dto/event/event-create.dto';
import { EventEntity } from 'src/commun/entities/event/event';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository : Repository<EventEntity>
    ){}

    async all():Promise<EventEntity[]>{
        return await this.eventRepository.find()
    }



    async createEvent(dto: EventCreateDTO): Promise<EventEntity> {        
    
        try {
            
            const eventFound = await this.eventRepository.findOne({where:{ name: dto.nom}});
            if (eventFound) {
                throw new ConflictException('Cet évenemeny existe déjà.');
            }
            const event = new EventEntity();

            event.name=dto.nom
            event.dateDebut=dto.dateDebut
            event.dateFin=dto.dateFin
      

    

      return this.eventRepository.save(event);
    } catch (error) {
      throw new InternalServerErrorException(error,'Une erreur est survenue lors de la création de l\'évenement.');
    }
    }

    async findEventById(id: number): Promise<EventEntity | undefined> {
        return this.eventRepository.findOne({ where: { id } });
      }
}
