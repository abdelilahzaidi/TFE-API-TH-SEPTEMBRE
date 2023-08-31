import {
    IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserGender } from 'src/commun/enums/gender.enum';
import { LevelEnum } from 'src/commun/enums/level.enum';
import { UserStatus } from 'src/commun/enums/status.enum';


export class SignUpDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  email: string;

  @IsNotEmpty()
  //@IsString()
  //@MinLength(8)
  //@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
  //   message:
  //     'password too weak, include in your password a special character and capital letter',
  // })
  password: string;

  @IsNotEmpty()
  //@IsString()
  //@MinLength(8)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
  //   message:
  //     'password too weak, include in your password a special character and capital letter',
  // })
  password_confirm: string;

  @IsNotEmpty()
  @IsIn(['member', 'admin'], { message: 'Invalid status' }) // Utilisation de @IsIn pour vérifier les valeurs autorisées
  status: UserStatus;

  @IsNotEmpty()
  @IsIn(['male', 'female'], { message: 'Invalid gender' }) // Utilisation de @IsIn pour vérifier les valeurs autorisées
  gender: UserGender

  @IsNotEmpty()
    grade:LevelEnum;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  adress: string;

  @IsNotEmpty()
  @IsBoolean()
  actif: boolean;

  @IsNotEmpty()
  gsm: string;
  constructor() {
    this.status = UserStatus.MEMBER; // Valeur par défaut "member"
}
}
