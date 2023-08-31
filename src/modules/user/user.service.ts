import { LevelService } from './../level/level.service';
import { UserEntity } from './../../commun/entities/user/user';
import {
  
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  
  InternalServerErrorException,
  
  NotFoundException,
 
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from 'src/commun/dto/user/user-create.dto';
import { RoleService } from '../role/role.service';
import { UserRoleDTO } from 'src/commun/dto/user/user-role.dto';
import { UserEventDTO } from 'src/commun/dto/user/user-event.dto';
import { EventService } from '../event/event.service';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => RoleService)) // Correction ici
    private readonly roleService: RoleService, //private readonly levelService: LevelService
    private readonly levelService : LevelService,
    private readonly eventService : EventService
    ) {}
  async all(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async createUser(dto: UserCreateDTO): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash('Zah14$01471983', 12);

    try {
      const level = await  this.levelService.findLevelByGrade(dto.grade)
        if (!level) {
          throw new NotFoundException(`Level with ID ${dto.grade} not found.`);
        }

      const userFound = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (userFound) {
        throw new ConflictException('Cette adresse e-mail est déjà utilisée.');
      }

      const user = new UserEntity();
      user.first_name = dto.first_name;
      user.last_name = dto.last_name;
      user.email = dto.email;
      user.gender = dto.gender;
      user.adress = dto.adress;
      user.birthDate = dto.birthDate;
      user.password = hashedPassword;
      user.attributionDate = new Date();
      user.actif = dto.actif;
      user.gsm = dto.gsm;
      user.level=level
      user.status=dto.status
      return this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        "Une erreur est survenue lors de la création de l'utilisateur.",
      );
    }
  }

  async create(data): Promise<UserEntity> {
    return this.userRepository.save(data);
}

  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  //Find a user by email
  async findOneByEmail(email: string): Promise<any> {
    return this.userRepository.findOne({ where: { email } });
  }
  //Find a user by id
  async findOneById(id: number): Promise<any> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserStatusByUserId(id: any) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('No user found by Id', HttpStatus.NOT_FOUND);
    }

    return user.status;
  }

  async addRole(dto: UserRoleDTO) {
    try {
        const user = await this.userRepository
            .createQueryBuilder('u')
            .where('u.id = :id', { id: dto.userId })
            .leftJoinAndSelect('u.roles', 'r') // Utilisez 'u.roles' au lieu de 'u.users'
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${dto.userId} not found.`);
        }

        const role = await this.roleService.findOneById(dto.roleId);

        if (!role) {
            throw new NotFoundException(`Role with ID ${dto.roleId} not found.`);
        }

        user.roles.push(role);
        await this.userRepository.save(user);

        return user;
    } catch (error) {
        throw error;
    }
}



async addEvent(dto: UserEventDTO) {
  try {
      const user = await this.userRepository
          .createQueryBuilder('u')
          .where('u.id = :id', { id: dto.userId })
          .leftJoinAndSelect('u.events', 'ev') // Utilisez 'u.roles' au lieu de 'u.users'
          .getOne();

      if (!user) {
          throw new NotFoundException(`User with ID ${dto.userId} not found.`);
      }

      const event = await this.eventService.findEventById(dto.eventId);

      if (!event) {
          throw new NotFoundException(`Event with ID ${dto.eventId} not found.`);
      }

      user.events.push(event);
      await this.userRepository.save(user);

      return user;
  } catch (error) {
      throw error;
  }
}
}
