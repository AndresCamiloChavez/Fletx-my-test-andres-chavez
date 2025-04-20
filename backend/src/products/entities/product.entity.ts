import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  category: string;
  
  @Column('numeric')
  price: number;

  @ManyToOne(
    () => Company,
    (company) => company.products,
    {onDelete: 'CASCADE'}
  )
  company: Company

}
