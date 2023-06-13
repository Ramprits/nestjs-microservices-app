import { Response } from 'express';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { UserResponse } from './interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(
    @CurrentUser() user: UserResponse,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.send(user);
  }
}
