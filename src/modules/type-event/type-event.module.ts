import { Module, forwardRef } from '@nestjs/common';
import { TypeEventService } from './type-event.service';
import { TypeEventController } from './type-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEventEntity } from 'src/commun/entities/typeEvent/type-event';
import { EventModule } from '../event/event.module';

@Module({
  imports:[TypeOrmModule.forFeature([TypeEventEntity]),
  forwardRef(()=>EventModule)
],
  providers: [TypeEventService],
  controllers: [TypeEventController],
  exports:[TypeEventService]
})
export class TypeEventModule {}
