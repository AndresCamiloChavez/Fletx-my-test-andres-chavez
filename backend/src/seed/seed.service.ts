import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import colombiaData from './data/colombia.json';

import { Municipality } from 'src/seed/municipality/entities/municipality.entity';
import { Department } from 'src/seed/departament/entities/department.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Department)
    private departamentRepo: Repository<Department>,
    @InjectRepository(Municipality)
    private municipalityRepo: Repository<Municipality>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.departamentRepo.count();
    if (count > 0) {
      console.log('LOG: Datos ya existen');
      return;
    }

    for (const item of colombiaData) {
      const dept = this.departamentRepo.create({ name: item.departamento });
      await this.departamentRepo.save(dept);

      for (const muni of item.ciudades) {
        const muniEntity = this.municipalityRepo.create({
          name: muni,
          department: dept,
        });
        await this.municipalityRepo.save(muniEntity);
      }
    }
    console.log('LOG: Seed con éxito');
  }
}
