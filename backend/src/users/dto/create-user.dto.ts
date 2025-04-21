import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'El nombre debe ser mayor a 1 caracteres' })
  name: string;

  @IsString()
  @MinLength(1, { message: 'El nombre debe ser mayor a 1 caracteres' })
  lastName: string;

  @IsString()
  @MinLength(1, { message: 'El cargo debe ser mayor a 1 caracteres' })
  position: string;

  @IsNumber({}, { message: 'El salario debe ser un número mayor a 0' })
  @IsPositive({ message: 'El salario debe ser un número mayor a 0' })
  salary: number;

  @IsString(
    { message: 'El teléfono debe ser un número mayor a 0' },
  )
  phone: string;

  @IsEmail(
    {},
    { message: 'El correo electrónico no es válido' },
  )
  email: string;

  @IsNotEmpty({ message: 'El producto debe tener una compañia' }) 
  @IsUUID(4, { message: 'El id de la compañia no es válido' })
  companyId: string;


}
