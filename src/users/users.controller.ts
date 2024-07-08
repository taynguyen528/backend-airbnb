import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ResponseMessage('Find all users')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('all-with-deleted')
  @ResponseMessage('Find all users including deleted')
  async findAllWithDeleted(): Promise<User[]> {
    return this.usersService.findAllWithDeleted();
  }

  @Public()
  @Post()
  @ResponseMessage('Create a new user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @ResponseMessage('Find user by id')
  async findUserById(@Param('id') id: number): Promise<User> {
    const foundUser = await this.usersService.findUserById(id);
    return foundUser;
  }

  // @Get(':email')
  // @ResponseMessage('Find user by email')
  // async findUserByEmail(@Param('email') email: string): Promise<User> {
  //   const foundUser = await this.usersService.findUserByEmail(email);
  //   return foundUser;
  // }

  @Patch()
  @ResponseMessage('Update user by id')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<string> {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete user by id')
  async remove(@Param('id') id: number): Promise<string> {
    return this.usersService.remove(id);
  }

  @Put('restore/:id')
  @ResponseMessage('Restore user by id')
  async restore(@Param('id') id: number): Promise<string> {
    return this.usersService.restore(id);
  }
}
