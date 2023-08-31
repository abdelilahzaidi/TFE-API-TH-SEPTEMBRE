import { IsNotEmpty } from "class-validator";
import { LevelEnum } from "src/commun/enums/level.enum";

export class CreateLevelDto {
    @IsNotEmpty()
    grade: LevelEnum;    
    programId: number;
}