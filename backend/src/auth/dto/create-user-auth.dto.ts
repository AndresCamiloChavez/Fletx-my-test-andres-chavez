import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserAuthDto {

  @IsString()
  @MinLength(1, { message: 'El nombre debe ser mayor a 1 caracteres' })
  fullName: string;

  @IsEmail(
    {},
    { message: 'El correo electrónico no es válido' },
  )
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe de tener un mínimo de 6 caracteres, al menos una letra mayúscula, una letra minúscula y un número o símbolo',
  })
  password: string;
}
