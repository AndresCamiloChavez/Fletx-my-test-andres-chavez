import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create({ companyId, ...productData }: CreateProductDto) {
    try {
      const product = this.productRepository.create(productData);
      const company = await this.companyRepository.findOneBy({ id: companyId });

      if (!company) {
        throw new NotFoundException('Compañía no encontrada');
      }
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handlerDBException(error);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(`No existe el producto con id ${id}`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const { companyId, ...productData } = updateProductDto;
    const product = await this.productRepository.preload({
      id: id,
      ...productData,
    });
    
    if (!product)
      throw new NotFoundException(`No existe el producto con id ${id}`);

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handlerDBException(error);
    }
  }

  async findByCompany(companyId: string) {
    const products = await this.productRepository.find({
      where: { company: { id: companyId } },
    });
    return products;
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      this.productRepository.delete(id);
      return product;
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
