import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLieuDto } from 'src/commun/dto/lieu/lieu-create.dto';
import { LieuEntity } from 'src/commun/entities/lieu/lieu';
import { Repository } from 'typeorm';

@Injectable()
export class LieuService {
    constructor(
        @InjectRepository(LieuEntity)
        private readonly lieuRepository :Repository<LieuEntity>
    ){}

  
    
      async all(): Promise<LieuEntity[]> {
        return await this.lieuRepository.find();
      }

      async createLevel(dto: CreateLieuDto): Promise<LieuEntity> {
        try {//const program = await this.programService.findProgramById(dto.programId); // Récupérez le programme associé

            const lieu = new LieuEntity();
                    lieu.adresse=dto.adresse

            const savedLieu = await this.lieuRepository.save(lieu);

            console.log('in service', savedLieu);
            return savedLieu;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Duplicate Entry');
            }
            throw error;
        }
    }    
      async findLieuById(id: number): Promise<LieuEntity | undefined> {
        return this.lieuRepository.findOne({ where: { id } });
      }
}
