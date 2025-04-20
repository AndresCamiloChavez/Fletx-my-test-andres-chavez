import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepository: Repository<UserAuth>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET ?? 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserAuth> {
    const { id } = payload;

    const user = await this.userAuthRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException('Token no válido');

    if (!user.isActive)
      throw new UnauthorizedException(
        'El usuario no está activo, por favor contacta al administrador',
      );

    return user;
  }
}
