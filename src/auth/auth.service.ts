import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { AuthPayload } from 'src/auth/entities/auth-payload';
import { AuthJWTPayload } from 'src/auth/types/auth-jwt-payload';
import { Users } from 'src/entities/users.entities';
import { Role } from 'src/enum/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ email, password, username }: SignUpDto): Promise<Users> {
    const userFound = await this.userService.findUserByEmail(email);
    if (userFound) {
      throw new BadRequestException(
        'email is already taken. please try with another email',
      );
    }

    const hashedPassword = await hash(password);

    return this.userService.createUser({
      email,
      password: hashedPassword,
      username,
      role: Role.USER,
    });
  }

  async signIn({ email, password }: SignInDto): Promise<AuthPayload> {
    const userExist = await this.userService.findUserByEmail(email);
    if (!userExist) {
      throw new BadRequestException('invalid Creadentails');
    }

    const passwordIsMatch = await verify(userExist.password, password);

    if (!passwordIsMatch) {
      throw new BadRequestException('Invalid Creadentails');
    }

    const accessToken = await this.generateAcesstoken(
      userExist.id,
      userExist.email,
    );

    return { accessToken, role: userExist.role, userId: userExist.id };
  }

  async generateAcesstoken(userId: number, email: string) {
    const payload: AuthJWTPayload = {
      sub: {
        email,
        userId,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
