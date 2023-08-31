import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";

@Entity('Team')
export class TeamEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => UserEntity, user => user.teams)
    @JoinTable({
        name: 'team_user',
        joinColumn: { name: 'team_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    users:UserEntity[]

}