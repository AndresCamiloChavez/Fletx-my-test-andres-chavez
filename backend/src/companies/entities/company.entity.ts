import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(
        () => Product,
        (product) => product.company,
        { cascade: true, eager: true } 
    )
    products: Product[];

}
// Ciudad (relación con la tabla de ciudades)
// Departamento (relación con la tabla de departamentos)
// Producto(s) (relación con la tabla de productos)
// Usuarios asociados (relación con la tabla de usuarios)