import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

const customUUIDPipe = new ParseUUIDPipe({
  version: '4',
  exceptionFactory: () => {
    return new BadRequestException('El ID proporcionado no es válido');
  },
});

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.company)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.company)
  findOne(
    @Param('id', customUUIDPipe)
    id: string,
  ) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.company)
  update(
    @Param('id', customUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.company)
  remove(@Param('id', customUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  @Get('company/:companyId')
  @Auth(ValidRoles.admin, ValidRoles.company)
  findByCompany(@Param('companyId') companyId: string) {
    return this.productsService.findByCompany(companyId);
  }
}
