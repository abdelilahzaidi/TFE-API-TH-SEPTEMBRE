import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";
import { LieuEntity } from "../lieu/lieu";

@Entity('cour')
export class CourEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    contenu: string;

    users :UserEntity[];
    @ManyToOne(() => LieuEntity, lieu => lieu.id, { nullable: true })
    lieu: LieuEntity;

}