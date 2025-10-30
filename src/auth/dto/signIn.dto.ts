import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class SignInDto {
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
