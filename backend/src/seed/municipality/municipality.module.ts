import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { Municipality } from './entities/municipality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MunicipalityService],
  imports: [TypeOrmModule.forFeature([Municipality])],
  exports: [MunicipalityService, TypeOrmModule],
})
export class MunicipalityModule {}
