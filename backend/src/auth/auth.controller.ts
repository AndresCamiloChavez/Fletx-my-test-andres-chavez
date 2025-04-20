import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { UserAuth } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserAuthDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @GetUser() user: UserAuth,
    @GetUser('email') userEmail: string,
  ) {

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      
    }
  }

}
