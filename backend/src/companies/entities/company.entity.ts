import { Product } from 'src/products/entities/product.entity';
import { Department } from 'src/seed/departament/entities/department.entity';
import { Municipality } from 'src/seed/municipality/entities/municipality.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  sector: string;

  @Column('text')
  phone: string;

  @Column('text')
  address: string;

  @Column('text')
  assetsAndLiabilities: string;

  @OneToMany(() => Product, (product) => product.company, {
    cascade: true,
    eager: true,
  })
  products: Product[];

  @OneToMany(() => User, (user) => user.company, {
    cascade: true,
    eager: true,
  })
  users: User[];

  @ManyToOne(() => Department, (department) => department.companies, {
    eager: true,
  })
  department: Department;

  @ManyToOne(() => Municipality, (municipality) => municipality.companies, {
    eager: true,
  })
  municipality: Municipality;
}
// Usuarios asociados (relación con la tabla de usuarios)
