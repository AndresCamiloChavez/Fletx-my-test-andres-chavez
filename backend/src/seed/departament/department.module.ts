import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentService } from './department.service';
import { Department } from './entities/department.entity';


@Module({
  providers: [DepartamentService],
  imports: [TypeOrmModule.forFeature([Department])],
  exports: [DepartamentService, TypeOrmModule],
})
export class DepartmentModule {}
