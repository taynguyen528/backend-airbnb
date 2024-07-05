import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.passWord);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
