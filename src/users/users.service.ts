import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';
import { Token } from 'src/token/entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Token)
    private readonly tokenModel: typeof Token,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findAllWithDeleted(): Promise<User[]> {
    const users = await this.userModel.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
    });
    return users;
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword(passWord: string, hashPassword: string) {
    return compareSync(passWord, hashPassword); // true hoặc false
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, passWord, phoneNumber, birthDay, gender, userType } =
      createUserDto;

    const hashPassword = this.getHashPassword(passWord);
    const newUser = await this.userModel.create({
      name,
      email,
      passWord: hashPassword,
      phoneNumber,
      birthDay,
      gender,
      userType,
    });

    return newUser;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { userId: id },
    });
    if (!user) {
      throw new NotFoundException(`User với userId: ${id} không tìm thấy`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`User với email: ${email} không tìm thấy`);
    }
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<string> {
    const { userId, ...updateFields } = updateUserDto;

    const [updatedCount] = await this.userModel.update(
      { ...updateFields },
      { where: { userId } },
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`User với userId: ${userId} không tìm thấy`);
    }

    return 'Xử lý thành công!';
  }

  async remove(id: number): Promise<string> {
    const user = await this.userModel.findOne({
      where: { userId: id },
    });

    if (!user) {
      throw new NotFoundException(
        `Không tìm thấy userId ${id}, không thể xóa!`,
      );
    }

    await this.userModel.destroy({ where: { userId: id }, force: false });
    return `Đã xóa thành công người dùng với userId: ${id}`;
  }

  async restore(id: number): Promise<string> {
    const user = await this.userModel.findOne({
      where: { userId: id },
      paranoid: false,
    });

    if (!user) {
      throw new NotFoundException(
        `Không tìm thấy userId ${id}, không thể khôi phục!`,
      );
    }

    await this.userModel.restore({ where: { userId: id } });
    return `Đã khôi phục thành công người dùng với userId: ${id}`;
  }

  async updateUserToken(refreshToken: string, userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
    });

    const tokenInstance = await this.tokenModel.findOne({ where: { userId } });

    if (tokenInstance) {
      tokenInstance.token = token;
      tokenInstance.refreshToken = refreshToken;
      tokenInstance.createdAt = new Date();
      tokenInstance.expiresAt = new Date(
        Date.now() + ms(this.configService.get<string>('JWT_ACCESS_EXPIRE')),
      );

      await tokenInstance.save();
    } else {
      await this.tokenModel.create({
        userId,
        token,
        refreshToken,
        createdAt: new Date(),
        expiresAt: new Date(
          Date.now() + ms(this.configService.get<string>('JWT_ACCESS_EXPIRE')),
        ),
      });
    }
  }

  findUserByToken = async (refreshToken: string) => {
    const tokenInstance = await this.tokenModel.findOne({
      where: {
        refreshToken,
      },
      include: [User],
    });

    if (!tokenInstance) {
      throw new NotFoundException('Token hoặc User không hợp lệ.');
    }

    return tokenInstance.user;
  };
}
