import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { products = [], ...companyData } = createCompanyDto;

      const company = this.companyRepository.create({
        ...companyData,
        products: products.map((product) =>
          this.productRepository.create(product),
        ),
      });
      await this.companyRepository.save(company);
      return company;
    } catch (error) {
      this.handlerDBException(error);
    }
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`No existe el producto con id ${id}`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const { products, ...companyFields } = updateCompanyDto;

    const company = await this.companyRepository.preload({
      id: id,
      ...companyFields,
    });

    if (!company)
      throw new NotFoundException(`No existe la compañia con id ${id}`);
    try {
      await this.companyRepository.save(company);
      return await this.findOne(id);
    } catch (error) {
      this.handlerDBException(error);
    }
  }

  async remove(id: string) {
    try {
      const company = await this.findOne(id);
      this.companyRepository.delete(id);
      return company;
    } catch (error) {
      this.handlerDBException(error);
    }
  }

  private handlerDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Verfique LOGS en el servidor');
  }
}
