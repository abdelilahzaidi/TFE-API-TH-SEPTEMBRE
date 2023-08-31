import { IsNotEmpty, Matches } from "class-validator";

export class PeriodCreateDTO{
    @Matches(/^\d{4}-\d{4}$/, {
        message: 'Invalid format. Should be in the format YYYY-YYYY.',
      })
    @IsNotEmpty()
    period: string;
}