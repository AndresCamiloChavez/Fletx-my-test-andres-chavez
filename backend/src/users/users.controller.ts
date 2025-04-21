import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.company)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.company)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.company)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.company)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('company/:companyId')
  @Auth(ValidRoles.admin, ValidRoles.company)
  findByCompany(@Param('companyId') companyId: string) {
    return this.usersService.findByCompany(companyId);
  }
}
