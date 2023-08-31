import { IsNotEmpty } from "class-validator";

export class CreateCourDTO{
    @IsNotEmpty()
    contenu: string;    
    lieuId: number;
}