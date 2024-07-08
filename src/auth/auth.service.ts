import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UserType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { IUser } from 'src/users/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async login(user: IUser, response: Response) {
    const payload = { email: user.email, userId: user.userId };
    const { userId, name, email, phoneNumber, birthDay, gender } = user;

    const refresh_token = this.createRefreshToken(payload);

    // update user with refreshToken
    await this.usersService.updateUserToken(refresh_token, userId);

    // set refresh_token as cookies
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId,
        name,
        email,
        phoneNumber,
        birthDay,
        gender,
      },
    };
  }

  async register(user: RegisterUserDto) {
    const createUserDto = {
      ...user,
      userType: UserType.Guest,
    };

    const newUser = await this.usersService.createUser(createUserDto);
    return {
      userId: newUser.userId,
      createdAt: newUser.createdAt,
    };
  }

  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refreshToken;
  };

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findUserByToken(refreshToken);

      if (user) {
        //update refresh_token
        const { userId, name, email, phoneNumber, birthDay, gender } = user;
        const payload = {
          userId,
          name,
          email,
          phoneNumber,
          birthDay,
          gender,
        };

        const refresh_token = this.createRefreshToken(payload);

        // update user with refreshToken
        await this.usersService.updateUserToken(refresh_token, userId);

        response.clearCookie('refresh_token');
        response.clearCookie('refresh_token1');

        // set refresh_token as cookies
        response.cookie('refresh_token  ', refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
        });

        return {
          access_token: this.jwtService.sign(payload),
          user: {
            userId,
            name,
            email,
            phoneNumber,
            birthDay,
            gender,
          },
        };
      } else {
        throw new BadRequestException(
          `Refresh Token không hợp lệ. Vui lòng login.1`,
        );
      }
    } catch (error) {
      console.log('checkError: ', error);
      throw new BadRequestException(
        `Refresh Token không hợp lệ. Vui lòng login.`,
      );
    }
  };

  logout = async (response: Response, user: IUser) => {
    await this.usersService.updateUserToken('', user.userId);
    response.clearCookie('refresh_token');
    return `ok`;
  };
}
