import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return hash;
  };

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
}
