import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";

@Entity('Role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
   
    users: UserEntity[];

    roles: RoleEntity[];
}