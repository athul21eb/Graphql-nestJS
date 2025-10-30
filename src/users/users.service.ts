import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { Users } from 'src/entities/users.entities';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
import { UpdateUserInput } from 'src/users/dto/update-user.dto';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async findAllUsers(): Promise<Users[]> {
    return this.userRepo.find();
  }

  async findUserById(id: number): Promise<Users> {
    return this.userRepo.findOneByOrFail({ id });
  }
  async findUserByEmail(email: string): Promise<Users|null> {
   return  this.userRepo.findOne({ where: { email } });

  }

  async createUser(
    createUserInput: CreateUserInput ,
  ): Promise<Users> {
    const newUser = this.userRepo.create(createUserInput);

    return this.userRepo.save(newUser);
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<Users> {
    const user = await this.userRepo.findOneByOrFail({ id });
    return this.userRepo.save(Object.assign(user, updateUserInput));
  }

  async deleteUser(id: number): Promise<boolean> {
    return (await this.userRepo.delete(id)).affected === 1;
  }
}
