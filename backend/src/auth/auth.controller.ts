import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UserAuth } from './entities/auth.entity';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';

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

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: UserAuth,
  ){
    return this.authService.checkAuthStatus(user);
  }
}
