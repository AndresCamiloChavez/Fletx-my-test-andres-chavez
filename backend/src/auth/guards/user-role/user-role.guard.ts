import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get(META_ROLES,context.getHandler());

    if(!validRoles) return true; // si no hay roles definidos, se permite el acceso
    if (validRoles.length === 0) return true; // si no hay roles definidos, se permite el acceso
    const req = context.switchToHttp().getRequest(); // accediendo a la request en donde se encuentra datos del usuario
    const user = req.user;

    if (!user) throw new BadRequestException('Usuario no encontrado');

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    console.log({userRoles: user.roles})

    throw new  ForbiddenException(`Usuario ${user.fullName} no tiene permisos para acceder a este recurso`);
  }
}
