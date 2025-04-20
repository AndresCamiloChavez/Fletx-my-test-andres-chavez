import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/seed/departament/entities/department.entity';
import { Municipality } from 'src/seed/municipality/entities/municipality.entity';

@Module({
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([Department, Municipality]) // <- aquí directamente
  ],
})
export class SeedModule {}
