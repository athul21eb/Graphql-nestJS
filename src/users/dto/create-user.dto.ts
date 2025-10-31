import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  isEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  isString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  
   @IsStrongPassword({
    minLength: 3,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;

  @Field(() => Role)
  @IsEnum(Role)

  role: Role;
}
