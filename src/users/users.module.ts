import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  providers: [UsersResolver, UsersService],
  exports:[UsersService]
})
export class UsersModule {}
