import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "../event/event";

@Entity('type_event')
export class TypeEventEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    typeEvent: string;

   
    @OneToMany(() => EventEntity, event => event.eventType)
    events: EventEntity;
    
}