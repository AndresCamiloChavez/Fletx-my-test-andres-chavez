import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false
  })
  password: string;

  @Column('bool', {default: true})
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

}

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column('text')
//   name: string;

//   @Column('text')
//   lastName: string;

//   @Column('text')
//   position: string;

//   @Column('numeric')
//   salary: number;

//   @Column('text')
//   phone: string;

//   @Column('text', { unique: true })
//   email: string;

//   @Column('text', {
//     select: false,
    
//   })
//   password: string;

//   @Column('bool', {default: true})
//   isActive: boolean;

//   @Column('text', { array: true, default: ['user'] })
//   roles: string[];
// }
