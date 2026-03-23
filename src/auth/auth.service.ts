import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(user: any) {
    const UserData = await this.userService.findByEmail(user.email);
    if (UserData) {
      return UserData;
    }
    return this.userService.create(user);
  }
}
