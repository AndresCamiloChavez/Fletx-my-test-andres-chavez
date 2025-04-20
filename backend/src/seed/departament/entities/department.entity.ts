import { Company } from 'src/companies/entities/company.entity';
import { Municipality } from 'src/seed/municipality/entities/municipality.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Municipality, (municipality) => municipality.department)
  municipalities: Municipality[];

  @OneToMany(() => Company, (company) => company.department)
  companies: Company[];
}
