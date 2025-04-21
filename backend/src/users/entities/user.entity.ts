import { Company } from "src/companies/entities/company.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('text')
  position: string;

  @Column('numeric')
  salary: number;

  @Column('text')
  phone: string;

  @Column('text', { unique: true })
  email: string;

  @ManyToOne(
    () => Company,
    (company) => company.users,
    {onDelete: 'CASCADE'}
  )
  company: Company
}
