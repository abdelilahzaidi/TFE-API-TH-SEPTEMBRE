import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";
import { LevelEnum } from "src/commun/enums/level.enum";
import { ProgramEntity } from "../program/program";

@Entity('level')
export class LevelEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    grade: string;

   
    @OneToMany(() => UserEntity, user => user.level)
    users: UserEntity[];
    @OneToOne(() => ProgramEntity, program => program.level)
    @JoinColumn()
    program: ProgramEntity;
}