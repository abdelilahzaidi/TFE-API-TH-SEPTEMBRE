import { IsNotEmpty } from "class-validator";

export class TaskCreateDTO{
    @IsNotEmpty()
    nom:string;
    @IsNotEmpty()
    dateDebut:Date;
    @IsNotEmpty()
    dateFin:Date;

    userId:number | undefined
}