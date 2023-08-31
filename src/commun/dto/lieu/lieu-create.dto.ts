import { IsNotEmpty } from "class-validator";

export class CreateLieuDto {
    @IsNotEmpty()
    adresse: string;    
    
}