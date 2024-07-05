import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findAllWithDeleted(): Promise<User[]> {
    return this.userModel.findAll({
      paranoid: false,
    });
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword(passWord: string, hashPassword: string) {
    return compareSync(passWord, hashPassword); // true or false
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

    return `Số lượng bản ghi cập nhật thành công: ${updatedCount}`;
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
}
