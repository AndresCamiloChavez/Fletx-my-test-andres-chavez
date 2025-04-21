import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CompaniesModule } from 'src/companies/companies.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CompaniesModule),
    AuthModule
  ],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
