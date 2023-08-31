import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";
import { TypeEventEntity } from "../typeEvent/type-event";
import { LieuEntity } from "../lieu/lieu";

@Entity('event')
export class EventEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;
    @Column()
    dateDebut : Date;
    @Column()
    dateFin :  Date; 

    users: UserEntity[];

    @ManyToOne(() => TypeEventEntity,tevt => tevt.events, { nullable: true })
    eventType: TypeEventEntity;
    @ManyToOne(() => LieuEntity, lieu => lieu.id, { nullable: true })
    lieu: LieuEntity;
    
}