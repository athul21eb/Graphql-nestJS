import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class SignUpDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()

  @IsStrongPassword({
    minLength: 3,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
