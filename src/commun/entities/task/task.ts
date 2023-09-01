import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";

@Entity('task')
export class TaskEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;
    @Column()
    dateDebut : Date;
    @Column()
    dateFin :  Date; 
    lastTask: TaskEntity[];   
    @ManyToOne(() => UserEntity, task => task.id, { nullable: true })
    user: UserEntity;
    
}