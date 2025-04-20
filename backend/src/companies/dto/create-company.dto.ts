import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProductOnlyDto } from 'src/products/dto/create-product-only.dto';

export class CreateCompanyDto {
  @IsString({ message: 'Debe de ser un nombre válido' })
  @MinLength(1, { message: 'El nombre debe ser mayor a 1 caracteres' })
  name: string;

  @IsString({ message: 'Debe de ser un nombre válido' })
  @MinLength(1, { message: 'El sector debe ser mayor a 1 caracteres' })
  sector: string;

  @IsString({ message: 'Debe de ser un nombre válido' })
  @MinLength(1, { message: 'El teléfono debe ser mayor a 1 caracteres' })
  phone: string;

  @IsString({ message: 'Debe de ser un nombre válido' })
  @MinLength(1, { message: 'La dirección debe ser mayor a 1 caracteres' })
  address: string;

  @IsString({ message: 'Debe de ser un nombre válido' })
  @MinLength(1, {
    message: 'Los activos y pasivos deben ser mayor a 1 caracteres',
  })
  assetsAndLiabilities: string;

  @IsInt({ message: 'El id del departamento debe ser un número' })  
  departmentId: number;

  @IsInt({ message: 'El id del municipio debe ser un número' })
  municipalityId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductOnlyDto)
  products?: CreateProductOnlyDto[];
}
