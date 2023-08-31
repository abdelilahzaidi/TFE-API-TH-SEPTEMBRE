import { IsNotEmpty } from "class-validator";

export class EventTypeCreateDTO{
    @IsNotEmpty()
    typeEvent:string;

    eventId : number
 
}