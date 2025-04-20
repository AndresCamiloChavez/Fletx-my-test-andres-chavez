import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateProductOnlyDto {
  @IsString({ message: 'Debe de ser un nombre válido' })
  @MinLength(2, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name: string;

  @IsString({ message: 'Debe ser una categoría válida' })
  @MinLength(2, { message: 'La categoría debe ser mayor a 2 caracteres' })
  category: string;

  @IsNumber({}, { message: 'Debe de ser un número válido' })
  @IsPositive({ message: 'El precio debe de ser mayor a 0' })
  price: number;
}
