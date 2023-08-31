
import { PeriodUserAddDTO } from './../../commun/dto/period/period-user-add.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodCreateDTO } from 'src/commun/dto/period/period-create.dto';
import { PeriodEntity } from 'src/commun/entities/period/period';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PeriodRoleAddDTO } from 'src/commun/dto/period/period-role-add.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(PeriodEntity)
    private readonly periodRepository: Repository<PeriodEntity>,

    private readonly userService: UserService,

    private readonly roleService: RoleService,
  ) {}

  async all(): Promise<PeriodEntity[]> {
    return await this.periodRepository.find();
  }

  async createPeriod(dto: PeriodCreateDTO): Promise<PeriodEntity | null> {
    try {
      const periodFound = await this.findPeriod(dto.period);
      if (periodFound) {
        throw new ConflictException('Cette periode existe déjà.');
      }
      

      const period = new PeriodEntity();
       period.period= dto.period;
      

      const savedPeriod = await this.periodRepository.save(period);

      
      return savedPeriod;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Une erreur est survenue lors de la création de la periode.',
      );
    }
  }

  async addPeriodUser(dto: PeriodUserAddDTO): Promise<PeriodEntity> {
    try {
      const period = await this.periodRepository
        .createQueryBuilder('pe') // Utilisation de l'alias 'pe' pour la table PeriodEntity
        .where('pe.id = :id', { id: dto.periodId })
        .leftJoinAndSelect('pe.users', 'u') // Utilisation de l'alias 'u' pour la table users
        .getOne();

      if (!period) {
        throw new NotFoundException(
          `Period with ID ${dto.periodId} not found.`,
        );
      }

      const user = await this.userService.findOneById(dto.userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${dto.userId} not found.`);
      }

      period.users.push(user);
      await this.periodRepository.save(period);

      return period;
    } catch (error) {
      throw error;
    }
  }

  async addPeriodRole(dto: PeriodRoleAddDTO): Promise<PeriodEntity> {
    try {
      const period = await this.periodRepository
        .createQueryBuilder('period') // Utilisation de l'alias 'period' pour la table PeriodEntity
        .where('period.id = :id', { id: dto.periodId }) // Utilisation de 'periodId' au lieu de 'perioId'
        .leftJoinAndSelect('period.roles', 'r') // Utilisation de 'period' au lieu de 'pe'
        .getOne();

      if (!period) {
        throw new NotFoundException(
          `Period with ID ${dto.periodId} not found.`,
        );
      }

      const role = await this.roleService.findOneById(dto.roleId); // Utilisation de 'roleService' au lieu de 'userService'

      if (!role) {
        throw new NotFoundException(`Role with ID ${dto.roleId} not found.`);
      }

      period.roles.push(role); // Utilisation de 'roles' au lieu de 'users'
      await this.periodRepository.save(period);

      return period;
    } catch (error) {
      throw error;
    }
  }
  async findPeriod(period: string): Promise<PeriodEntity | undefined> {
    return this.periodRepository.findOne({ where: { period } });
  }
}
