import { IsNotEmpty } from "class-validator";

export class EventCreateDTO{
    @IsNotEmpty()
    nom:string;
    @IsNotEmpty()
    dateDebut:Date;
    @IsNotEmpty()
    dateFin:Date;
}