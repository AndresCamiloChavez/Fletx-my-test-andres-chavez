import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {
        const req = ctx.switchToHttp().getRequest(); // accediendo a la request en donde se encuentra datos del usuario
        const user = req.user;
        if ( !user ) throw new InternalServerErrorException('Usuario no encontrado');
        return ( !data ) ? user : user[data];
    }
);