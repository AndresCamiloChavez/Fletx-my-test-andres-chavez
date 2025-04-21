import { forwardRef, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { ProductsModule } from 'src/products/products.module';
import { MunicipalityModule } from 'src/seed/municipality/municipality.module';
import { DepartmentModule } from 'src/seed/departament/department.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    TypeOrmModule.forFeature([Company]),
    forwardRef(() => ProductsModule),
    MunicipalityModule,
    DepartmentModule,
    AuthModule

  ],
  exports: [CompaniesService, TypeOrmModule],
})
export class CompaniesModule {}
