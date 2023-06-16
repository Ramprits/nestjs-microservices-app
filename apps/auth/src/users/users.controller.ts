import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'apps/auth/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getOne(@CurrentUser() user: UserDocument) {
    return user;
  }
}
