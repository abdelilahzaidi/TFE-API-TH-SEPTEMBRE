import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user';
import { RoleEntity } from '../role/role';

@Entity('Period')
export class PeriodEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  period: string;

  @ManyToMany(() => UserEntity, (user) => user.priods, { cascade: true })
  @JoinTable({
    name: 'user_period',
    joinColumn: { name: 'period_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: UserEntity[];


  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
  @JoinTable({
    name: 'role_period',
    joinColumn: { name: 'period_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];
}
