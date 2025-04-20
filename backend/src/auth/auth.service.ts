import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepository: Repository<UserAuth>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserhDto: CreateUserAuthDto) {
    try {
      const { password, ...userData } = createUserhDto;

      const user = await this.userAuthRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userAuthRepository.save(user);

      return { ...userData, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handlerDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userAuthRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales incorrectas');
    
    // delete user.password;

    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handlerDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException('Usuario ya existe en la base de datos');
    }
    throw new InternalServerErrorException('Revisar LOGS');
  }
}
