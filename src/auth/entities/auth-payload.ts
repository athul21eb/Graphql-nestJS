import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/enum/role.enum';

@ObjectType()
export class AuthPayload {
  @Field(() => Int)
  userId: number;
  @Field()
  accessToken: string;

  @Field()
  role: Role;
}
