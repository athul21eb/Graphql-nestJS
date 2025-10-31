import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/guards/jwt/jwt.guard';
import { Users } from 'src/entities/users.entities';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
import { UpdateUserInput } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [Users], { name: 'users' })
  async findAll() {
    return await this.userService.findAllUsers();
  }

  @Query(() => Users)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findUserById(id);
  }

  @ResolveField('profile')
  async profile(@Parent() user: Users) {
    return user.profile;
  }

  // @Mutation(() => Users)
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return await this.userService.createUser(createUserInput);
  // }

  @Mutation(() => Users)
  @UseGuards(GqlJwtGuard)
  async updateUser(
    @CurrentUser('userId') id: number,
    // @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUser(id, updateUserInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlJwtGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number) {


    return await this.userService.deleteUser(id);
  }
}
