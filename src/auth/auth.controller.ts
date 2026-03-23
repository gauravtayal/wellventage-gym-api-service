import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google login process
  }
  @Public()
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, res) {
    const user = req.user as any;
    const UserData = await this.authService.validateUser(user);
    const accessToken = await this.authService.login(UserData);

    return {
      message: 'User info from Google',
      user: UserData,
      accessToken,
    };
  }
}
