import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { AuthPayload } from 'src/auth/entities/auth-payload';
import { Users } from 'src/entities/users.entities';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Users)
  async signUp(@Args("signUpDto") signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args("signInDto") signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}
