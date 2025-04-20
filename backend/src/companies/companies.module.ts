import { forwardRef, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { ProductsModule } from 'src/products/products.module';
import { MunicipalityModule } from 'src/seed/municipality/municipality.module';
import { DepartmentModule } from 'src/seed/departament/department.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    TypeOrmModule.forFeature([Company]),
    forwardRef(() => ProductsModule),
    MunicipalityModule,
    DepartmentModule

  ],
  exports: [CompaniesService, TypeOrmModule],
})
export class CompaniesModule {}
