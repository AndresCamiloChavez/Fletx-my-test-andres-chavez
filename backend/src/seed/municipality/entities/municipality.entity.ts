
import { Company } from 'src/companies/entities/company.entity';
import { Department } from 'src/seed/departament/entities/department.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.municipalities, {
    onDelete: 'CASCADE',
  })
  department: Department;

  @OneToMany(() => Company, (company) => company.municipality)
  companies: Company[];
}
