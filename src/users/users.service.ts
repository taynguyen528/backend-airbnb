import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, passWord, phoneNumber, birthDay, gender, userType } =
      createUserDto;

    let newUser = await this.userRepository.create({
      name,
      email,
      passWord,
      phoneNumber,
      birthDay,
      gender,
      userType,
    });

    return newUser;
  }
}
