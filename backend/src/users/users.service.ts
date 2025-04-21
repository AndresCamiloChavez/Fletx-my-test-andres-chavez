import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const company = await this.companyRepository.findOne({
      where: { id: createUserDto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Compañía no encontrada');
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      company,
    });

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ relations: ['company'] });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id: id});

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async findByCompany(companyId: string) {
    const users = await this.userRepository.find({
      where: { company: { id: companyId } },
    });
    return users;
  }
}
