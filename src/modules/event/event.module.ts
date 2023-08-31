import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/commun/entities/event/event';

@Module({
  imports:[TypeOrmModule.forFeature([EventEntity])],
  providers: [EventService],
  controllers: [EventController],
  exports:[EventService]
})
export class EventModule {}
