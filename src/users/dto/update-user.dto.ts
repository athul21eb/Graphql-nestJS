import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'] as const),
) {}
